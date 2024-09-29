"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import schema from "@/utils/schemas/PCC3";

export default function TempForm() {
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      natural_person: false,
      // @ts-ignore
      type: {
        isPESEL: false,
      },
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => console.log(data);
  const natural_person = watch("natural_person");
  const isPESEL = watch("type.isPESEL");

  return (
    <div className="flex-grow pr-4">
      <h2 className="text-2xl font-semibold mb-4 text-blue-950">Tax Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label>Is Natural Person</Label>
          <RadioGroup
            className="flex gap-4"
            defaultValue={natural_person ? "true" : "false"}
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="true"
                id="natural_person_true"
                className="w-5 h-5"
                onClick={() => setValue("natural_person", true)}
              />
              <Label htmlFor="natural_person_true" className="text-lg">
                Osoba fizyczna
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="false"
                id="natural_person_false"
                className="w-5 h-5"
                onClick={() => setValue("natural_person", false)}
              />
              <Label htmlFor="natural_person_false" className="text-lg">
                Podmiot nie będący osobą fizyczną
              </Label>
            </div>
          </RadioGroup>
        </div>
        {!natural_person ? (
          <>
            <div>
              <Label htmlFor="NIP">NIP</Label>
              <Input
                className={errors && "NIP" in errors ? "border-red-500" : ""}
                type="text"
                id="NIP"
                {...register("NIP")}
              />
              {errors && "NIP" in errors && (
                <p className="text-red-500">
                  {errors.NIP?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                className={
                  errors && "full_name" in errors ? "border-red-500" : ""
                }
                type="text"
                id="full_name"
                {...register("full_name")}
              />
              {errors && "full_name" in errors && (
                <p className="text-red-500">
                  {errors.full_name?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="short_name">Short Name</Label>
              <Input
                className={
                  errors && "short_name" in errors ? "border-red-500" : ""
                }
                type="text"
                id="short_name"
                {...register("short_name")}
              />
              {errors && "short_name" in errors && (
                <p className="text-red-500">
                  {errors.short_name?.message?.toString()}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <Label>Is PESEL</Label>
              <RadioGroup
                className="flex gap-4"
                defaultValue={isPESEL ? "true" : "false"}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="true"
                    id="isPESEL_true"
                    className="w-5 h-5"
                    onClick={() => setValue("type.isPESEL", true)}
                  />
                  <Label htmlFor="isPESEL_true" className="text-lg">
                    PESEL
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="false"
                    id="isPESEL_false"
                    className="w-5 h-5"
                    onClick={() => setValue("type.isPESEL", false)}
                  />
                  <Label htmlFor="isPESEL_false" className="text-lg">
                    NIP
                  </Label>
                </div>
              </RadioGroup>
            </div>
            {isPESEL ? (
              <>
                <div>
                  <Label htmlFor="PESEL">PESEL</Label>
                  <Input
                    className={
                      natural_person &&
                      "type" in errors &&
                      errors.type &&
                      "PESEL" in errors.type
                        ? "border-red-500"
                        : ""
                    }
                    type="text"
                    id="PESEL"
                    {...register("type.PESEL")}
                  />
                </div>
                {natural_person &&
                  "type" in errors &&
                  errors.type &&
                  "PESEL" in errors.type && (
                    <p className="text-red-500">
                      {(errors.type.PESEL as FieldError)?.message?.toString()}
                    </p>
                  )}
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="NIP">NIP</Label>
                  <Input
                    className={
                      natural_person &&
                      "type" in errors &&
                      errors.type &&
                      "NIP" in errors.type
                        ? "border-red-500"
                        : ""
                    }
                    type="text"
                    id="NIP"
                    {...register("type.NIP")}
                  />
                  {natural_person &&
                    "type" in errors &&
                    errors.type &&
                    "NIP" in errors.type && (
                      <p className="text-red-500">
                        {(errors.type.NIP as FieldError)?.message?.toString()}
                      </p>
                    )}
                </div>
              </>
            )}
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                className={
                  errors && "first_name" in errors ? "border-red-500" : ""
                }
                type="text"
                id="first_name"
                {...register("first_name")}
              />
              {errors && "first_name" in errors && (
                <p className="text-red-500">
                  {errors.first_name?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                className={
                  errors && "last_name" in errors ? "border-red-500" : ""
                }
                type="text"
                id="last_name"
                {...register("last_name")}
              />
              {errors && "last_name" in errors && (
                <p className="text-red-500">
                  {errors.last_name?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="father_name">Father Name</Label>
              <Input
                className={
                  errors && "father_name" in errors ? "border-red-500" : ""
                }
                type="text"
                id="father_name"
                {...register("father_name")}
              />
              {errors && "father_name" in errors && (
                <p className="text-red-500">
                  {errors.father_name?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="mother_name">Mother Name</Label>
              <Input
                className={
                  errors && "mother_name" in errors ? "border-red-500" : ""
                }
                type="text"
                id="mother_name"
                {...register("mother_name")}
              />
              {errors && "mother_name" in errors && (
                <p className="text-red-500">
                  {errors.mother_name?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                className={
                  errors && "date_of_birth" in errors ? "border-red-500" : ""
                }
                type="date"
                id="date_of_birth"
                {...register("date_of_birth")}
              />
              {errors && "date_of_birth" in errors && (
                <p className="text-red-500">
                  {errors.date_of_birth?.message?.toString()}
                </p>
              )}
            </div>
          </>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
