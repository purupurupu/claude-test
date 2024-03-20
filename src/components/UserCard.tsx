import Image from "next/image";
import Button from "./Button";

type UserCardProps = {
  user: {
    id: string;
    name: string;
    age: number;
    bio: string;
    pictures: string[];
  };
  onLike: () => void;
  onDislike: () => void;
};

export default function UserCard({ user, onLike, onDislike }: UserCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-black">
      <Image
        src={user.pictures[0]}
        alt={user.name}
        width={400}
        height={400}
        className="w-full h-64 object-cover mb-4 rounded-lg"
      />
      <h2 className="text-xl font-bold mb-2">
        {user.name}, {user.age}
      </h2>
      <p className="text-gray-700 mb-2">{user.bio}</p>
      <div className="flex justify-between">
        <Button onClick={onDislike} variant="outline">
          Dislike
        </Button>
        <Button onClick={onLike}>Like</Button>
      </div>
    </div>
  );
}
