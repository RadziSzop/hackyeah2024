import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TempForm from "@/components/temp-form";
import Chat from "@/components/chat";
import FormA from "@/components/forms/form-A";
import FormB from "@/components/forms/form-B";
import FormC from "@/components/forms/form-C";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import FormD from "@/components/forms/form-D";
import FormE from "@/components/forms/form-E";

export default async function ChatBot() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <ScrollArea>
          <div className="flex flex-col pr-10 gap-4 border-r border-gray-300">
            <h1 className="text-3xl font-bold mt-8 text-blue-950">
              Formularz podatkowy PCC3
            </h1>
            <FormA />
            <FormB />
            <FormC />
            <FormE />
          </div>
        </ScrollArea>
      </div>
      <Chat />
    </>
  );
}
