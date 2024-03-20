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
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center text-black">
      <div className="w-1/3">
        <Image
          src={user.pictures[0]}
          alt={user.name}
          width={150}
          height={150}
          className="rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/images/dummy_150x150.png";
          }}
        />
      </div>
      <div className="w-2/3 pl-6">
        <h2 className="text-2xl font-bold mb-2">
          {user.name}, {user.age}
        </h2>
        <p className="text-gray-600 mb-4">{user.bio}</p>
        <div className="flex justify-end">
          <Button onClick={onDislike} variant="secondary" className="mr-4">
            Dislike
          </Button>
          <Button onClick={onLike}>Like</Button>
        </div>
      </div>
    </div>
  );
}
