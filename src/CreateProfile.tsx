import { useState } from "react";
import { supabase } from "./SupabaseClient";

function CreateProfile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${import.meta.env.VITE_BASE_URL}/sign-in`,
        data: {
          userName: userName,
        },
      },
    });

    if (error) {
      alert("Hiba: " + error.message);
    } else {
      alert(
        "Sikeres Regisztráció! Ellenőrizd az e-mailedet a visszaigazoláshoz.",
      );
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-md bg-black opacity-80 shadow-xl rounded-2xl overflow-hidden border border-gray-400 mt-10">
      <h2 className="text-center opacity-70 p-5 text-xl font-bold text-rose-400 border-b">
        Fiók létrehozása
      </h2>

      <form
        className="p-6 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        {/* EMAIL MEZŐ */}
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-rose-400 ml-1">
            Email:
          </span>
          <input
            required
            type="email"
            placeholder="example@mail.com"
            className="text-rose-400 bg-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {/* JELSZÓ MEZŐ */}
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-rose-400 ml-1">
            Jelszó:
          </span>
          <input
            required
            type="password"
            placeholder="******"
            className="text-rose-400 bg-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-rose-400 ml-1">
            Felhasználónév:
          </span>
          <input
            required
            type="text"
            placeholder="Felhasználónév"
            className="text-rose-400 bg-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>

        <button
          disabled={loading}
          className={`w-full bg-rose-400 text-black font-bold py-3 px-4 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-500 hover:text-rose-400"
          }`}
          type="submit"
        >
          {loading ? "Folyamatban..." : "Regisztráció"}
        </button>
      </form>
    </div>
  );
}

export default CreateProfile;
