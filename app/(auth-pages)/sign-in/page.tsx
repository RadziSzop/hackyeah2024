"use client";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Login({ searchParams }: { searchParams: Message }) {
  const { toast } = useToast();

  useEffect(() => {
    if (Object.keys(searchParams)[0] === "success") {
      toast({
        title: "Sukces!",
        description: "Link do logowania został wysłany na Twój adres email.",
        variant: "default",
      });
    }
  }, [searchParams, toast]);
  return (
    <form className="flex flex-col min-w-64 m-auto">
      <h1 className="text-2xl font-medium">Zaloguj się</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Adres Email</Label>
        <Input name="email" placeholder="twójemail@przykład.pl" required />
        <SubmitButton pendingText="Logowanie..." formAction={signInAction}>
          Zaloguj się
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
