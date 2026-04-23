import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./SupabaseClient";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
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
    <div className="mx-auto max-w-md rounded-3xl overflow-hidden border border-slate-800 mt-10">
      <div className="bg-slate-900/50 p-6 border-b border-slate-800 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-500 to-transparent"></div>
        <h2 className="text-slate-100 text-xl font-bold tracking-wider uppercase">
          Fiók létrehozása
        </h2>
      </div>

      <form
        className="p-8 flex flex-col gap-5 bg-slate-950/50"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest ml-2">
            Email cím
          </span>
          <input
            required
            type="email"
            placeholder="example@mail.com"
            className="w-full bg-slate-900 text-cyan-50 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-500/50 transition-all shadow-inner placeholder:text-slate-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest ml-2">
            Jelszó
          </span>
          <input
            required
            type="password"
            placeholder="******"
            className="w-full bg-slate-900 text-cyan-50 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-500/50 transition-all shadow-inner placeholder:text-slate-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          disabled={loading}
          className={`mt-4 w-full bg-cyan-500 text-slate-950 font-black py-4 px-4 rounded-xl shadow-[0_4px_20px_-5px_rgba(34,211,238,0.4)] transition-all duration-300 ease-in-out transform active:scale-95 ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-cyan-400 hover:-translate-y-1"
          }`}
          type="submit"
        >
          {loading ? "FOLYAMATBAN..." : "REGISZTRÁCIÓ"}
        </button>
        <p className="text-center text-slate-200 uppercase tracking-widest mt-2">
          Már van fiókod? {""}
          <button
            className="text-cyan-400 hover:text-cyan-400 cursor-pointer transition-colors"
            onClick={() => navigate("/sign-in")}
          >
            Bejelentkezés
          </button>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
