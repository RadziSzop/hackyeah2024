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
  const p24 = watch("p24");
  const p26 = watch("p26");
  const p28 = watch("p28");
  const p29 = watch("p29");
  const p31 = watch("p31");
  const p32 = watch("p32");
  const p34 = watch("p34");
  const p35 = watch("p35");
  const p37 = watch("p37");
  const p38 = watch("p38");
  const p40 = watch("p40");
  const p43 = watch("p43");
  console.log(p43a, p44, type_of_transaction);
  return (
    <div className="flex-grow border-r min-w-[400px] border-gray-300 pr-4 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-950">Sekcja D</h2>
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
                Umowa pożyczki lub depozytu nieprawidłowego, w tym zwolniona na
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
                Umowa darowizny w części dotyczącej przejęcia przez obdarowanego
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
        {type_of_transaction ===
          "ustanowienie hipoteki na zabezpieczenie wierzytelności o wysokości nieustalonej" && (
          <>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                42. Ustanowienie hipoteki na zabezpieczenie wierzytelności o
                wysokości nieustalonej - obliczony należny podatek zł
              </Label>
              <Input value={19} type="text" id="p42" />
            </div>
          </>
        )}
        {type_of_transaction ===
          "ustanowienie hipoteki na zabezpieczenie wierzytelności istniejących" && (
          <>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                40. Ustanowienie hipoteki na zabezpieczenie wierzytelności o
                wysokości nieustalonej - podstawa opodatkowania określona
                zgodnie z art. 6 ustawy zł
              </Label>
              <Input
                className={errors && "p40" in errors ? "border-red-500" : ""}
                type="text"
                id="p40"
                {...register("p40")}
              />
              {errors && "p40" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.p40?.message?.toString()}
                </p>
              )}
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                41. Ustanowienie hipoteki na zabezpieczenie wierzytelności o
                wysokości nieustalonej - stawka podatku określona zgodnie z art.
                7 ustawy
              </Label>
              <Input
                value={p40 ? Math.round(p40 / 1000) : 0}
                type="text"
                id="p41"
              />
            </div>
          </>
        )}

        {type_of_transaction ===
          "ustanowienie odpłatnego użytkowania, w tym nieprawidłowego" && (
          <>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                37. Ustanowienie odpłatnego użytkowania, w tym nieprawidłowego -
                podstawa opodatkowania określona zgodnie z art. 6 ustawy zł
              </Label>
              <Input
                className={errors && "p37" in errors ? "border-red-500" : ""}
                type="text"
                id="p37"
                {...register("p37")}
              />
              {errors && "p37" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.p37?.message?.toString()}
                </p>
              )}
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                38. Ustanowienie odpłatnego użytkowania, w tym nieprawidłowego -
                stawka podatku określona zgodnie z art. 7 ustawy
              </Label>
              <RadioGroup className="flex flex-wrap gap-6" defaultValue={"1"}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="1"
                    id="p38_1"
                    className="w-5 h-5"
                    onClick={() => setValue("p38", "1")}
                  />
                  <Label htmlFor="p38_1" className="text-lg">
                    1%
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="2"
                    id="p38_2"
                    className="w-5 h-5"
                    onClick={() => setValue("p38", "20")}
                  />
                  <Label htmlFor="p38_2" className="text-lg">
                    2%
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                39. Ustanowienie odpłatnego użytkowania, w tym nieprawidłowego -
                obliczony należny podatek zł
              </Label>
              <Input
                value={p38 && p37 ? Math.round((p37 * parseInt(p38)) / 100) : 0}
                className={errors && "p39" in errors ? "border-red-500" : ""}
                type="text"
                id="p39"
              />
            </div>
          </>
        )}
        {type_of_transaction ===
          "umowa darowizny w części dotyczącej przejęcia przez obdarowanego długów i ciężarów lub zobowiązań darczyńcy" && (
          <>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                34. Umowa darowizny w części dotyczącej przejęcia przez
                obdarowanego długów i ciężarów lub zobowiązań darczyńcy -
                podstawa opodatkowania określona zgodnie z art. 6 ustawy zł
              </Label>
              <Input
                className={errors && "p34" in errors ? "border-red-500" : ""}
                type="text"
                id="p34"
                {...register("p34")}
              />
              {errors && "p34" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.p34?.message?.toString()}
                </p>
              )}
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                35. Umowa darowizny w części dotyczącej przejęcia przez
                obdarowanego długów i ciężarów lub zobowiązań darczyńcy - stawka
                podatku określona zgodnie z art. 7 ustawy
              </Label>
              <RadioGroup className="flex flex-wrap gap-6" defaultValue={"1"}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="1"
                    id="p35_1"
                    className="w-5 h-5"
                    onClick={() => setValue("p35", "1")}
                  />
                  <Label htmlFor="p35_1" className="text-lg">
                    1%
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="2"
                    id="p35_2"
                    className="w-5 h-5"
                    onClick={() => setValue("p35", "2")}
                  />
                  <Label htmlFor="p35_2" className="text-lg">
                    2%
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                36. Umowa darowizny w części dotyczącej przejęcia przez
                obdarowanego długów i ciężarów lub zobowiązań darczyńcy -
                obliczony należny podatek zł
              </Label>
              <Input
                value={p35 && p34 ? Math.round((p34 * parseInt(p35)) / 100) : 0}
                className={errors && "p36" in errors ? "border-red-500" : ""}
                type="text"
                id="p36"
              />
            </div>
          </>
        )}
        {type_of_transaction ===
          "umowa pożyczki lub depozytu nieprawidłowego, w tym zwolniona na podstawie art. 9 pkt 10 lit.b ustawy" && (
          <>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                31. Umowa pożyczki lub depozytu nieprawidłowego, w tym zwolniona
                na podstawie art. 9 pkt 10 lit.b ustawy - podstawa opodatkowania
                określona zgodnie z art. 6 ustawy zł
              </Label>
              <Input
                className={errors && "p31" in errors ? "border-red-500" : ""}
                type="text"
                id="p31"
                {...register("p31")}
              />
              {errors && "p31" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.p31?.message?.toString()}
                </p>
              )}
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                32. Umowa pożyczki lub depozytu nieprawidłowego, w tym zwolniona
                na podstawie art. 9 pkt 10 lit.b ustawy - stawka podatku
                określona zgodnie z art. 7 ustawy
              </Label>
              <RadioGroup className="flex flex-wrap gap-6" defaultValue={"1"}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="0"
                    id="p32_0"
                    className="w-5 h-5"
                    onClick={() => setValue("p32", "0")}
                  />
                  <Label htmlFor="p32_1" className="text-lg">
                    0%
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="0.5"
                    id="p32_0.5"
                    className="w-5 h-5"
                    onClick={() => setValue("p32", "0.5")}
                  />
                  <Label htmlFor="p32_0.5" className="text-lg">
                    0.5%
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="2"
                    id="p32_2"
                    className="w-5 h-5"
                    onClick={() => setValue("p32", "2")}
                  />
                  <Label htmlFor="p32_2" className="text-lg">
                    2%
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="20"
                    id="p32_20"
                    className="w-5 h-5"
                    onClick={() => setValue("p32", "20")}
                  />
                  <Label htmlFor="p32_20" className="text-lg">
                    20%
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                33. Umowa pożyczki lub depozytu nieprawidłowego, w tym zwolniona
                na podstawie art. 9 pkt 10 lit.b ustawy - obliczony należny
                podatek zł
              </Label>
              <Input
                value={
                  p32 && p31 ? Math.round((p31 * parseFloat(p32)) / 100) : 0
                }
                className={errors && "p33" in errors ? "border-red-500" : ""}
                type="text"
                id="p33"
              />
            </div>
          </>
        )}
        {type_of_transaction === "umowa zamiany" && (
          <>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                28. Umowa zamiany - podstawa opodatkowania określona zgodnie z
                art. 6 ustawy zł
              </Label>
              <Input
                className={errors && "p28" in errors ? "border-red-500" : ""}
                type="text"
                id="p28"
                {...register("p28")}
              />
              {errors && "p28" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.p28?.message?.toString()}
                </p>
              )}
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                29. Umowa zamiany - stawka podatku określona zgodnie z art. 7
                ustawy
              </Label>
              <RadioGroup className="flex flex-wrap gap-6" defaultValue={"1"}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="1"
                    id="p29_1"
                    className="w-5 h-5"
                    onClick={() => setValue("p29", "1")}
                  />
                  <Label htmlFor="p44_1" className="text-lg">
                    1%
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="2"
                    id="p29_2"
                    className="w-5 h-5"
                    onClick={() => setValue("p29", "2")}
                  />
                  <Label htmlFor="p29_2" className="text-lg">
                    2%
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                30. Umowa zamiany - obliczony należny podatek zł
              </Label>
              <Input
                value={p29 && p28 ? Math.round((p28 * parseInt(p29)) / 100) : 0}
                className={errors && "p30" in errors ? "border-red-500" : ""}
                type="text"
                id="p30"
              />
            </div>
          </>
        )}
        {type_of_transaction === "umowa sprzedaży" && (
          <>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                24. Umowa sprzedaży (stawka podatku 1%) - podstawa opodatkowania
                określona zgodnie z art. 6 ustawy zł
              </Label>
              <Input
                className={errors && "p24" in errors ? "border-red-500" : ""}
                type="text"
                id="p24"
                {...register("p24")}
              />
              {errors && "p24" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.p24?.message?.toString()}
                </p>
              )}
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                25. Umowa sprzedaży (stawka podatku 1%) - obliczony należny
                podatek zł
              </Label>
              <Input
                value={p24 ? Math.round(p24 * 0.01) : 0}
                className={errors && "p25" in errors ? "border-red-500" : ""}
                type="text"
                id="p25"
              />
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                26. Umowa sprzedaży (stawka podatku 2%) - podstawa opodatkowania
                określona zgodnie z art. 6 ustawy zł
              </Label>
              <Input
                className={errors && "p26" in errors ? "border-red-500" : ""}
                type="text"
                id="p26"
                {...register("p26")}
              />
              {errors && "p26" in errors && (
                <p className="text-red-500 mt-1">
                  {errors.p26?.message?.toString()}
                </p>
              )}
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <Label className="mb-2 block">
                27. Umowa sprzedaży (stawka podatku 2%) - obliczony należny
                podatek
              </Label>
              <Input
                value={p26 ? Math.round(p26 * 0.02) : 0}
                className={errors && "p27" in errors ? "border-red-500" : ""}
                type="text"
                id="p27"
              />
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
                43. Inna czynność - podstawa opodatkowania określona zgodnie z
                art. 6 ustawy zł
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
                45. Inna czynność - obliczony należny podatek
              </Label>
              <Input
                value={p43 && p44 ? Math.round((p43 * parseInt(p44)) / 100) : 0}
                className={errors && "p45" in errors ? "border-red-500" : ""}
                type="text"
                id="p45"
              />
            </div>
          </>
        )}
        <div className="mb-6 flex flex-col gap-4">
          <Label className="mb-2 block">46. Kwota należnego podatku zł</Label>
          <Input
            value={
              type_of_transaction === "umowa sprzedaży"
                ? Math.round(p24 * 0.01) + Math.round(p26 * 0.02)
                : type_of_transaction === "umowa zamiany"
                  ? Math.round((p28 * parseInt(p29)) / 100)
                  : type_of_transaction ===
                      "umowa darowizny w części dotyczącej przejęcia przez obdarowanego długów i ciężarów lub zobowiązań darczyńcy"
                    ? Math.round((p34 * parseInt(p35)) / 100)
                    : type_of_transaction ===
                        "ustanowienie odpłatnego użytkowania, w tym nieprawidłowego"
                      ? (p37 * parseInt(p38)) / 100
                      : type_of_transaction ===
                          "ustanowienie hipoteki na zabezpieczenie wierzytelności istniejących"
                        ? Math.round(p40 / 1000)
                        : type_of_transaction ===
                            "ustanowienie hipoteki na zabezpieczenie wierzytelności o wysokości nieustalonej"
                          ? 19
                          : type_of_transaction ===
                              "umowa pożyczki lub depozytu nieprawidłowego, w tym zwolniona na podstawie art. 9 pkt 10 lit.b ustawy"
                            ? Math.round((p31 * parseFloat(p32)) / 100)
                            : type_of_transaction === "inna czynność"
                              ? Math.round((p43 * parseInt(p44)) / 100)
                              : 0
            }
            className={errors && "p46" in errors ? "border-red-500" : ""}
            type="text"
            id="p46"
          />
        </div>
        <Button type="submit" className="mt-6">
          Submit
        </Button>
      </form>
    </div>
  );
}
