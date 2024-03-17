import Link from "next/link";
import Image from "next/image";

type ChatListProps = {
  chats: {
    id: string;
    user: {
      name: string;
      pictures: string[];
    };
    lastMessage: string;
  }[];
};

export default function ChatList({ chats }: ChatListProps) {
  return (
    <div className="space-y-4">
      {chats.map((chat) => (
        <Link
          key={chat.id}
          href={`/chat/${chat.id}`}
          className="flex items-center bg-white shadow-md rounded-lg p-4"
        >
          <Image
            src={chat.user.pictures[0]}
            alt={chat.user.name}
            width={50}
            height={50}
            className="w-12 h-12 object-cover rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-lg font-bold">{chat.user.name}</h2>
            <p className="text-gray-700">{chat.lastMessage}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
