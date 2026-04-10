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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Hiba a belépésnél: " + error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // Itt már nem alertet használunk, mert az megtöri a designt,
      // de a logikád szerint maradhat, ha szeretnéd.
      navigate("/profiles");
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-md bg-slate-950 shadow-[0_0_50px_-12px_rgba(34,211,238,0.2)] rounded-3xl overflow-hidden border border-slate-800 mt-10">
      {/* FEJLÉC - Díszcsíkkal */}
      <div className="bg-slate-900/50 p-6 border-b border-slate-800 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <h2 className="text-slate-100 text-xl font-bold tracking-wider uppercase">
          Bejelentkezés
        </h2>
      </div>

      <form
        className="p-8 flex flex-col gap-5 bg-slate-950/50"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        {/* EMAIL MEZŐ */}
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">
            Email cím
          </span>
          <input
            required
            type="email"
            placeholder="nev@email.hu"
            value={email}
            className="w-full bg-slate-900 text-cyan-50 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-500/50 transition-all shadow-inner placeholder:text-slate-700"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {/* JELSZÓ MEZŐ */}
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">
            Jelszó
          </span>
          <input
            required
            type="password"
            placeholder="******"
            value={password}
            className="w-full bg-slate-900 text-cyan-50 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-500/50 transition-all shadow-inner placeholder:text-slate-700"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {/* BEJELENTKEZÉS GOMB */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-4 w-full bg-cyan-500 text-slate-950 font-black py-4 px-4 rounded-xl shadow-[0_4px_20px_-5px_rgba(34,211,238,0.4)] transition-all duration-300 ease-in-out transform active:scale-95 ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-cyan-400 hover:-translate-y-1"
          }`}
        >
          {loading ? "AZONOSÍTÁS..." : "BELÉPÉS"}
        </button>

        {/* LÁBJEGYZET */}
        <div className="mt-4 flex flex-col gap-2 items-center">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest">
            Még nincs fiókod?
            <button
              onClick={() => navigate("/sign-up")}
              className="text-cyan-600 hover:text-cyan-400 cursor-pointer transition-colors font-bold"
            >
              Regisztrálj itt
            </button>
          </p>
          <p className="text-[9px] text-slate-700 italic">
            Elfelejtett jelszó?
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
