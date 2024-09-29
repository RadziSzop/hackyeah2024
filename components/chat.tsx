"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to the tax assistant chat! How can I help you fill out your tax form today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages([...messages, { role: "user", content: inputMessage }]);
    setInputMessage("");
  };

  return (
    <div className="max-w-[450px] bg-gray-100 p-4 rounded-lg">
      <div className="h-[calc(100vh-16rem)] flex flex-col">
        <div className="flex-grow overflow-auto mb-4 space-y-4 text-black">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                message.role === "user" ? "bg-blue-100 ml-auto" : "bg-white"
              } max-w-[80%]`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="mt-auto">
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
              Wyślij
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
