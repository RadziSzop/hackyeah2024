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
      purpose_of_action: z.enum(["Złożenie Deklaracji", "Korekta Deklaracji", "Brak"])
      .describe("Cel czynności, której dotyczy pytanie."),
      
      // SECTION B
      taxpayer: z.enum(["Podmiot zobowiązany solidarnie do zapłaty podatku", "Strona umowy zamiany", "Wspólnik spółki cywilnej", "Podmiot, o którym mowa w art. 9 pkt 10 lit. b ustawy (pożyczkobiorca)", "Inny podmiot", "Brak"]).describe("Rodzaj podatnika, który składa deklarację"),
      taxpayer_type: z.enum(["Podmiot nie będący Osobą Fizyczną", "Osoba Fizyczna", "Brak"]).describe("Typ podatnika."),
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
      point_of_interest: z.enum(["Umowa", "Zmiana Umowy", "Orzeczenie Sądu lub Ugoda", "Inne"])
      .describe("Przedmiot opodatkowania"),
      short_action_description: z.string().describe("Rodzaj Umowy, przedmiot i jego cechy charakterystyczne"),

    }),
    system: AIsystem,
    prompt: prompt,
  })
  console.log(result.object)
  return
};
