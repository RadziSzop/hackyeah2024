"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { askAI } from "@/app/actions";
import { readStreamableValue } from "ai/rsc";
import ReactMarkdown from "react-markdown";

interface ChatProps {
  messages: { role: string; content: string }[];
  setMessages: React.Dispatch<
    React.SetStateAction<{ role: string; content: string }[]>
  >;
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function Chat({
  messages,
  setMessages,
  inputMessage,
  setInputMessage,
  messagesEndRef,
  chatContainerRef,
  sendMessage,
}: ChatProps) {
  return (
    <div className="h-full max-w-[450px] bg-gray-100 p-4 rounded-lg flex flex-col">
      <div
        ref={chatContainerRef}
        className="flex-grow overflow-auto mb-4 space-y-4 text-black"
      >
        {messages.map(
          (message: { role: string; content: string }, index: number) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                message.role === "user" ? "bg-blue-100 ml-auto" : "bg-white"
              } max-w-[80%]`}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )
        )}
        {/* {isWaiting && (
          <div className="p-2 rounded-lg bg-white max-w-[80%]">
            <div className="animate-pulse text-lg ml-2 tracking-[0.2rem]">
              ...
            </div>
          </div>
        )} */}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="mt-auto">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Napisz wiadomość..."
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
  );
}
