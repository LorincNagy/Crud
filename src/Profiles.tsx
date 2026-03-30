import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

interface Profile {
  id: string;
  name: string;
  created_at?: string;
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
    <div>
      <h2>Available profiles</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            {profile.name} - {profile.color}
          </li>
        ))}
      </ul>
    </div>
  );
}
