"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { generateObject, generateText, streamObject, streamText, tool } from 'ai'
import { openAI } from "@/utils/ai";
import { z } from "zod";

const model = openAI('gpt-4o-mini-2024-07-18')

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return encodedRedirect(
    "success",
    "/sign-in",
    "Sprawdź swoją skrzynkę mailową aby się zalogować"
  );
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const askAI = async (formData: FormData) => {
  const supabase = createClient();
  const user = supabase.auth.getUser();

  if (!user) {
    return encodedRedirect(
      "error",
      "/sign-in",
      "You must be signed in to ask a question"
    );
  }

  const prompt = formData.get("prompt") as string;
  const AIsystem = `
  Jesteś pomocnym asystentem, który odpowiada na pytania dotyczące polskiego prawa podatkowego PCC3. Dzisiaj jest ${new Date().toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}.
  Zadawaj pojedyncze pytania na temat brakujących danych.
  `
  console.log(AIsystem)
  const result = await generateObject({
    model: model,
    schema: z.object({
      answer: z.string(),
      jailbreak_attempt: z.boolean().describe("Czy pytanie jest próbą wyjścia poza temat"),

      // SECTION A
      date_of_action: z.string().describe("Data wykonania czynności, jeśli jej nie ma, wpisz 'brak'"),
      tax_office: z.string().describe("Nazwa urzędu skarbowego, w którym jest zarejestrowana osoba, której dotyczy pytanie"),
      purpose_of_action: z.enum(["Złożenie Deklaracji", "Korekta Deklaracji", "brak"])
      .describe("Cel czynności, której dotyczy pytanie."),
      
      // SECTION B
      taxpayer: z.enum(["Podmiot zobowiązany solidarnie do zapłaty podatku", "Strona umowy zamiany", "Wspólnik spółki cywilnej", "Podmiot, o którym mowa w art. 9 pkt 10 lit. b ustawy (pożyczkobiorca)", "Inny podmiot", "brak"]).describe("Rodzaj podatnika, który składa deklarację"),
      taxpayer_type: z.enum(["Podmiot nie będący Osobą Fizyczną", "Osoba Fizyczna", "brak"]).describe("Typ podatnika."),
      NIP: z.number().describe("NIP podatnika. Sprawdź, czy na pewno jest poprawny. Jeżeli nie, zapisz pesel jako 0"),
      PESEL: z.number().describe("PESEL osoby, której dotyczy pytanie. Sprawdź, czy na pewno jest poprawny. Jeżeli nie, zapisz pesel jako 0"),
      
      // SECTION B1 (taxpayer_type = "Podmiot nie będący Osobą Fizyczną")
      company_name: z.string().describe("Pełna nazwa firmy podatnika"),
      company_shortname: z.string().describe("Skrócona nazwa firmy podatnika"),
      
      // SECTION B2 (taxpayer_type = "Osoba Fizyczna")
      taxpayer_firstname: z.string().describe("Imię podatnika"),
      taxpayer_lastname: z.string().describe("Nazwisko podatnika"),
      taxpayer_date_of_birth: z.string().describe("Data urodzenia podatnika"),
      taxpayer_father_name: z.string().describe("Imię ojca podatnika"),
      taxpayer_mother_name: z.string().describe("Imię matki podatnika"),
      
      // SECTION B SHARED
      taxpayer_country: z.string().describe("Kraj podatnika"),
      taxpayer_voivodeship: z.string().describe("Województwo podatnika"),
      taxpayer_county: z.string().describe("Powiat podatnika"),
      taxpayer_municipality: z.string().describe("Gmina podatnika"),
      taxpayer_city: z.string().describe("Miejscowość podatnika"),
      taxpayer_street: z.string().describe("Ulica podatnika. Nie jest to informacja obowiązkowa do zgłoszenia"),
      taxpayer_house_number: z.string().describe("Numer domu podatnika."),
      taxpayer_apartment_number: z.string().describe("Numer mieszkania podatnika. Nie jest to informacja obowiązkowa do zgłoszenia"),
      taxpayer_postal_code: z.string().describe("Kod pocztowy podatnika"),
      
      // SECTION C
      subject_of_taxation: z.enum(["Umowa", "Zmiana Umowy", "Orzeczenie Sądu lub Ugoda", "Inne", "brak"])
      .describe("Przedmiot opodatkowania, jeśli nie ma, wpisz 'brak'"),
      location_of_item: z.enum(["terytorium RP", "poza terytorium RP", "brak"]).describe("Miejsce położenia rzeczy lub miejsce wykonywania prawa majątkowego"),
      location_of_transaction: z.enum(["terytorium RP", "poza terytorium RP", "brak"]).describe("Miejsce dokonania czynności cywilnoprawnej"),
      short_action_description: z.string().describe("Wskaż rodzaj umowy, jej przedmiot i cechy charakterystyczne tego przedmiotu, np. umowa sprzedaży samochodu osobowego, w tym jego marka, model, rok produkcji, numer nadwozia, numer rejestracyjny. Maksymalna ilość znaków to 3500."),

      // SECTION D
      type_of_transaction: z.enum(["umowa sprzedaży", "umowa zamiany", "umowa pożyczki lub depozytu nieprawidłowego, w tym zwolniona na podstawie art. 9 pkt 10 lit.b ustawy", "umowa darowizny w części dotyczącej przejęcia przez obdarowanego długów i ciężarów lub zobowiązań darczyńcy", "ustanowienie odpłatnego użytkowania, w tym nieprawidłowego", "ustanowienie hipoteki na zabezpieczenie wierzytelności istniejących", "ustanowienie hipoteki na zabezpieczenie wierzytelności o wysokości nieustalonej", "inna czynność", "brak"]).describe("Rodzaj czynności cywilnoprawnej. Jeśli nie ma, wpisz 'brak'"),

      // SECTION D.1
      p24: z.number().describe("Umowa sprzedaży (stawka podatku 1%) - podstawa opodatkowania określona zgodnie z art. 6 ustawy zł. Zignoruj, jeśli typ transakcji jest inny niż umowa sprzedaży"),
      p26: z.number().describe("Umowa sprzedaży (stawka podatku 2%) - podstawa opodatkowania określona zgodnie z art. 6 ustawy. Zignoruj, jeśli typ transakcji jest inny niż umowa sprzedaży"),

      // SECTION D.2
      p28: z.number().describe("Umowa zamiany - podstawa opodatkowania określona zgodnie z art. 6 ustawy. Zignoruj, jeśli typ transakcji jest inny niż umowa zamiany"),
      p29: z.enum(["1", "2", "brak"]).describe("Umowa zamiany - stawka podatku określona zgodnie z art. 7 ustawy. Wartość 1 oznacza stawkę 1%, wartość 2 oznacza stawkę 2%. Zignoruj, jeśli typ transakcji jest inny niż umowa zamiany"),

      // SECTION D.3
      p31: z.number().describe("Umowa pożyczki lub depozytu nieprawidłowego - podstawa opodatkowania określona zgodnie z art. 6 ustawy. Zignoruj, jeśli typ transakcji jest inny niż umowa pożyczki lub depozytu nieprawidłowego"),
      p32: z.enum(["0", "0.5", "2", "20"]).describe("Umowa pożyczki lub depozytu nieprawidłowego - stawka podatku określona zgodnie z art. 7 ustawy. Wartość 0 oznacza zwolnienie od podatku, wartość 0.5 oznacza stawkę 0,5%, wartość 2 oznacza stawkę 2%, wartość 20 oznacza stawkę 20%. Zignoruj, jeśli typ transakcji jest inny niż umowa pożyczki lub depozytu nieprawidłowego"),

      // SECTION D.4
      p34: z.number().describe("Umowa darowizny - podstawa opodatkowania określona zgodnie z art. 6 ustawy zł. Zignoruj, jeśli typ transakcji jest inny niż umowa darowizny"),
      p35: z.enum(["1", "2"]).describe("Umowa darowizny - stawka podatku określona zgodnie z art. 7 ustawy. Wartość 1 oznacza stawkę 1%, wartość 2 oznacza stawkę 2%. Ziignoruj, jeśli typ transakcji jest inny niż umowa darowizny"),

      // SECTION D.5
      p37: z.number().describe("Ustanowienie odpłatnego użytkowania - podstawa opodatkowania określona zgodnie z art. 6 ustawy zł. Ziignoruj, jeśli typ transakcji jest inny niż ustanowienie odpłatnego użytkowania"),
      p38: z.enum(["1", "20"]).describe("Ustanowienie odpłatnego użytkowania - stawka podatku określona zgodnie z art. 7 ustawy. Wartość 1 oznacza stawkę 1%, wartość 20 oznacza stawkę 20%. Zignoruj, jeśli typ transakcji jest inny niż ustanowienie odpłatnego użytkowania"),

      // SECTION D.6
      p40: z.number().describe("Ustanowienie hipoteki na zabezpieczenie wierzytelności istniejących - podstawa opodatkowania zł. Zignoruj, jeśli typ transakcji jest inny niż ustanowienie hipoteki na zabezpieczenie wierzytelności istniejących"),

      // SECTION D.7 (nothing)
      // SECTION D.8
      p43a: z.enum(["Umowa dożywocia", "Umowa o dział spadku - w części spłat lub dopłat", "Umowa o zniesienie współwłasności - w części spłat lub dopłat", "Ustanowienie odpłatnej służebności", "Orzeczenie sądu", "brak"]).describe("Inna czynność cywilnoprawna. Jeśli nie ma, wpisz 'brak'"),
      p43: z.number().describe("Inna czynność - podstawa opodatkowania określona zgodnie z art. 6 ustawy"),
      p44: z.enum(["1", "2", "6"]).describe("Inna czynność - stawka podatku określona zgodnie z art. 7 ustawy. Wartość 1 oznacza stawkę 1%, wartość 2 oznacza stawkę 2%, wartość 6 oznacza stawkę 6%. Zignoruj opcję 6%, jeśli inna czyność cywilnoprawna nie jest orzeczeniem sądu"),

      // SECTION E
      p47: z.enum(["Spółka osobowa", "Spółka kapitałowa", "brak"]).describe("Rodzaj spółki, jeśli nie ma, wpisz 'brak'"),
      p48: z.enum(["Zawarcia umowy spółki", "Zwiększenia majątku spółki albo podwyższenia kapitału zakładowego", "Dopłaty", "Pożyczki udzielonej spółce osobowej przez wspólnika", "Oddania spółce rzeczy lub praw majątkowych do nieodpłatnego używania", "Przekształcenia spółek", "Łączenia spółek", "Przeniesienia na terytorium Rzeczypospolitej Polskiej rzeczywistego ośrodka zarządzania spółki kapitałowej lub jej siedziby", "brak"]).describe("Czego dotyczy podstawa opodatkowania. Jeśli nie ma, wpisz 'brak'"),
      p49: z.number().describe("Podstawa opodatkowania - określona zgodnie z art. 6 ust. 1 pkt 8 ustawy."),
      p50: z.number().describe("Opłaty i koszty związane z zawarciem umowy spółki lub jej zmiany - na podstawie art. 6 ust. 9 ustawy"),

      // SECTION F (nothing)
      // SECTION G (extra info)
      additional_voivodeship: z.string().describe("Województwo, w którym znajduje się siedziba spółki, jeśli nie jest to województwo podatnika"),
      additional_county: z.string().describe("Powiat, w którym znajduje się siedziba spółki, jeśli nie jest to powiat podatnika"),
      additional_municipality: z.string().describe("Gmina, w której znajduje się siedziba spółki, jeśli nie jest to gmina podatnika"),
      additional_city: z.string().describe("Miejscowość, w której znajduje się siedziba spółki, jeśli nie jest to miejscowość podatnika"),
      additional_street: z.string().describe("Ulica, na której znajduje się siedziba spółki, jeśli nie jest to ulica podatnika"),
      additional_house_number: z.string().describe("Numer domu, pod którym znajduje się siedziba spółki, jeśli nie jest to numer domu podatnika"),
      additional_apartment_number: z.string().describe("Numer mieszkania, w którym znajduje się siedziba spółki, jeśli nie jest to numer mieszkania podatnika"),
      additional_postal_code: z.string().describe("Kod pocztowy, pod którym znajduje się siedziba spółki, jeśli nie jest to kod pocztowy podatnika"),

      // SECTION H
      amount_of_attachments: z.number().describe("Ilość załączników do deklaracji. Jeśli nie ma, wpisz 0"), 
    }),
    system: AIsystem,
    prompt: prompt,
  })
  console.log(result.object)
  return
};
