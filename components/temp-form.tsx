"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";

export default function TempForm() {
  const schemaA = z.object({
    date: z.string().date(),
    office: z.string(),
    correction: z.boolean(),
    correction_reason: z.string().max(2000).optional(),
  });

  const subjectEnum = z.enum(["Salmon", "Tuna", "Trout", "Other"]);
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

  type FormData = z.infer<typeof PESELUnion>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(PESELUnion),
  });

  const onSubmit = (data: FormData) => console.log(data);
  const isPESEL = watch("isPESEL");
  console.log(errors);

  return (
    <div className="flex-grow pr-4">
      <h2 className="text-2xl font-semibold mb-4 text-blue-950">Tax Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="isPESEL">Is PESEL</Label>
          <Input type="checkbox" id="isPESEL" {...register("isPESEL")} />
        </div>
        <div>
          <Label htmlFor="first_name">First Name</Label>
          <Input
            className={
              errors.data && "first_name" in errors.data ? "border-red-500" : ""
            }
            type="text"
            id="first_name"
            {...register("data.first_name")}
          />
          {errors.data && "first_name" in errors.data && (
            <p className="text-red-500">
              {(errors.data.first_name as FieldError)?.message?.toString()}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            className={
              errors.data && "last_name" in errors.data ? "border-red-500" : ""
            }
            type="text"
            id="last_name"
            {...register("data.last_name")}
          />
          {errors.data && "last_name" in errors.data && (
            <p className="text-red-500">
              {(errors.data.last_name as FieldError)?.message?.toString()}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="date_of_birth">Date of Birth</Label>
          <Input
            className={
              errors.data && "date_of_birth" in errors.data
                ? "border-red-500"
                : ""
            }
            type="date"
            id="date_of_birth"
            {...register("data.date_of_birth")}
          />
          {errors.data && "date_of_birth" in errors.data && (
            <p className="text-red-500">
              {(errors.data.date_of_birth as FieldError)?.message?.toString()}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="father_name">Father Name</Label>
          <Input
            className={
              errors.data && "father_name" in errors.data
                ? "border-red-500"
                : ""
            }
            type="text"
            id="father_name"
            {...register("data.father_name")}
          />
          {errors.data && "father_name" in errors.data && (
            <p className="text-red-500">
              {(errors.data.father_name as FieldError)?.message?.toString()}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="mother_name">Mother Name</Label>
          <Input
            className={
              errors.data && "mother_name" in errors.data
                ? "border-red-500"
                : ""
            }
            type="text"
            id="mother_name"
            {...register("data.mother_name")}
          />
          {errors.data && "mother_name" in errors.data && (
            <p className="text-red-500">
              {(errors.data.mother_name as FieldError)?.message?.toString()}
            </p>
          )}
        </div>

        {isPESEL ? (
          <div>
            <Label htmlFor="PESEL">PESEL</Label>
            <Input
              className={
                errors.data && "PESEL" in errors.data ? "border-red-500" : ""
              }
              type="text"
              id="PESEL"
              {...register("data.PESEL")}
            />
            {errors.data && "PESEL" in errors.data && (
              <p className="text-red-500">
                {(errors.data.PESEL as FieldError)?.message?.toString()}
              </p>
            )}
          </div>
        ) : (
          <div>
            <Label htmlFor="NIP">NIP</Label>
            <Input
              className={
                errors.data && "NIP" in errors.data ? "border-red-500" : ""
              }
              type="text"
              id="NIP"
              {...register("data.NIP")}
            />
            {errors.data && "NIP" in errors.data && (
              <p className="text-red-500">
                {(errors.data.NIP as FieldError)?.message?.toString()}
              </p>
            )}
          </div>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
