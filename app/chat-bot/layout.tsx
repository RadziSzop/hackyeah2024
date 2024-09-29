import OldChatsSidebar from "@/components/old-chats";

export default function ChatBotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <div className="flex bg-gray-100 gap-8 max-w-screen-xl justify-center">
        <OldChatsSidebar />
        {children}
      </div>
    </div>
  );
}
