import { declarationOffices } from "@/app/types/formTypes";
import { z } from "zod";

let declarationOfficesKeys = Object.keys(declarationOffices) as Array<
  keyof typeof declarationOffices
>;

const purpose_of_action_enum = z.enum([
  "Złożenie Deklaracji",
  "Korekta Deklaracji",
] as const);
type purpose_of_action_enum = z.infer<typeof purpose_of_action_enum>;
const schemaA_base = z.object({
  date_of_action: z.string().date(),
  tax_office: z.enum(declarationOfficesKeys as [string, ...string[]]),
  purpose_of_action: z.literal("Złożenie Deklaracji"),
});

const schemaA_purpose_correction = schemaA_base.extend({
  purpose_of_action: z.literal("Korekta Deklaracji"),
  reason_for_correction: z.string().max(2000).optional(),
});

const schemaA = z.discriminatedUnion("purpose_of_action", [
  schemaA_base,
  schemaA_purpose_correction,
]);

const schemaB_base = z.object({
  subject: z.enum([
    "Podmiot zobowiązany solidarnie do zapłaty podatku",
    "Strona umowy zamiany",
    "Wspólnik spółki cywilnej",
    "Podmiot, o którym mowa w art. 9 pkt 10 lit. b ustawy (pożyczkobiorca)",
    "Inny podmiot",
  ]),
  natural_person: z.boolean(),
  isPESEL: z.boolean(),
  country: z.string().length(2),
  voivodeship: z.string().max(255).min(2),
  county: z.string().max(255).min(2),
  municipality: z.string().max(255).min(2),
  city: z.string().max(255).min(2),
  street: z.string().max(255).min(2).optional(),
  house_number: z.string().max(255).min(2),
  apartment_number: z.string().max(255).min(2).optional(),
  postal_code: z
    .string()
    .length(6)
    .regex(/\d\d-\d\d\d/),
});

const schemaB_natural_person = schemaB_base.extend({
  natural_person: z.literal(true),
  type: z.discriminatedUnion("isPESEL", [
    z.object({
      isPESEL: z.literal(true),
      PESEL: z
        .string()
        .regex(/^\d+$/, "PESEL musi składać się tylko z cyfr")
        .length(11, "PESEL musi mieć 11 cyfr"),
    }),
    z.object({
      isPESEL: z.literal(false),
      NIP: z
        .string()
        .regex(/^\d+$/, "NIP musi składać się tylko z cyfr")
        .length(10, "NIP musi mieć 10 cyfr"),
    }),
  ]),
  first_name: z
    .string()
    .max(255, "Imię nie może przekraczać 255 znaków")
    .min(2, "Imię musi mieć co najmniej 2 znaki"),
  last_name: z
    .string()
    .max(255, "Nazwisko nie może przekraczać 255 znaków")
    .min(2, "Nazwisko musi mieć co najmniej 2 znaki"),
  date_of_birth: z.string().date("Nieprawidłowy format daty"),
  father_name: z
    .string()
    .max(255, "Imię ojca nie może przekraczać 255 znaków")
    .min(2, "Imię ojca musi mieć co najmniej 2 znaki"),
  mother_name: z
    .string()
    .max(255, "Imię matki nie może przekraczać 255 znaków")
    .min(2, "Imię matki musi mieć co najmniej 2 znaki"),
});

const schemaB_not_natural_person_nip = schemaB_base.extend({
  natural_person: z.literal(false),
  NIP: z
    .string()
    .length(10, "NIP musi mieć 10 cyfr")
    .regex(/^\d+$/, "NIP musi składać się tylko z cyfr")
    .transform(Number),
  full_name: z
    .string()
    .max(255, "Pełna nazwa nie może przekraczać 255 znaków")
    .min(2, "Pełna nazwa musi mieć co najmniej 2 znaki"),
  short_name: z
    .string()
    .max(255, "Skrócona nazwa nie może przekraczać 255 znaków")
    .min(2, "Skrócona nazwa musi mieć co najmniej 2 znaki"),
});

const schemaB = z.discriminatedUnion("natural_person", [
  schemaB_natural_person,
  schemaB_not_natural_person_nip,
]);

const schemaC = z.object({
  subject_of_taxation: z.enum([
    "Umowa",
    "Zmiana Umowy",
    "Orzeczenie Sądu lub Ugoda",
    "Inne",
  ]),
  location_of_item: z.enum(["terytorium RP", "poza terytorium RP"]),
  location_of_transaction: z.enum(["terytorium RP", "poza terytorium RP"]),
  short_action_description: z.string().max(3500),
});

const schemaD_base = z.object({
  type_of_transaction: z.enum([
    "umowa sprzedaży",
    "umowa zamiany",
    "umowa pożyczki lub depozytu nieprawidłowego, w tym zwolniona na podstawie art. 9 pkt 10 lit.b ustawy",
    "umowa darowizny w części dotyczącej przejęcia przez obdarowanego długów i ciężarów lub zobowiązań darczyńcy",
    "ustanowienie odpłatnego użytkowania, w tym nieprawidłowego",
    "ustanowienie hipoteki na zabezpieczenie wierzytelności istniejących",
    "ustanowienie hipoteki na zabezpieczenie wierzytelności o wysokości nieustalonej",
    "inna czynność",
  ]),
});

const schemaD_sale = schemaD_base.extend({
  type_of_transaction: z.literal("umowa sprzedaży"),
  p24: z.number(),
  p26: z.number(),
});

const schemaD_exchange = schemaD_base.extend({
  type_of_transaction: z.literal("umowa zamiany"),
  p28: z.number(),
  p29: z.enum(["1", "2"]),
});

const schemaD_loan = schemaD_base.extend({
  type_of_transaction: z.literal(
    "umowa pożyczki lub depozytu nieprawidłowego, w tym zwolniona na podstawie art. 9 pkt 10 lit.b ustawy"
  ),
  p31: z.number(),
  p32: z.enum(["0", "0.5", "2", "20"]),
});

const schemaD_donation = schemaD_base.extend({
  type_of_transaction: z.literal(
    "umowa darowizny w części dotyczącej przejęcia przez obdarowanego długów i ciężarów lub zobowiązań darczyńcy"
  ),
  p34: z.number(),
  p35: z.enum(["1", "2"]),
});

const schemaD_rent = schemaD_base.extend({
  type_of_transaction: z.literal(
    "ustanowienie odpłatnego użytkowania, w tym nieprawidłowego"
  ),
  p37: z.number(),
  p38: z.enum(["1", "20"]),
});

const schemaD_mortgage = schemaD_base.extend({
  type_of_transaction: z.literal(
    "ustanowienie hipoteki na zabezpieczenie wierzytelności istniejących"
  ),
  p40: z.number(),
});

const schemaD_mortgage_unlimited = schemaD_base.extend({
  type_of_transaction: z.literal(
    "ustanowienie hipoteki na zabezpieczenie wierzytelności o wysokości nieustalonej"
  ),
});

const schemaD_other = schemaD_base.extend({
  type_of_transaction: z.literal("inna czynność"),
  p43a: z.enum([
    "Umowa dożywocia",
    "Umowa o dział spadku - w części spłat lub dopłat",
    "Umowa o zniesienie współwłasności - w części spłat lub dopłat",
    "Ustanowienie odpłatnej służebności",
    "Orzeczenie sądu",
  ]),
  p43: z.number(),
  p44: z.enum(["1", "2", "6"]),
});

const schemaD = z.discriminatedUnion("type_of_transaction", [
  schemaD_sale,
  schemaD_exchange,
  schemaD_loan,
  schemaD_donation,
  schemaD_rent,
  schemaD_mortgage,
  schemaD_mortgage_unlimited,
  schemaD_other,
]);

const schemaE = z.object({
  p47: z.enum(["Spółka osobowa", "Spółka kapitałowa"]),
  p48: z.enum([
    "Zawarcia umowy spółki",
    "Zwiększenia majątku spółki albo podwyższenia kapitału zakładowego",
    "Dopłaty",
    "Pożyczki udzielonej spółce osobowej przez wspólnika",
    "Oddania spółce rzeczy lub praw majątkowych do nieodpłatnego używania",
    "Przekształcenia spółek",
    "Łączenia spółek",
    "Przeniesienia na terytorium Rzeczypospolitej Polskiej rzeczywistego ośrodka zarządzania spółki kapitałowej lub jej siedziby",
  ]),
  p49: z.number(),
  p50: z.number(),
});
const schemaG = z.object({
  additional_voivodeship: z.string().max(255).min(2).optional(),
  additional_county: z.string().max(255).min(2).optional(),
  additional_municipality: z.string().max(255).min(2).optional(),
  additional_city: z.string().max(255).min(2).optional(),
  additional_street: z.string().max(255).min(2).optional(),
  additional_house_number: z.string().max(255).min(2).optional(),
  additional_apartment_number: z.string().max(255).min(2).optional(),
  additional_postal_code: z
    .string()
    .length(6)
    .regex(/\d\d-\d\d\d/)
    .optional(),
});

const schemaH = z.object({
  amount_of_attachments: z.number(),
});

const finalSchema = schemaA
  .and(schemaB)
  .and(schemaC)
  .and(schemaD)
  .and(schemaE)
  .and(schemaG)
  .and(schemaH);

export {
  finalSchema,
  schemaA,
  schemaB,
  schemaC,
  schemaD,
  schemaE,
  schemaG,
  schemaH,
};
