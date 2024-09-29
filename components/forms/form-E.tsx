"use client";

import { schemaE } from "@/utils/schemas/PCC3";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function FormA() {
  const declarationOfficesKeys = [
    ...Object.keys(declarationOffices),
    "brak",
  ] as Array<keyof typeof declarationOffices>;

  const [open, setOpen] = React.useState(false);
  const [value, setComboboxValue] = React.useState("");
  type FormData = z.infer<typeof schemaE>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schemaE),
  });

  const onSubmit = (data: FormData) => console.log(data);
  const p47 = watch("p47");
  console.log(value);

  return (
    <div className="flex-grow  min-w-[400px] pr-4 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-950">Sekcja E</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-6">
          <div className="mb-6">
            <Label className="mb-2 block">Typ spółki</Label>

            <RadioGroup
              className="flex flex-wrap gap-6"
              defaultValue={p47 ? "spółka osobowa" : "spółka kapitałowa"}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="terytorium RP"
                  id="p47_spolka_osobowa"
                  className="w-5 h-5"
                  onClick={() => setValue("p47", "Spółka osobowa")}
                />
                <Label htmlFor="p47_spolka_osobowa" className="text-lg">
                  Spółka osobowa
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="spółka kapitałowa"
                  id="p47_spolka_kapitalowa"
                  className="w-5 h-5"
                  onClick={() => setValue("p47", "Spółka kapitałowa")}
                />
                <Label htmlFor="p47_spolka_kapitalowa" className="text-lg">
                  Spółka kapitałowa
                </Label>
              </div>
            </RadioGroup>
          </div>
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
                  ? [
                      "Zawarcia umowy spółki",
                      "Zwiększenia majątku spółki albo podwyższenia kapitału zakładowego",
                      "Dopłaty",
                      "Pożyczki udzielonej spółce osobowej przez wspólnika",
                      "Oddania spółce rzeczy lub praw majątkowych do nieodpłatnego używania",
                      "Przekształcenia spółek",
                      "Łączenia spółek",
                      "Przeniesienia na terytorium Rzeczypospolitej Polskiej rzeczywistego ośrodka zarządzania spółki kapitałowej lub jej siedziby",
                    ].find((name) => {
                      return name === value;
                    })
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
                    {[
                      "Zawarcia umowy spółki",
                      "Zwiększenia majątku spółki albo podwyższenia kapitału zakładowego",
                      "Dopłaty",
                      "Pożyczki udzielonej spółce osobowej przez wspólnika",
                      "Oddania spółce rzeczy lub praw majątkowych do nieodpłatnego używania",
                      "Przekształcenia spółek",
                      "Łączenia spółek",
                      "Przeniesienia na terytorium Rzeczypospolitej Polskiej rzeczywistego ośrodka zarządzania spółki kapitałowej lub jej siedziby",
                    ].map((p48_value) => (
                      <CommandItem
                        key={p48_value}
                        value={p48_value}
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
                            value === p48_value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {p48_value}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="mb-6">
          <Label className="mb-2 block">Kwota</Label>
          <Input
            className={errors && "p49" in errors ? "border-red-500" : ""}
            type="number"
            id="p49"
            {...register("p49")}
          />
          {errors.p49 && (
            <p className="text-red-500">Wartość musi być liczbą</p>
          )}
        </div>
        <div className="mb-6">
          <Label className="mb-2 block">Kwota</Label>
          <Input
            className={errors && "p50" in errors ? "border-red-500" : ""}
            type="number"
            id="p50"
            {...register("p50")}
          />
          {errors.p50 && (
            <p className="text-red-500">Wartość musi być liczbą</p>
          )}
        </div>
        <div className="mb-6">
          <Label className="mb-2 block">Kwota</Label>
          <Input type="number" id="p51" />
        </div>
        <div className="mb-6">
          <Label className="mb-2 block">Kwota</Label>
          <Input type="number" id="p52" />
        </div>
        <Button type="submit" className="mt-6 -translate-y-6">
          Zweryfikuj
        </Button>
      </form>
    </div>
  );
}
