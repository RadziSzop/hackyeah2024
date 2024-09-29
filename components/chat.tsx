"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { askAI } from "@/app/actions";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to the tax assistant chat! How can I help you fill out your tax form today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = { role: "user", content: inputMessage };
    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Create a FormData object to send to askAI
    const formData = new FormData();
    formData.append("prompt", inputMessage);

    try {
      const response = await askAI(formData);
      if (response) {
        // Assuming the response is an object with an 'answer' property
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: response },
        ]);
      }
    } catch (error) {
      console.error("Error calling askAI:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    }
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
