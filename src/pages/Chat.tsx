import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ChatMessage from "../components/ChatMessage";
import { getChat, sendMessage } from "../lib/api";
import { useAuth } from "@/hooks/useAuth";

type Message = {
  id: string;
  senderId: string;
  content: string;
};

type Chat = {
  id: string;
  messages: Message[];
};

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const [chat, setChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    async function fetchChat() {
      if (typeof id !== "string") return;
      const data = await getChat(id);
      setChat(data);
    }
    fetchChat();
  }, [id]);

  async function handleSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    await sendMessage({
      chatId: id as string,
      senderId: user.id,
      content: message,
    });
    setMessage("");
    setChat((chat) => ({
      ...chat!,
      messages: [
        ...chat!.messages,
        { id: Date.now().toString(), senderId: user.id, content: message },
      ],
    }));
  }

  if (!chat) {
    return <Layout title="Chat">Loading...</Layout>;
  }

  return (
    <Layout title="Chat">
      <div className="container mx-auto px-4">
        <div className="flex flex-col h-screen">
          <div className="flex-1 overflow-y-auto">
            {chat.messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isSender={message.senderId === user?.id}
              />
            ))}
          </div>
          <form onSubmit={handleSend} className="flex-none mt-4">
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
