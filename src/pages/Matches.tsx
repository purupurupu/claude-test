import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import MatchList from "../components/MatchList";
import { getMatches } from "../lib/api";
import { useAuth } from "@/hooks/useAuth";

export default function Matches() {
  const [matches, setMatches] = useState<
    {
      id: string;
      name: string;
      pictures: string[];
    }[]
  >([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchMatches() {
      if (!user) return;
      const data = await getMatches(user.id);
      setMatches(data);
    }
    fetchMatches();
  }, [user]);

  return (
    <Layout title="Matches">
      <div className="container mx-auto px-4">
        <MatchList matches={matches} />
      </div>
    </Layout>
  );
}
