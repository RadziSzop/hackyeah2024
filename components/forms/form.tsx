"use client";

import { schemaA } from "@/utils/schemas/PCC3";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldError, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { declarationOffices } from "@/app/types/formTypes";
import { schemaB } from "@/utils/schemas/PCC3";
import { schemaC } from "@/utils/schemas/PCC3";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { schemaD } from "@/utils/schemas/PCC3";
import { schemaE } from "@/utils/schemas/PCC3";
import { schemaG } from "@/utils/schemas/PCC3";

export default function Form() {
  const [open, setOpen] = React.useState(false);
  const [value, setComboboxValue] = React.useState("");
  type FormData = z.infer<typeof schemaA>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      purpose_of_action: "Złożenie Deklaracji",
    },
    resolver: zodResolver(schemaA),
  });
  const onSubmit = (data: FormData) => console.log(data);
  const purpose_of_action = watch("purpose_of_action");
  return (
    <>
      <section id="A">
        <div className="flex-grow  min-w-[400px] pr-4 p-6">
          <h2 className="text-2xl font-semibold mb-6 text-blue-950">
            Sekcja A
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="mb-6">
              <div className="mb-6">
                <Label className="mb-2 block">Data czynności</Label>
                <Input
                  className={
                    errors && "date_of_action" in errors ? "border-red-500" : ""
                  }
                  type="date"
                  id="date_of_action"
                  {...register("date_of_action")}
                />
                {errors && "date_of_action" in errors && (
                  <p className="text-red-500 mt-1">
                    {errors.date_of_action?.message?.toString()}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <Label className="mb-2 block">Cel czynności</Label>
                <RadioGroup
                  className="flex flex-wrap gap-6"
                  defaultValue={purpose_of_action ? "true" : "false"}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem
                      value="true"
                      id="purpose_of_action_true"
                      className="w-5 h-5"
                      onClick={() =>
                        setValue("purpose_of_action", "Złożenie Deklaracji")
                      }
                    />
                    <Label htmlFor="purpose_of_action_true" className="text-lg">
                      Złożenie Deklaracji
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem
                      value="false"
                      id="purpose_of_action_false"
                      className="w-5 h-5"
                      onClick={() =>
                        setValue("purpose_of_action", "Korekta Deklaracji")
                      }
                    />
                    <Label
                      htmlFor="purpose_of_action_false"
                      className="text-lg"
                    >
                      Korekta Deklaracji
                    </Label>
                  </div>
                </RadioGroup>
                {errors && "purpose_of_action" in errors && (
                  <p className="text-red-500 mt-1">
                    {errors.purpose_of_action?.message?.toString()}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <Label className="mb-2 block">Urząd skarbowy</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="justify-between"
                    >
                      {value
                        ? declarationOffices.find((name, key) => {
                            return name[1] === value;
                          })?.[0]
                        : "Wybierz urząd skarbowy..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Szukaj urzędu..." />
                      <CommandList>
                        <CommandEmpty>Nie znaleziono urzędu.</CommandEmpty>
                        <CommandGroup>
                          {declarationOffices.map((office) => (
                            <CommandItem
                              key={office[1]}
                              value={office[1]}
                              onSelect={(currentValue) => {
                                setComboboxValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === office[1]
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {office[0]}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              {purpose_of_action === "Korekta Deklaracji" && (
                <div className="mb-4">
                  <Label className="mb-2 block">Powód korekty</Label>
                  <Input
                    type="text"
                    id="reason_for_correction"
                    {...register("reason_for_correction")}
                  />
                </div>
              )}
            </div>
            <Button type="submit" className="mt-6 -translate-y-6">
              Zweryfikuj
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
