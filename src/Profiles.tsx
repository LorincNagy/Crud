import { useEffect, useState } from "react";
import { supabase } from "./SupabaseClient";

interface Profile {
  name: string;
  color: string;
}

export function Profiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfiles() {
      setLoading(true);
      const { data } = await supabase.from("profiles").select("*");
      if (data) {
        setProfiles(data);
      }
      setLoading(false);
    }
    getProfiles();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mx-auto max-w-md bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      <h2 className="text-center bg-gray-50 p-5 text-xl font-bold text-gray-800 border-b">
        Available profiles
      </h2>
      <ul className="p-6 flex flex-col gap-4 break-all">
        {profiles.map((profile, index) => (
          <li key={index}>
            {profile.name} - {profile.color}
          </li>
        ))}
      </ul>
    </div>
  );
}
