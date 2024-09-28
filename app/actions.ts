"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { streamObject, streamText } from "ai";
import { anthropic } from "@/utils/ai";
import { z } from "zod";

const model = anthropic("claude-3-5-sonnet-20240620");

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return encodedRedirect(
    "success",
    "/sign-in",
    "Sprawdź swoją skrzynkę mailową aby się zalogować"
  );
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const askAI = async (formData: FormData) => {
  const supabase = createClient();
  const user = supabase.auth.getUser();

  if (!user) {
    return encodedRedirect(
      "error",
      "/sign-in",
      "You must be signed in to ask a question"
    );
  }

  const prompt = formData.get("prompt") as string;
  const chunkCluster = Array<string>();

  const result = await streamText({
    model: model,
    prompt: prompt,
    onChunk({ chunk }) {
      if (chunk.type === "text-delta") {
        chunkCluster.push(chunk.textDelta);
        console.log(chunk);
      }
    },
  });

  return chunkCluster;
};
