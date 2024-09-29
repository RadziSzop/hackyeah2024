import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TempForm from "@/components/temp-form";
import Chat from "@/components/chat";

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
      <TempForm />
      <Chat />
    </>
  );
}
