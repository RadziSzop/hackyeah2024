"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import { finalUnion } from "@/utils/schemas/PCC3";

export default function TempForm() {
  type FormData = z.infer<typeof finalUnion>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(finalUnion),
  });

  const onSubmit = (data: FormData) => console.log(data);
  const natural_person = watch("natural_person");
  const isPESEL = watch("data.isPESEL");
  console.log(errors);

  return (
    <div className="flex-grow pr-4">
      <h2 className="text-2xl font-semibold mb-4 text-blue-950">Tax Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label>Is Natural Person</Label>
          <RadioGroup
            className="flex gap-4"
            onValueChange={(value) =>
              setValue("natural_person", value === "true")
            }
            defaultValue={natural_person ? "true" : "false"}
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="true"
                id="natural_person_true"
                className="w-5 h-5"
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
                className={
                  errors.data && "data.NIP" in errors.data
                    ? "border-red-500"
                    : ""
                }
                type="text"
                id="NIP"
                {...register("data.NIP")}
              />
              {errors.data && "data.NIP" in errors.data && (
                <p className="text-red-500">
                  {(errors.data.NIP as FieldError)?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                className={
                  errors.data && "data.full_name" in errors.data
                    ? "border-red-500"
                    : ""
                }
                type="text"
                id="full_name"
                {...register("data.full_name")}
              />
              {errors.data && "data.full_name" in errors.data && (
                <p className="text-red-500">
                  {(errors.data.full_name as FieldError)?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="short_name">Short Name</Label>
              <Input
                className={
                  errors.data && "data.short_name" in errors.data
                    ? "border-red-500"
                    : ""
                }
                type="text"
                id="short_name"
                {...register("data.short_name")}
              />
              {errors.data && "data.short_name" in errors.data && (
                <p className="text-red-500">
                  {(errors.data.short_name as FieldError)?.message?.toString()}
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
                onValueChange={(value) =>
                  setValue("data.isPESEL", value === "true")
                }
                defaultValue={isPESEL ? "true" : "false"}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="true"
                    id="isPESEL_true"
                    className="w-5 h-5"
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
                  />
                  <Label htmlFor="isPESEL_false" className="text-lg">
                    NIP
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                className={
                  errors.data && "first_name" in errors.data
                    ? "border-red-500"
                    : ""
                }
                type="text"
                id="first_name"
                {...register("data.data.first_name")}
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
                  errors.data && "last_name" in errors.data
                    ? "border-red-500"
                    : ""
                }
                type="text"
                id="last_name"
                {...register("data.data.last_name")}
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
                {...register("data.data.date_of_birth")}
              />
              {errors.data && "date_of_birth" in errors.data && (
                <p className="text-red-500">
                  {(
                    errors.data.date_of_birth as FieldError
                  )?.message?.toString()}
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
                {...register("data.data.father_name")}
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
                  errors.data && "data.data.mother_name" in errors.data
                    ? "border-red-500"
                    : ""
                }
                type="text"
                id="mother_name"
                {...register("data.data.mother_name")}
              />
              {errors.data && "data.data.mother_name" in errors.data && (
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
                    errors.data && "PESEL" in errors.data
                      ? "border-red-500"
                      : ""
                  }
                  type="text"
                  id="PESEL"
                  {...register("data.data.PESEL")}
                />
                {errors.data && "data.data.PESEL" in errors.data && (
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
                    errors.data && "data.NIP" in errors.data
                      ? "border-red-500"
                      : ""
                  }
                  type="text"
                  id="NIP"
                  {...register("data.NIP")}
                />
                {errors.data && "data.NIP" in errors.data && (
                  <p className="text-red-500">
                    {(errors.data.NIP as FieldError)?.message?.toString()}
                  </p>
                )}
              </div>
            )}
          </>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
