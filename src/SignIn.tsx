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
    <div className="mx-auto max-w-md p-6 border rounded-2xl mt-10 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Bejelentkezés</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
        className="flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Jelszó"
          className="border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Belépés
        </button>
      </form>
    </div>
  );
}

export default SignIn;
