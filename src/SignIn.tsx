import { useState } from "react";
import { supabase } from "./SupabaseClient";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    // 1. BEJELENTKEZÉS
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Hiba a belépésnél: " + error.message);
      return;
    }

    const user = data.user;

    if (user) {
      // 2. ELLENŐRIZZÜK, LÉTEZIK-E MÁR A PROFILJA
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      // 3. HA MÉG NINCS PROFIL, MOST LÉTREHOZZUK
      if (!existingProfile) {
        const { error: insertError } = await supabase.from("profiles").insert({
          id: user.id,
          name: user.user_metadata.display_name, // Itt vesszük ki a "táskából"
          color: user.user_metadata.favorite_color,
        });

        if (insertError) {
          console.error("Profil mentési hiba:", insertError.message);
        } else {
          alert("Első belépés sikeres, profilod létrehozva!");
        }
      } else {
        alert("Üdv újra!");
      }
    }
  };

  return (
    <div className="mx-auto max-w-md bg-black opacity-80 shadow-xl rounded-2xl overflow-hidden border border-gray-400 mt-10">
      <h2 className="text-center opacity-70 p-5 text-xl font-bold text-rose-400 border-b">
        Bejelentkezés
      </h2>
      <form
        className="p-6 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-rose-400 ml-1">
            Email:
          </span>
          <input
            type="email"
            placeholder="Email"
            className="text-rose-400  bg-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-rose-400 ml-1">
            Jelszó:
          </span>
          <input
            type="password"
            placeholder="Jelszó"
            className="text-rose-400  bg-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="bg-rose-400 text-black  p-2 rounded hover:bg-gray-700"
        >
          Belépés
        </button>
      </form>
    </div>
  );
}

export default SignIn;
