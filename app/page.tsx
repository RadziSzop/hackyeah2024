import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Sparkle, Sparkles, Star } from "lucide-react";

export default async function Component() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-grow flex flex-col lg:flex-row relative">
        <aside className="lg:w-1/4 bg-blue-50 p-6 lg:sticky lg:top-0">
          <h3 className="text-2xl font-semibold mb-6 text-blue-950">
            Jak nasz AI Asystent Podatkowy ułatwi Ci życie
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-2 text-blue-950">
                1. Rozpocznij rozmowę z AI
              </h4>
              <p className="text-gray-700">
                Nasz inteligentny asystent poprowadzi Cię przez prosty dialog,
                aby zrozumieć Twoją sytuację podatkową.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-blue-950">
                2. Błyskawiczna analiza Twoich danych
              </h4>
              <p className="text-gray-700">
                Na podstawie Twoich odpowiedzi, asystent szybko znajdzie
                najlepsze rozwiązania i potencjalne oszczędności.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-blue-950">
                3. Formularze wypełnią się same
              </h4>
              <p className="text-gray-700">
                Zapomnij o żmudnym wypełnianiu - AI zrobi to za Ciebie,
                oszczędzając Twój cenny czas.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-blue-950">
                4. Spokój ducha przy składaniu deklaracji
              </h4>
              <p className="text-gray-700">
                Rzuć okiem na gotowe formularze, wprowadź ostatnie poprawki i
                złóż deklarację bez stresu.
              </p>
            </div>
          </div>
        </aside>

        <main className="lg:w-3/4 relative">
          <div className="absolute inset-0 overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster="/placeholder.svg?height=720&width=1280"
              disablePictureInPicture={true}
            >
              <source
                src="https://cdn.discordapp.com/attachments/438706496616792077/1289607355818049578/jakischuj.mp4?ex=66f96ff1&is=66f81e71&hm=b2ab62cb2782e94ec9ace850b080f6b1128ec1e85e76fa46d993426b3d8f3d73&"
                type="video/mp4"
              />
              Twoja przeglądarka nie obsługuje tagu wideo.
            </video>
            <div className="absolute inset-0 bg-blue-950 bg-opacity-75"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
            <section className="text-center mb-12 pt-12">
              <h2 className="text-4xl font-bold mb-4">
                Twój Osobisty Asystent Podatkowy
              </h2>
              <p className="text-xl mb-8">
                Rozlicz podatki szybko i bez stresu z pomocą naszego
                inteligentnego asystenta
              </p>
              <Link href={user ? "/chat-bot" : "/sign-in"}>
                <Button
                  size="lg"
                  className="bg-red-700 hover:bg-red-800 text-white"
                >
                  Rozpocznij rozmowę <Sparkles className="ml-2" />
                </Button>
              </Link>
            </section>

            <section className="bg-blue-900 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-semibold text-center mb-6 text-white">
                  Dlaczego warto skorzystać z naszego AI Asystenta
                </h3>
                <p className="text-center text-white">
                  Wyobraź sobie, że masz osobistego eksperta podatkowego
                  dostępnego 24/7. Nasz AI Asystent to właśnie to! Przeprowadzi
                  Cię przez rozliczenie podatkowe tak łatwo, jakbyś rozmawiał z
                  przyjacielem. Analizuje Twoje odpowiedzi, wypełnia formularze
                  i dba o Twoje korzyści finansowe. Zapomnij o stresie związanym
                  z podatkami - z naszym AI to będzie przyjemność! Oszczędź
                  czas, nerwy i pieniądze. Pozwól AI zadbać o Twoje podatki, a
                  Ty zajmij się tym, co naprawdę lubisz!
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
