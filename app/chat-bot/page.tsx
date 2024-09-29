import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TempForm from "@/components/temp-form";
import Chat from "@/components/chat";
import FormA from "@/components/forms/form-A";

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
      <FormA />
      <Chat />
    </>
  );
}
