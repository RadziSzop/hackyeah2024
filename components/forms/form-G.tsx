"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import { schemaG } from "@/utils/schemas/PCC3";

interface FormGProps {
  register: any;
  handleSubmit: any;
  watch: any;
  setValue: any;
}

export default function FormG({
  register,
  handleSubmit,
  watch,
  setValue,
}: FormGProps) {
  return (
    <div className="flex-grow min-w-[400px] pr-4 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-950">Sekcja G</h2>
      <div className="mb-6 space-y-6">
        <Label className="mb-2 block">
          Województwo <i>(opcjonalne)</i>
        </Label>
        <Input
          type="text"
          id="additional_voivodeship"
          {...register("additional_voivodeship")}
        />
      </div>
      <div className="mb-6">
        <Label className="mb-2 block">
          Powiat <i>(opcjonalne)</i>
        </Label>
        <Input
          type="text"
          id="additional_county"
          {...register("additional_county")}
        />
      </div>
      <div className="mb-6">
        <Label className="mb-2 block">
          Gmina <i>(opcjonalne)</i>
        </Label>
        <Input
          type="text"
          id="additional_municipality"
          {...register("additional_municipality")}
        />
      </div>
      <div className="mb-6">
        <Label className="mb-2 block">
          Miejscowość <i>(opcjonalne)</i>
        </Label>
        <Input
          type="text"
          id="additional_city"
          {...register("additional_city")}
        />
      </div>
      <div className="mb-6">
        <Label className="mb-2 block">
          Ulica <i>(opcjonalne)</i>
        </Label>
        <Input
          type="text"
          id="additional_street"
          {...register("additional_street")}
        />
      </div>
      <div className="mb-6">
        <Label className="mb-2 block">
          Numer domu <i>(opcjonalne)</i>
        </Label>
        <Input
          type="text"
          id="additional_house_number"
          {...register("additional_house_number")}
        />
      </div>
      <div className="mb-6">
        <Label className="mb-2 block">
          Numer mieszkania <i>(opcjonalne)</i>
        </Label>
        <Input
          type="text"
          id="additional_apartment_number"
          {...register("additional_apartment_number")}
        />
      </div>
      <div className="mb-6">
        <Label className="mb-2 block">
          Kod pocztowy <i>(opcjonalne)</i>
        </Label>
        <Input
          type="text"
          id="additional_postal_code"
          {...register("additional_postal_code")}
        />
      </div>
    </div>
  );
}
