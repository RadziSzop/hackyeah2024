import { declarationOffices } from "@/app/types/formTypes";
import { z } from "zod";

let declarationOfficesKeys = Object.keys(declarationOffices) as Array<
  keyof typeof declarationOffices
>;

const schemaA_base = z.object({
  date_of_action: z.string().date(),
  tax_office: z.enum(declarationOfficesKeys as [string, ...string[]]),
  purpose_of_action: z.enum([
    "Złożenie Deklaracji",
    "Korekta Deklaracji",
    "brak",
  ]),
});

const purpose_correction = schemaA_base.extend({
  purpose_of_action: z.literal("Korekta Deklaracji"),
  reason_for_correction: z.string().max(2000).optional(),
});

// const schemaA = z.discriminatedUnion("purpose_of_action", [
//     schemaA_base,
//     purpose_correction,
// ])

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
  commune: z.string().max(255).min(2),
  street: z.string().max(255).min(2).optional(),
  house_number: z.string().max(255).min(2),
  apartment_number: z.string().max(255).min(2).optional(),
  postal_code: z
    .string()
    .length(6)
    .regex(/\d\d-\d\d\d/),
});

const natural_person = schemaB_base.extend({
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

const not_natural_person_nip = schemaB_base.extend({
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

const schema = z.discriminatedUnion("natural_person", [
  natural_person,
  not_natural_person_nip,
]);

export default schema;
