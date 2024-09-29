"use client";

import { askAI } from "@/app/actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { readStreamableValue } from "ai/rsc";
import { useEffect, useRef, useState } from "react";
import Chat from "./chat";
import FormA from "./forms/form-A";
import FormB from "./forms/form-B";
import FormC from "./forms/form-C";
import FormD from "./forms/form-D";
import FormE from "./forms/form-E";
import FormG from "./forms/form-G";

export default function StateLoader() {
  const [formData, setFormData] = useState<any>(null);

  const [messages, setMessages] = useState<
    Array<{
      role: "assistant" | "user";
      content: string;
      id?: string;
      other?: any;
    }>
  >([
    {
      role: "assistant",
      content:
        "Witam! Jestem Podatkomat, Twój osobisty asystent! Jak mogę pomóc?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage: { role: "user"; content: string } = {
      role: "user",
      content: inputMessage,
    };
    setMessages([...messages, newMessage]);
    setInputMessage("");
    setIsWaiting(true);

    // Create a FormData object to send to askAI
    const formData = new FormData();
    formData.append("prompt", inputMessage);

    try {
      const { object, id } = await askAI(formData);
      if (object) {
        let isStreamEnded = false;
        for await (const partialObject of readStreamableValue(object)) {
          if (partialObject) {
            setMessages((prevMessages) => {
              const existingMessageIndex = prevMessages.findIndex(
                (msg) => msg.id === id
              );
              if (existingMessageIndex !== -1) {
                // Update existing message
                const updatedMessages = [...prevMessages];
                updatedMessages[existingMessageIndex] = {
                  ...updatedMessages[existingMessageIndex],
                  content: partialObject.answer,
                  other: partialObject.formData,
                };
                return updatedMessages;
              } else {
                // Add new message if not found
                return [
                  ...prevMessages,
                  {
                    id: id,
                    role: "assistant",
                    content: partialObject.answer,
                    other: partialObject.formData,
                  },
                ];
              }
            });
          }
          isStreamEnded = true;
        }
        if (isStreamEnded) {
          setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            console.log(lastMessage.other);
            return prevMessages;
          });
        }
      }
    } catch (error) {
      console.error("Error calling askAI:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Wybacz, napotkałem problem. Proszę spróbuj ponownie.",
        },
      ]);
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col gap-4">
        <div className="flex-col  h-full pr-10 gap-4 border-r border-gray-300">
          <ScrollArea className="h-full">
            <h1 className="text-3xl font-bold mt-8 text-blue-950">
              Formularz podatkowy PCC3
            </h1>
            <FormA />
            <FormB />
            <FormC />
            <FormD />
            <FormE />
            <FormG />
          </ScrollArea>
        </div>
      </div>
      <Chat
        messages={messages}
        setMessages={
          setMessages as React.Dispatch<
            React.SetStateAction<{ role: string; content: string }[]>
          >
        }
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        messagesEndRef={messagesEndRef}
        chatContainerRef={chatContainerRef}
        sendMessage={sendMessage}
      />
    </>
  );
}
