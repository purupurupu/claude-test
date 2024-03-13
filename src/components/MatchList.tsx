import Link from "next/link";
import Image from "next/image";

type MatchListProps = {
  matches: {
    id: string;
    name: string;
    pictures: string[];
  }[];
};

export default function MatchList({ matches }: MatchListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {matches.map((match) => (
        (<Link
          key={match.id}
          href={`/chat/${match.id}`}
          className="bg-white shadow-md rounded-lg p-4">

          <Image
            src={match.pictures[0]}
            alt={match.name}
            width={200}
            height={200}
            className="w-full h-32 object-cover mb-2 rounded-lg"
          />
          <h2 className="text-lg font-bold">{match.name}</h2>

        </Link>)
      ))}
    </div>
  );
}
