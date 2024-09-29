"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { schemaC } from "@/utils/schemas/PCC3";

export default function FormC() {
  type FormData = z.infer<typeof schemaC>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      subject_of_taxation: "Umowa",
      location_of_item: "terytorium RP",
      location_of_transaction: "terytorium RP",
    },
    resolver: zodResolver(schemaC),
  });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) =>
    console.log(data);
  const subject_of_taxation = watch("subject_of_taxation");
  const location_of_item = watch("location_of_item");
  const location_of_transaction = watch("location_of_transaction");
  console.log(errors);
  return (
    <div className="flex-grow min-w-[400px] pr-4 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-950">Tax Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-6">
          <Label className="mb-2 block">Przedmiot opodatkowania</Label>

          <RadioGroup
            className="flex flex-wrap gap-6"
            defaultValue={subject_of_taxation ? "Umowa" : "Zmiana Umowy"}
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="Umowa"
                id="subject_of_taxation_umowa"
                className="w-5 h-5"
                onClick={() => setValue("subject_of_taxation", "Umowa")}
              />
              <Label htmlFor="subject_of_taxation_umowa" className="text-lg">
                Umowa
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="Zmiana Umowy"
                id="subject_of_taxation_zmiana_umowy"
                className="w-5 h-5"
                onClick={() => setValue("subject_of_taxation", "Zmiana Umowy")}
              />
              <Label
                htmlFor="subject_of_taxation_zmiana_umowy"
                className="text-lg"
              >
                Zmiana Umowy
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="Orzeczenie Sądu lub Ugoda"
                id="subject_of_taxation_orzeczenie_sadu_lub_ugoda"
                className="w-5 h-5"
                onClick={() =>
                  setValue("subject_of_taxation", "Orzeczenie Sądu lub Ugoda")
                }
              />
              <Label
                htmlFor="subject_of_taxation_orzeczenie_sadu_lub_ugoda"
                className="text-lg"
              >
                Orzeczenie Sądu lub Ugoda
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="Inne"
                id="subject_of_taxation_inne"
                className="w-5 h-5"
                onClick={() => setValue("subject_of_taxation", "Inne")}
              />
              <Label htmlFor="subject_of_taxation_inne" className="text-lg">
                Inne
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="mb-6">
          <Label className="mb-2 block">
            Miejsce położenia rzeczy lub miejsce wykonywania prawa majątkowego
          </Label>

          <RadioGroup
            className="flex flex-wrap gap-6"
            defaultValue={
              location_of_item ? "terytorium RP" : "poza terytorium RP"
            }
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="terytorium RP"
                id="location_of_item_terytorium_rp"
                className="w-5 h-5"
                onClick={() => setValue("location_of_item", "terytorium RP")}
              />
              <Label
                htmlFor="location_of_item_terytorium_rp"
                className="text-lg"
              >
                Terytorium RP
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="poza terytorium RP"
                id="location_of_item_poza_terytorium_rp"
                className="w-5 h-5"
                onClick={() =>
                  setValue("location_of_item", "poza terytorium RP")
                }
              />
              <Label
                htmlFor="location_of_item_poza_terytorium_rp"
                className="text-lg"
              >
                Poza terytorium RP
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="mb-6">
          <Label className="mb-2 block">
            Miejsce dokonania czynności cywilnoprawnej
          </Label>

          <RadioGroup
            className="flex flex-wrap gap-6"
            defaultValue={
              location_of_transaction ? "terytorium RP" : "poza terytorium RP"
            }
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="terytorium RP"
                id="location_of_transaction_terytorium_rp"
                className="w-5 h-5"
                onClick={() =>
                  setValue("location_of_transaction", "terytorium RP")
                }
              />
              <Label
                htmlFor="location_of_transaction_terytorium_rp"
                className="text-lg"
              >
                Terytorium RP
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="poza terytorium RP"
                id="location_of_transaction_poza_terytorium_rp"
                className="w-5 h-5"
                onClick={() =>
                  setValue("location_of_transaction", "poza terytorium RP")
                }
              />
              <Label
                htmlFor="location_of_transaction_poza_terytorium_rp"
                className="text-lg"
              >
                Poza terytorium RP
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="mb-6">
          <Label className="mb-2 block">
            Zwięzłe określenie treści i przedmiotu czynności cywilnoprawnej
          </Label>
          <Input {...register("short_action_description")} />
        </div>
        <Button type="submit" className="mt-6">
          Zweryfikuj
        </Button>
      </form>
    </div>
  );
}
