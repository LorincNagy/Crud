import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./SupabaseClient";

interface Profile {
  id?: string;
  name: string;
  color: string;
}

export function Profiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("");
  const [adding, setAdding] = useState(false);

  const navigate = useNavigate();

  // PROFILOK LEKÉRÉSE
  useEffect(() => {
    async function fetchProfiles() {
      setLoading(true);

      const { data, error } = await supabase.from("profiles").select("*");

      if (error) {
        console.error(error.message);
      } else if (data) {
        setProfiles(data);
      }

      setLoading(false);
    }

    fetchProfiles();
  }, []);

  // ÚJ PROFIL MENTÉSE
  const handleSave = async () => {
    setAdding(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Be kell jelentkezned!");
      setAdding(false);
      navigate("/sign-in");
      return;
    }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      name: newName,
      color: newColor,
    });

    if (error) {
      alert("Hiba: " + error.message);
    } else {
      setNewName("");
      setNewColor("");

      // frissítés
      const { data } = await supabase.from("profiles").select("*");
      if (data) setProfiles(data);
    }

    setAdding(false);
  };

  if (loading) {
    return (
      <p className="text-rose-400 text-center mt-10 text-xl">Betöltés...</p>
    );
  }

  return (
    <div className="mx-auto max-w-md bg-black opacity-80 shadow-xl rounded-2xl overflow-hidden border border-gray-400 mt-10">
      {/* FORM */}
      <div className="p-6 border-b border-gray-400">
        <h2 className="text-center text-xl font-bold text-rose-400 mb-4">
          Profilod megadása
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="flex flex-col gap-3"
        >
          <input
            required
            placeholder="Neved"
            className="bg-black text-rose-400 border border-gray-500 p-2 rounded outline-none focus:ring-1 focus:ring-rose-400"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <input
            required
            placeholder="Kedvenc színed"
            className="bg-black text-rose-400 border border-gray-500 p-2 rounded outline-none focus:ring-1 focus:ring-rose-400"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
          />

          <button
            type="submit"
            disabled={adding}
            className="bg-rose-400 text-black font-bold py-2 rounded hover:bg-rose-500 transition-all active:scale-95 disabled:opacity-50"
          >
            {adding ? "Mentés..." : "Profil mentése"}
          </button>
        </form>
      </div>

      {/* LISTA */}
      <h2 className="text-center opacity-70 p-5 text-xl font-bold text-rose-400 border-b">
        Elérhető profilok
      </h2>

      <ul className="p-6 flex flex-col gap-4 break-all">
        {profiles.length === 0 ? (
          <p className="text-gray-500 text-center italic">
            Még nincsenek profilok.
          </p>
        ) : (
          profiles.map((profile) => (
            <li
              key={profile.id}
              className="border border-gray-600 p-3 rounded-lg flex justify-between items-center"
              style={{ borderLeft: `4px solid ${profile.color}` }}
            >
              <span className="font-semibold text-rose-300">
                {profile.name}
              </span>

              <span className="text-xs uppercase px-2 py-1 bg-gray-800 text-gray-300 rounded">
                {profile.color}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
