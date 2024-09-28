"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Component() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to the official government tax assistant. How can I help you today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    setMessages([...messages, { role: "user", content: inputMessage }]);
    // Here you would typically send the message to your backend and get a response
    // For this example, we'll just echo the message back
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `You asked: "${inputMessage}". How else can I assist you with your tax filing?`,
        },
      ]);
    }, 1000);
    setInputMessage("");
  };

  return (
    <div className="flex flex-col w-full pt-16 h-screen overflow-hidden">
      <div className="flex-grow flex flex-col lg:flex-row relative">
        <aside className="lg:w-1/4 bg-blue-50 p-6 lg:sticky lg:top-0">
          <h3 className="text-2xl font-semibold mb-6 text-blue-950">
            Proste Kroki do Złożenia Twoich Podatków
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-2 text-blue-950">
                1. Odpowiedz na kilka pytań
              </h4>
              <p className="text-gray-700">
                Nasz asystent AI poprowadzi Cię przez kilka pytań dotyczących
                Twojej sytuacji podatkowej.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-blue-950">
                2. Otrzymasz rekomendacje
              </h4>
              <p className="text-gray-700">
                Na podstawie Twoich odpowiedzi, otrzymasz odpowiednie formularze
                podatkowe i odliczenia.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-blue-950">
                3. Złóż swoje podatki z pewnością
              </h4>
              <p className="text-gray-700">
                Przejrzyj swoje informacje i złóż swoje podatki bezpiecznie
                przez naszą oficjalną platformę.
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
                Oficjalny Asystent Podatkowy Rządu
              </h2>
              <p className="text-xl mb-8">
                Otrzymaj indywidualną pomoc i złóż swoje podatki z pewnością
              </p>
              <Button
                size="lg"
                onClick={() => setChatOpen(true)}
                className="bg-red-700 hover:bg-red-800 text-white"
              >
                Zacznij teraz
              </Button>
            </section>

            <section className="bg-blue-900 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-semibold text-center mb-6 text-white">
                  Jak działa nasz asystent podatkowy
                </h3>
                <p className="text-center text-white">
                  Nasz zasilany SI asystent podatkowy przeprowadzi cię przez
                  cały proces od odpowaidania na proste pytania do dostarczania
                  spersonalizowanych rekomendacji. Dzięki intuicyjnej platformie
                  możesz łatwo przeprowadzić się przez skomplikowane przepisy
                  podatkowe i złożyć swoje podatki z pewnością. Nasz system
                  gwarantuje dokładność i zgodność z przepisami oraz
                  maksymalizuje Twoje możliwości finansowe.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>

      {chatOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col border-2 border-blue-950 z-50">
          <div className="p-4 bg-blue-950 text-white rounded-t-lg flex justify-between items-center">
            <h5 className="font-semibold">Oficialny Asysten Podatkowy</h5>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChatOpen(false)}
              className="text-white hover:bg-blue-900"
            >
              Close
            </Button>
          </div>
          <div className="flex-grow overflow-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${message.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow"
              />
              <Button
                type="submit"
                className="bg-red-700 hover:bg-red-800 text-white"
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
