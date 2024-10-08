import Link from "next/link";
import { Button } from "./button";
import { HandCoins, Landmark, Wallet } from "lucide-react";
import { signOutAction } from "@/app/actions";
import Navlinks from "./Navlinks";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import logo from "/app/podatkomat.gif";

export default async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col w-full fixed z-10">
      <header className="bg-blue-950 text-white">
        <div className="mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center space-x-2">
                {/* <h1 className="text-2xl font-bold">Podatkomat</h1> */}
                <Image
                  src={logo}
                  alt="Podatkomat"
                  style={{ width: "500px", height: "40px" }}
                />
              </div>
            </Link>
            <Navlinks user={user} />
          </nav>
        </div>
      </header>
    </div>
  );
}
