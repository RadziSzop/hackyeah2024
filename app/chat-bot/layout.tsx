import OldChatsSidebar from "@/components/old-chats";

export default function ChatBotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center h-full overflow-hidden">
      <div className="flex bg-gray-100 gap-8 w-full px-4 justify-center">
        <OldChatsSidebar />
        {children}
      </div>
    </div>
  );
}
