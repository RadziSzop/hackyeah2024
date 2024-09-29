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
          <FormA />
          <FormB />
          <FormC />
          <FormD />
        </ScrollArea>
      </div>
      <Chat />
    </>
  );
}
