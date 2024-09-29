import { z } from "zod";

const schemaA = z.object({
    date_of_action: z.string().date(),
    tax_office: z.enum(['']),
})

const schemaB = z.object({
  subject: z.enum([
    "Podmiot zobowiązany solidarnie do zapłaty podatku",
    "Strona umowy zamiany",
    "Wspólnik spółki cywilnej",
    "Podmiot, o którym mowa w art. 9 pkt 10 lit. b ustawy (pożyczkobiorca)",
    "Inny podmiot"
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
  postal_code: z.string().length(6).regex(/\d\d-\d\d\d/),
})

const natural_person = schemaB.extend({
  natural_person: z.literal(true),
  type: z.discriminatedUnion("isPESEL", [
    z.object({
      isPESEL: z.literal(true),
      PESEL: z.string().length(11),
    }),
    z.object({
      isPESEL: z.literal(false),
      NIP: z.string().length(10),
    }),
  ]),
  first_name: z.string().max(255).min(2),
  last_name: z.string().max(255).min(2),
  date_of_birth: z.string().date(),
  father_name: z.string().max(255).min(2),
  mother_name: z.string().max(255).min(2),
})


const not_natural_person_nip = schemaB.extend({
  natural_person: z.literal(false),
  NIP: z.string().length(10).regex(/^\d+$/).transform(Number),
  full_name: z.string().max(255).min(2),
  short_name: z.string().max(255).min(2),
})



const schema = z.discriminatedUnion("natural_person", [natural_person, not_natural_person_nip]);

export default schema;