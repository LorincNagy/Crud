import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./SupabaseClient";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true);

    // 1. BEJELENTKEZÉS
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Hiba a belépésnél: " + error.message);
      setLoading(false);
      return;
    }

    // 2. HA SIKERÜLT, IRÁNY A PROFIL KITÖLTÉSE (VAGY A FŐOLDAL)
    if (data.user) {
      alert("Sikeres belépés!");
      // Itt döntsd el, hová menjen:
      // Ha még nincs kész a profilja, küldd a /setup-profile-ra
      navigate("/profiles");
    }
    setLoading(false);
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
            required
            type="email"
            placeholder="Email"
            value={email}
            className="text-rose-400 bg-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-rose-400 ml-1">
            Jelszó:
          </span>
          <input
            required
            type="password"
            placeholder="Jelszó"
            value={password}
            className="text-rose-400 bg-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className={`bg-rose-400 text-black font-bold p-3 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-rose-500"
          }`}
        >
          {loading ? "Belépés..." : "Belépés"}
        </button>
      </form>
    </div>
  );
}

export default SignIn;
