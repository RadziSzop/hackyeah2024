"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import { schemaB } from "@/utils/schemas/PCC3";
import { changeFieldState, changeFieldText } from "@/utils/changeFieldText";

interface FormBProps {
  register: any;
  handleSubmit: any;
  errors: any;
  watch: any;
  setValue: any;
}

export default function FormB({
  register,
  handleSubmit,
  errors,
  watch,
  setValue,
}: FormBProps) {
  const natural_person = watch("natural_person");
  const isPESEL = watch("type.isPESEL");

  return (
    <div className="flex-grow min-w-[400px] pr-4 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-950">Sekcja B</h2>
      <div className="mb-6 space-y-6">
        <Label className="mb-2 block">Rodzaj podatnika</Label>
        <RadioGroup
          className="flex flex-wrap gap-6"
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
              Podmiot niebędący osobą fizyczną
            </Label>
          </div>
        </RadioGroup>
      </div>
      {!natural_person ? (
        <>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="NIP"
                className="mb-2 block"
                onClick={() => {
                  changeFieldText("NIP", "", "12345678901", setValue);
                  changeFieldText(
                    "full_name",
                    "Radek Krochmal",
                    "Radosław Krochmal",
                    setValue
                  );
                  changeFieldText("short_name", "", "Radek", setValue);
                  changeFieldText("country", "", "Polska", setValue);
                  changeFieldState("natural_person", "false", setValue);
                }}
              >
                NIP
              </Label>
              <Input
                className={errors && "NIP" in errors ? "border-red-500" : ""}
                type="text"
                id="NIP"
                {...register("NIP")}
              />
              {errors && "NIP" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.NIP?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="full_name" className="mb-2 block">
                Nazwa pełna
              </Label>
              <Input
                className={
                  errors && "full_name" in errors ? "border-red-500" : ""
                }
                type="text"
                id="full_name"
                {...register("full_name")}
              />
              {errors && "full_name" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.full_name?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="short_name" className="mb-2 block">
                Nazwa skrócona
              </Label>
              <Input
                className={
                  errors && "short_name" in errors ? "border-red-500" : ""
                }
                type="text"
                id="short_name"
                {...register("short_name")}
              />
              {errors && "short_name" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.short_name?.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-6">
            <Label className="mb-2 block">Identyfikator podatkowy</Label>
            <RadioGroup
              className="flex gap-6"
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
            <div className="mb-4">
              <Label htmlFor="PESEL" className="mb-2 block">
                PESEL
              </Label>
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
              {natural_person &&
                "type" in errors &&
                errors.type &&
                "PESEL" in errors.type && (
                  <p className="text-red-500 mt-1">
                    {(errors.type.PESEL as FieldError)?.message?.toString()}
                  </p>
                )}
            </div>
          ) : (
            <div className="mb-4">
              <Label htmlFor="NIP" className="mb-2 block">
                NIP
              </Label>
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
                  <p className="text-red-500 mt-1">
                    {(errors.type.NIP as FieldError)?.message?.toString()}
                  </p>
                )}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <Label htmlFor="first_name" className="mb-2 block">
                Pierwsze imię
              </Label>
              <Input
                className={
                  errors && "first_name" in errors ? "border-red-500" : ""
                }
                type="text"
                id="first_name"
                {...register("first_name")}
              />
              {errors && "first_name" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.first_name?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="last_name" className="mb-2 block">
                Nazwisko
              </Label>
              <Input
                className={
                  errors && "last_name" in errors ? "border-red-500" : ""
                }
                type="text"
                id="last_name"
                {...register("last_name")}
              />
              {errors && "last_name" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.last_name?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="father_name" className="mb-2 block">
                Imię ojca <i>(opcjonalne)</i>
              </Label>
              <Input
                className={
                  errors && "father_name" in errors ? "border-red-500" : ""
                }
                type="text"
                id="father_name"
                {...register("father_name")}
              />
              {errors && "father_name" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.father_name?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="mother_name" className="mb-2 block">
                Imię matki <i>(opcjonalne)</i>
              </Label>
              <Input
                className={
                  errors && "mother_name" in errors ? "border-red-500" : ""
                }
                type="text"
                id="mother_name"
                {...register("mother_name")}
              />
              {errors && "mother_name" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.mother_name?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="date_of_birth" className="mb-2 block">
                Data urodzenia
              </Label>
              <Input
                className={
                  errors && "date_of_birth" in errors ? "border-red-500" : ""
                }
                type="date"
                id="date_of_birth"
                {...register("date_of_birth")}
              />
              {errors && "date_of_birth" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.date_of_birth?.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </>
      )}
      <div className="mb-6">
        <Label className="mb-2 block ">Kraj</Label>
        <Input
          className={errors && "country" in errors ? "border-red-500" : ""}
          type="text"
          id="country"
          {...register("country")}
        />
        {errors && "country" in errors && (
          <p className="text-red-500 mt-1">
            {errors.country?.message?.toString()}
          </p>
        )}
      </div>
      <div className="mb-6">
        <Label className="mb-2 block ">Województwo</Label>
        <Input
          className={errors && "voivodeship" in errors ? "border-red-500" : ""}
          type="text"
          id="voivodeship"
          {...register("voivodeship")}
        />
        {errors && "voivodeship" in errors && (
          <p className="text-red-500 mt-1">
            {errors.voivodeship?.message?.toString()}
          </p>
        )}
      </div>
      <div className="mb-6">
        <Label className="mb-2 block">Powiat</Label>
        <Input
          type="text"
          id="county"
          {...register("county")}
          className={errors && "county" in errors ? "border-red-500" : ""}
        />
        {errors && "county" in errors && (
          <p className="text-red-500 mt-1">
            {errors.county?.message?.toString()}
          </p>
        )}
      </div>
      <div className="mb-6">
        <Label className="mb-2 block">Gmina</Label>
        <Input
          type="text"
          id="municipality"
          {...register("municipality")}
          className={errors && "municipality" in errors ? "border-red-500" : ""}
        />
        {errors && "municipality" in errors && (
          <p className="text-red-500 mt-1">
            {errors.municipality?.message?.toString()}
          </p>
        )}
      </div>
      <div className="mb-6">
        <Label className="mb-2 block">Miejscowość</Label>
        <Input
          type="text"
          id="city"
          {...register("city")}
          className={errors && "city" in errors ? "border-red-500" : ""}
        />
        {errors && "city" in errors && (
          <p className="text-red-500 mt-1">
            {errors.city?.message?.toString()}
          </p>
        )}
      </div>
      <div className="mb-6">
        <Label className="mb-2 block">Ulica</Label>
        <Input type="text" id="street" {...register("street")} />
      </div>
      <div className="mb-6">
        <Label className="mb-2 block">Numer domu</Label>
        <Input
          type="text"
          id="house_number"
          {...register("house_number")}
          className={errors && "house_number" in errors ? "border-red-500" : ""}
        />
        {errors && "house_number" in errors && (
          <p className="text-red-500 mt-1">
            {errors.house_number?.message?.toString()}
          </p>
        )}
      </div>
      <div className="mb-6">
        <Label className="mb-2 block">Numer mieszkania</Label>
        <Input
          type="text"
          id="apartment_number"
          {...register("apartment_number")}
        />
      </div>
      <div className="mb-6">
        <Label className="mb-2 block">Kod pocztowy</Label>
        <Input
          type="text"
          id="postal_code"
          {...register("postal_code")}
          className={errors && "postal_code" in errors ? "border-red-500" : ""}
        />
        {errors && "postal_code" in errors && (
          <p className="text-red-500 mt-1">
            {errors.postal_code?.message?.toString()}
          </p>
        )}
      </div>
    </div>
  );
}
