import type { User } from "@supabase/supabase-js";
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
  const [authUser, setAuthUser] = useState<User | null>(null);

  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("");
  const [adding, setAdding] = useState(false);

  const navigate = useNavigate();

  // PROFILOK LEKÉRÉSE
  useEffect(() => {
    async function fetchProfiles() {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      setAuthUser(user);

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

    if (!authUser) {
      alert("Be kell jelentkezned!");
      setAdding(false);
      navigate("/sign-in");
      return;
    }

    const { error } = await supabase.from("profiles").upsert({
      id: authUser.id,
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
    <div className="mx-auto max-w-md bg-slate-950 shadow-[0_0_50px_-12px_rgba(34,211,238,0.2)] rounded-3xl overflow-hidden border border-slate-800 mt-10">
      {/* ÜDVÖZLÉS FEJLÉC - Modern, sötét, neonos beütéssel */}
      <div className="bg-slate-900/50 p-6 border-b border-slate-800 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <h1 className="text-slate-100 text-xl font-light tracking-tight">
          Üdvözöljük,{" "}
          <span className="text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
            {authUser?.user_metadata?.userName || "Felhasználó"}
          </span>
          !
        </h1>
      </div>

      {/* FORM - Letisztultabb inputok */}
      <div className="p-8 border-b border-slate-800 bg-slate-950/50">
        <h2 className="text-center text-sm uppercase tracking-[0.3em] font-semibold text-slate-500 mb-6">
          Profil Beállítások
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="flex flex-col gap-4"
        >
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 ml-2 uppercase font-bold">
              Megjelenítési név
            </label>
            <input
              required
              placeholder="Például: Apa, Anya..."
              className="w-full bg-slate-900 text-cyan-50 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-500/50 transition-all shadow-inner"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 ml-2 uppercase font-bold">
              Téma színe (Hex kód)
            </label>
            <input
              required
              placeholder="#00ffff"
              className="w-full bg-slate-900 text-cyan-50 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-500/50 transition-all shadow-inner"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={adding}
            className="mt-2 bg-cyan-500 text-slate-950 font-black py-3 rounded-xl hover:bg-cyan-400 transition-all active:scale-[0.97] disabled:opacity-50 shadow-[0_4px_20px_-5px_rgba(34,211,238,0.4)]"
          >
            {adding ? "SZINKRONIZÁLÁS..." : "BEÁLLÍTÁSOK MENTÉSE"}
          </button>
        </form>
      </div>

      {/* LISTA - Üveg-hatású kártyák */}
      <div className="p-6 bg-slate-900/20">
        <h2 className="text-center text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600 mb-6">
          Válassz aktív profilt
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {profiles.length === 0 ? (
            <p className="text-slate-600 text-center text-sm italic py-10">
              Még nincsenek profilok.
            </p>
          ) : (
            profiles.map((profile) => (
              <button
                key={profile.id}
                onClick={() => {
                  navigate("/todo-list", { state: { profile } });
                }}
                className="group flex items-center gap-4 bg-slate-900/40 border border-slate-800 p-4 rounded-2xl hover:border-cyan-500/30 hover:bg-slate-800/60 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-full border-2 border-slate-800 flex items-center justify-center text-xl shadow-lg"
                  style={{
                    backgroundColor: `${profile.color}22`,
                    borderColor: profile.color,
                  }}
                >
                  <span style={{ color: profile.color }}>●</span>
                </div>

                <div className="flex-1 text-left">
                  <div className="text-slate-200 font-bold group-hover:text-cyan-400 transition-colors">
                    {profile.name}
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono">
                    ID: {profile.id?.slice(0, 8)}
                  </div>
                </div>

                <div className="text-slate-700 group-hover:text-cyan-500 transition-all translate-x-0 group-hover:translate-x-1">
                  →
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Profiles;
