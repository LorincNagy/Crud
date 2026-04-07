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
          Profilod szerkesztése
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

      <ul className="p-6 flex flex-col gap-4">
        {profiles.length === 0 ? (
          <p className="text-gray-500 text-center italic">
            Még nincsenek profilok.
          </p>
        ) : (
          profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => {
                navigate("/todo-list", { state: { profile } });
              }}
              className="group relative border border-gray-600 p-4 rounded-xl flex justify-between items-center bg-gray-900/50 hover:bg-gray-800 transition-all duration-200 active:scale-[0.98] hover:border-rose-400/50 shadow-sm hover:shadow-rose-400/10 hover:cursor-pointer"
              style={{ borderLeft: `6px solid ${profile.color || "#fb7185"}` }}
            >
              <div className="flex flex-col items-start">
                <span className="font-bold text-lg text-rose-300 group-hover:text-rose-400 transition-colors">
                  {profile.name}
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                  Profil ID: {profile.id?.slice(0, 8)}...
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full shadow-inner"
                  style={{ backgroundColor: profile.color }}
                ></span>
                <span className="text-xs font-mono uppercase px-2 py-1 bg-black/40 text-gray-400 rounded border border-gray-700">
                  {profile.color}
                </span>
              </div>
              <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-rose-400">
                →
              </div>
            </button>
          ))
        )}
      </ul>
    </div>
  );
}
