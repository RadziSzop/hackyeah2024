"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { generateText, streamObject, streamText, tool } from 'ai'
import { openAI } from "@/utils/ai";
import { z } from "zod";

const model = openAI('gpt-4o-mini-2024-07-18')

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

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

  const result = await generateText({
    model: model,
    prompt: prompt,
    tools: {
      problem: tool({
        description: "Get the problem of the user",
        parameters: z.object({
          problem: z.string().describe("The main problem of the sentence given by the user")
        }),
        execute: async ({ problem }) => ({
          problem
        })
      })
    },
    maxSteps: 5,
    toolChoice: "required",
  })

  console.log(result.toolResults)
  console.log(result.text)
  return
};
