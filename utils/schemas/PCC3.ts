import { z } from "zod";

const subjectEnum = z.enum([
    "Podmiot zobowiązany solidarnie do zapłaty podatku",
    "Strona umowy zamiany",
    "Wspólnik spółki cywilnej",
    "Podmiot, o którym mowa w art. 9 pkt 10 lit. b ustawy (pożyczkobiorca)",
    "Inny podmiot"
]);

type SubjectEnum = z.infer<typeof subjectEnum>;

const baseSchema = z.object({
  subject: subjectEnum,
  natural_person: z.boolean(),
  isPESEL: z.boolean(),
})

const natural_person = baseSchema.extend({
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


const not_natural_person_nip = baseSchema.extend({
  natural_person: z.literal(false),
  NIP: z.string().length(10).regex(/^\d+$/).transform(Number),
  full_name: z.string().max(255).min(2),
  short_name: z.string().max(255).min(2),
})



const schema = z.discriminatedUnion("natural_person", [natural_person, not_natural_person_nip]);

export default schema;