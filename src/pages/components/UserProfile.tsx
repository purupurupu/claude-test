import Image from "next/image";

type UserProfileProps = {
  user: {
    name: string;
    bio: string;
    pictures: string[];
  };
};

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Image
        src={user.pictures[0]}
        alt={user.name}
        width={400}
        height={400}
        className="w-full h-64 object-cover mb-4 rounded-lg"
      />
      <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
      <p className="text-gray-700">{user.bio}</p>
    </div>
  );
}
