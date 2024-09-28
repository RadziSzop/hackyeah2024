import { z } from "zod";

const subjectEnum = z.enum([
    "Podmiot zobowiązany solidarnie do zapłaty podatku",
    "Strona umowy zamiany",
    "Wspólnik spółki cywilnej",
    "Podmiot, o którym mowa w art. 9 pkt 10 lit. b ustawy (pożyczkobiorca)",
    "Inny podmiot"
]);

  type subjectEnum = z.infer<typeof subjectEnum>;

  const entity_data = {
    subject: subjectEnum,
    natural_person: z.boolean(),
    isPESEL: z.boolean(),
    NIP: z.string().length(10),
    PESEL: z.string().length(11),
    full_name: z.string().max(255).min(2),
    short_name: z.string().max(255).min(2),
    first_name: z.string().max(255).min(2),
    last_name: z.string().max(255).min(2),
    date_of_birth: z.string().date(),
    father_name: z.string().max(255).min(2),
    mother_name: z.string().max(255).min(2),
  };

  const entity_data_natural_person = {
    isPESEL: entity_data.isPESEL,
    NIP: entity_data.NIP,
    PESEL: entity_data.PESEL,
    first_name: entity_data.first_name,
    last_name: entity_data.last_name,
    date_of_birth: entity_data.date_of_birth,
    father_name: entity_data.father_name,
    mother_name: entity_data.mother_name,
  };

  const entity_data_not_natural_person = z.object({
    NIP: entity_data.NIP,
    full_name: entity_data.full_name,
    short_name: entity_data.short_name,
  });

  const entity_data_natural_person_NIP = z.object({
    NIP: entity_data_natural_person.NIP,
    first_name: entity_data_natural_person.first_name,
    last_name: entity_data_natural_person.last_name,
    date_of_birth: entity_data_natural_person.date_of_birth,
    father_name: entity_data_natural_person.father_name,
    mother_name: entity_data_natural_person.mother_name,
  });

  const entity_data_natural_person_PESEL = z.object({
    PESEL: entity_data.PESEL,
    first_name: entity_data_natural_person.first_name,
    last_name: entity_data_natural_person.last_name,
    date_of_birth: entity_data_natural_person.date_of_birth,
    father_name: entity_data_natural_person.father_name,
    mother_name: entity_data_natural_person.mother_name,
  });

  const PESELUnion = z.discriminatedUnion("isPESEL", [
    z.object({
      isPESEL: z.literal(true),
      data: entity_data_natural_person_PESEL,
    }),
    z.object({
      isPESEL: z.literal(false),
      data: entity_data_natural_person_NIP,
    }),
  ]);

  const finalUnion = z.discriminatedUnion("natural_person", [
    z.object({
      natural_person: z.literal(true),
      data: PESELUnion,
    }),
    z.object({
      natural_person: z.literal(false),
      data: entity_data_not_natural_person,
    }),
  ]);

export { finalUnion };

const schema = z.object({
  subject: subjectEnum,
  natural_person: z.boolean(),
  isPESEL: z.boolean(),
  NIP: z.string().length(10),
  PESEL: z.string().length(11),
  full_name: z.string().max(255).min(2),
  short_name: z.string().max(255).min(2),
  first_name: z.string().max(255).min(2),
  last_name: z.string().max(255).min(2),
  date_of_birth: z.string().date(),
  father_name: z.string().max(255).min(2),
  mother_name: z.string().max(255).min(2),
})