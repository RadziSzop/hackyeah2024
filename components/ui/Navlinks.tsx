"use client";

import Link from "next/link";
import { Button } from "./button";
import { signOutAction } from "@/app/actions";

interface NavLinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavLinksProps) {
  console.log(user);
  return (
    <div>
      {!user ? (
        <Link href="/sign-in">
          <Button
            variant="outline"
            className="bg-white text-blue-950 hover:bg-blue-100"
          >
            Zaloguj się
          </Button>
        </Link>
      ) : (
        <form action={signOutAction}>
          <Button
            variant="outline"
            className="bg-white text-blue-950 hover:bg-blue-100"
          >
            Wyloguj się
          </Button>
        </form>
      )}
    </div>
  );
}
