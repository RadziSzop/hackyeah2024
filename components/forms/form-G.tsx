"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import { schemaG } from "@/utils/schemas/PCC3";

export default function TempForm() {
  type FormData = z.infer<typeof schemaG>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schemaG),
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <div className="flex-grow min-w-[400px] pr-4 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-950">Sekcja B</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-6">
          <Label className="mb-2 block">Województwo</Label>
          <Input
            type="text"
            id="additional_voivodeship"
            {...register("additional_voivodeship")}
          />
        </div>
        <div className="mb-6">
          <Label className="mb-2 block">Powiat</Label>
          <Input
            type="text"
            id="additional_county"
            {...register("additional_county")}
          />
        </div>
        <div className="mb-6">
          <Label className="mb-2 block">Gmina</Label>
          <Input
            type="text"
            id="additional_municipality"
            {...register("additional_municipality")}
          />
        </div>
        <div className="mb-6">
          <Label className="mb-2 block">Miejscowość</Label>
          <Input
            type="text"
            id="additional_city"
            {...register("additional_city")}
          />
        </div>
        <div className="mb-6">
          <Label className="mb-2 block">Ulica</Label>
          <Input
            type="text"
            id="additional_street"
            {...register("additional_street")}
          />
        </div>
        <div className="mb-6">
          <Label className="mb-2 block">Numer domu</Label>
          <Input
            type="text"
            id="additional_house_number"
            {...register("additional_house_number")}
          />
        </div>
        <div className="mb-6">
          <Label className="mb-2 block">Numer mieszkania</Label>
          <Input
            type="text"
            id="additional_apartment_number"
            {...register("additional_apartment_number")}
          />
        </div>
        <div className="mb-6">
          <Label className="mb-2 block">Kod pocztowy</Label>
          <Input
            type="text"
            id="additional_postal_code"
            {...register("additional_postal_code")}
          />
        </div>

        <Button type="submit" className="mt-6">
          Zweryfikuj
        </Button>
      </form>
    </div>
  );
}
