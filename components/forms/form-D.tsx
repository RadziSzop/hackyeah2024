"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { schemaD } from "@/utils/schemas/PCC3";

export default function FormC() {
  type FormData = z.infer<typeof schemaD>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schemaD),
  });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) =>
    console.log(data);
  const type_of_transaction = watch("type_of_transaction");
  const p43a = watch("p43a");
  const p44 = watch("p44");
  console.log(p43a, p44, type_of_transaction);
  return (
    <div className="flex-grow border-r min-w-[400px] border-gray-300 pr-4 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-950">Tax Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-6">
          <Label className="mb-2 block">Rodzaj transakcji</Label>

          <RadioGroup className="flex flex-col gap-6" defaultValue={"Umowa"}>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="umowa sprzedaży"
                id="type_of_transaction_umowa_sprzedazy"
                className="w-5 h-5"
                onClick={() =>
                  setValue("type_of_transaction", "umowa sprzedaży")
                }
              />
              <Label
                htmlFor="type_of_transaction_umowa_sprzedazy"
                className="text-lg"
              >
                Umowa
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="Umowa zamiany"
                id="type_of_transaction_zmiana_umowy"
                className="w-5 h-5"
                onClick={() => setValue("type_of_transaction", "umowa zamiany")}
              />
              <Label
                htmlFor="type_of_transaction_umowa_zamiany"
                className="text-lg"
              >
                Umowa zamiany
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="umowa pożyczki lub depozytu nieprawidłowego, w tym zwolniona na podstawie art. 9 pkt 10 lit.b ustawy"
                id="subject_of_taxation_orzeczenie_sadu_lub_ugoda"
                className="w-5 h-5"
                onClick={() =>
                  setValue(
                    "type_of_transaction",
                    "umowa pożyczki lub depozytu nieprawidłowego, w tym zwolniona na podstawie art. 9 pkt 10 lit.b ustawy"
                  )
                }
              />
              <Label
                htmlFor="subject_of_taxation_orzeczenie_sadu_lub_ugoda"
                className="text-lg"
              >
                umowa pożyczki lub depozytu nieprawidłowego, w tym zwolniona na
                podstawie art. 9 pkt 10 lit.b ustawy
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="umowa darowizny w części dotyczącej przejęcia przez obdarowanego długów i ciężarów lub zobowiązań darczyńcy"
                id="subject_of_taxation_darowizna"
                className="w-5 h-5"
                onClick={() =>
                  setValue(
                    "type_of_transaction",
                    "umowa darowizny w części dotyczącej przejęcia przez obdarowanego długów i ciężarów lub zobowiązań darczyńcy"
                  )
                }
              />
              <Label
                htmlFor="subject_of_taxation_darowizna"
                className="text-lg"
              >
                umowa darowizny w części dotyczącej przejęcia przez obdarowanego
                długów i ciężarów lub zobowiązań darczyńcy
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="ustanowienie odpłatnego użytkowania, w tym nieprawidłowego"
                id="subject_of_taxation_odplatne_uzytkowanie"
                className="w-5 h-5"
                onClick={() =>
                  setValue(
                    "type_of_transaction",
                    "ustanowienie odpłatnego użytkowania, w tym nieprawidłowego"
                  )
                }
              />
              <Label
                htmlFor="subject_of_taxation_odplatne_uzytkowanie"
                className="text-lg"
              >
                Ustanowienie odpłatnego użytkowania, w tym nieprawidłowego
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="ustanowienie hipoteki na zabezpieczenie wierzytelności istniejących"
                id="subject_of_taxation_hipoteka_istniejacych"
                className="w-5 h-5"
                onClick={() =>
                  setValue(
                    "type_of_transaction",
                    "ustanowienie hipoteki na zabezpieczenie wierzytelności istniejących"
                  )
                }
              />
              <Label
                htmlFor="subject_of_taxation_hipoteka_istniejacych"
                className="text-lg"
              >
                Ustanowienie hipoteki na zabezpieczenie wierzytelności
                istniejących
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="ustanowienie hipoteki na zabezpieczenie wierzytelności o wysokości nieustalonej"
                id="subject_of_taxation_hipoteka_nieustalona"
                className="w-5 h-5"
                onClick={() =>
                  setValue(
                    "type_of_transaction",
                    "ustanowienie hipoteki na zabezpieczenie wierzytelności o wysokości nieustalonej"
                  )
                }
              />
              <Label
                htmlFor="subject_of_taxation_hipoteka_nieustalona"
                className="text-lg"
              >
                Ustanowienie hipoteki na zabezpieczenie wierzytelności o
                wysokości nieustalonej
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="inna czynność"
                id="subject_of_taxation_inna_czynnosc"
                className="w-5 h-5"
                onClick={() => setValue("type_of_transaction", "inna czynność")}
              />
              <Label
                htmlFor="subject_of_taxation_inna_czynnosc"
                className="text-lg"
              >
                Inna czynność
              </Label>
            </div>
          </RadioGroup>
        </div>
        {type_of_transaction === "umowa sprzedaży" && (
          <>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">Inna czynność cywilnoprawna</Label>
              <Input
                className={errors && "p43" in errors ? "border-red-500" : ""}
                type="text"
                id="p43"
                {...register("p43")}
              />
              {errors && "p43" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.p43?.message?.toString()}
                </p>
              )}
            </div>
          </>
        )}
        {type_of_transaction === "inna czynność" && (
          <>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">Inna czynność cywilnoprawna</Label>
              <RadioGroup
                className="flex flex-col gap-6"
                defaultValue={"Umowa dożywocia"}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="Umowa dożywocia"
                    id="p43a_umowa_dożywocia"
                    className="w-5 h-5"
                    onClick={() => {
                      setValue("p43a", "Umowa dożywocia");

                      if (p44 === "6") {
                        setValue("p44", "2");
                      }
                    }}
                  />
                  <Label htmlFor="p43a_umowa_dożywocia" className="text-lg">
                    Umowa dożywocia
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="Umowa o dział spadku - w części spłat lub dopłat"
                    id="p43a_umowa_dzialu_spadku"
                    className="w-5 h-5"
                    onClick={() => {
                      setValue(
                        "p43a",
                        "Umowa o dział spadku - w części spłat lub dopłat"
                      );
                      if (p44 === "6") {
                        setValue("p44", "2");
                      }
                    }}
                  />
                  <Label htmlFor="p43a_umowa_dzialu_spadku" className="text-lg">
                    Umowa o dział spadku - w części spłat lub dopłat
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="Umowa o zniesienie współwłasności - w części spłat lub dopłat"
                    id="p43a_umowa_zniesienia_wspolwlasnosci"
                    className="w-5 h-5"
                    onClick={() => {
                      setValue(
                        "p43a",
                        "Umowa o zniesienie współwłasności - w części spłat lub dopłat"
                      );
                      if (p44 === "6") {
                        setValue("p44", "2");
                      }
                    }}
                  />
                  <Label
                    htmlFor="p43a_umowa_zniesienia_wspolwlasnosci"
                    className="text-lg"
                  >
                    Umowa o zniesienie współwłasności - w części spłat lub
                    dopłat
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="Ustanowienie odpłatnej służebności"
                    id="p43a_ustanowienie_odplatnej_sluzebności"
                    className="w-5 h-5"
                    onClick={() => {
                      setValue("p43a", "Ustanowienie odpłatnej służebności");
                      if (p44 === "6") {
                        setValue("p44", "2");
                      }
                    }}
                  />
                  <Label
                    htmlFor="p43a_ustanowienie_odplatnej_sluzebności"
                    className="text-lg"
                  >
                    Ustanowienie odpłatnej służebności
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="Orzeczenie sądu"
                    id="p43a_orzeczenie_sad"
                    className="w-5 h-5"
                    onClick={() => setValue("p43a", "Orzeczenie sądu")}
                  />
                  <Label htmlFor="p43a_orzeczenie_sad" className="text-lg">
                    Orzeczenie sądu
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="p43a" className="mb-2 block">
                Inna czynność - podstawa opodatkowania określona zgodnie z art.
                6 ustawy zł
              </Label>
              <Input
                className={errors && "p43" in errors ? "border-red-500" : ""}
                type="text"
                id="p43"
                {...register("p43")}
              />
              {errors && "p43" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.p43?.message?.toString()}
                </p>
              )}
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                44. Inna czynność - stawka podatku określona zgodnie z art. 7
                ustawy
              </Label>
              <RadioGroup className="flex flex-wrap gap-6" defaultValue={"1"}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="1"
                    id="p44_1"
                    className="w-5 h-5"
                    onClick={() => setValue("p44", "1")}
                    checked={p44 === "1"}
                  />
                  <Label htmlFor="p44_1" className="text-lg">
                    1%
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="2"
                    id="p44_2"
                    className="w-5 h-5"
                    onClick={() => setValue("p44", "2")}
                    checked={p44 === "2"}
                  />
                  <Label htmlFor="p44_2" className="text-lg">
                    2%
                  </Label>
                </div>
                {p43a === "Orzeczenie sądu" && (
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem
                      value="6"
                      id="p44_6"
                      className="w-5 h-5"
                      onClick={() => setValue("p44", "6")}
                      checked={p44 === "6"}
                    />
                    <Label htmlFor="p44_6" className="text-lg">
                      6%
                    </Label>
                  </div>
                )}
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="p45" className="mb-2 block">
                Inna czynność - obliczony należny podatek zł*
              </Label>
              <Input
                className={errors && "p45" in errors ? "border-red-500" : ""}
                type="text"
                id="p45"
              />
            </div>
            <div>
              <Label htmlFor="p46" className="mb-2 block">
                Kwota należnego podatku zł
              </Label>
              <Input
                className={errors && "p46" in errors ? "border-red-500" : ""}
                type="text"
                id="p45"
              />
            </div>
          </>
        )}
        <Button type="submit" className="mt-6">
          Submit
        </Button>
      </form>
    </div>
  );
}
