import { z } from "zod";

const subjectEnum = z.enum([
  "Podmiot zobowiązany solidarnie do zapłaty podatku",
  "Strona umowy zamiany",
  "Wspólnik spółki cywilnej",
  "Podmiot, o którym mowa w art. 9 pkt 10 lit. b ustawy (pożyczkobiorca)",
  "Inny podmiot",
]);

type SubjectEnum = z.infer<typeof subjectEnum>;

const baseSchema = z.object({
  subject: subjectEnum,
  natural_person: z.boolean(),
  isPESEL: z.boolean(),
});

const natural_person = baseSchema.extend({
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

const not_natural_person_nip = baseSchema.extend({
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
