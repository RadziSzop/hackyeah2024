"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

type Chat = {
  id: number;
  title: string;
  lastMessage: string;
  timestamp: string;
};

const mockChats: Chat[] = [
  {
    id: 1,
    title: "Tax Form 2023",
    lastMessage: "Successfully submitted your tax form.",
    timestamp: "2023-04-15 14:30",
  },
  {
    id: 2,
    title: "Income Declaration",
    lastMessage: "Your income has been recorded.",
    timestamp: "2023-03-20 18:45",
  },
  {
    id: 3,
    title: "Deduction Inquiry",
    lastMessage: "Clarified eligible deductions.",
    timestamp: "2023-02-10 10:15",
  },
  {
    id: 4,
    title: "Tax Credit Application",
    lastMessage: "Tax credit application processed.",
    timestamp: "2023-01-25 20:00",
  },
  {
    id: 5,
    title: "Annual Tax Review",
    lastMessage: "Completed annual tax review.",
    timestamp: "2022-12-30 09:30",
  },
];

export default function OldChatsSidebar() {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  return (
    <div className="w-64 bg-gray-100 border-r border-gray-300 ">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-xl font-semibold">Previous Tax Forms</h2>
      </div>
      <ScrollArea className="h-full">
        {mockChats.map((chat) => (
          <Button
            key={chat.id}
            variant="ghost"
            className={`w-full justify-start p-4 hover:bg-gray-200 ${
              selectedChatId === chat.id ? "bg-gray-200" : ""
            }`}
            onClick={() => setSelectedChatId(chat.id)}
          >
            <MessageCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            <div className="flex-1 text-left overflow-hidden">
              <div className="font-semibold truncate">{chat.title}</div>
              <div className="text-sm text-gray-600 truncate">
                {chat.timestamp}
              </div>
            </div>
          </Button>
        ))}
      </ScrollArea>
    </div>
  );
}
