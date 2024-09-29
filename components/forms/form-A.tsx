"use client";
import { schemaA } from "@/utils/schemas/PCC3";
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

export default function FormA() {
  const declarationOfficesKeys = [
    ...Object.keys(declarationOffices),
    "brak",
  ] as Array<keyof typeof declarationOffices>;

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  type FormData = z.infer<typeof schemaA>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schemaA),
  });

  const onSubmit = (data: FormData) => console.log(data);
  const purpose_of_action = watch("purpose_of_action");
  console.log(value);
  return (
    <div className="flex-grow border-r min-w-[400px] border-gray-300 pr-4 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-950">Tax Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-6">
          <div>
            <Label className="mb-2 block">Date of Action</Label>
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
          <div>
            <Label className="mb-2 block">Purpose of Action</Label>
            <Input
              className={
                errors && "purpose_of_action" in errors ? "border-red-500" : ""
              }
              type="text"
              id="purpose_of_action"
              {...register("purpose_of_action")}
            />
            {errors && "purpose_of_action" in errors && (
              <p className="text-red-500 mt-1">
                {errors.purpose_of_action?.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <Label className="mb-2 block">Tax Office</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className=" justify-between"
                >
                  {value
                    ? declarationOffices.find((name, key) => {
                        return name[1] === value;
                      })?.[0]
                    : "Select Tax Office..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {declarationOffices.map((office) => (
                        <CommandItem
                          key={office[1]}
                          value={office[1]}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === office[1] ? "opacity-100" : "opacity-0"
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
        </div>
        <Button type="submit" className="mt-6">
          Submit
        </Button>
      </form>
    </div>
  );
}
