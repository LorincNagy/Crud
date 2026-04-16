import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-md bg-slate-900/50 rounded-3xl overflow-hidden border border-slate-800 mt-16 relative">
      {/* Dekorációs neon vonal */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-500 to-transparent"></div>

      <div className="p-10 flex flex-col items-center gap-6">
        {/* Ikon vagy Logó helye */}
        <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 flex items-center justify-center mb-2">
          <span className="text-cyan-400 text-3xl font-black italic">FT</span>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-black text-slate-100 tracking-tight uppercase">
            Family <span className="text-cyan-500">Todo</span>
          </h1>
          <div className="h-0.5 w-12 bg-cyan-500 mx-auto opacity-50"></div>
        </div>

        <p className="text-center text-slate-200 text-sm leading-relaxed font-medium">
          Rendszerezd a családi teendőket egy helyen.
          <span className="block mt-1 text-slate-200 text-xs italic">
            Biztonságos, gyors és közös.
          </span>
        </p>

        <div className="w-full flex flex-col gap-3 mt-4">
          <button
            onClick={() => navigate("/sign-in")}
            className="w-full bg-cyan-500 text-slate-950 font-black py-4 rounded-xl shadow-[0_4px_20px_-5px_rgba(34,211,238,0.4)] hover:bg-cyan-400 transition-all active:scale-[0.97]"
          >
            BEJELENTKEZÉS
          </button>

          <button
            onClick={() => navigate("/create-profile")}
            className="w-full bg-transparent border border-slate-700 text-slate-300 font-bold py-4 rounded-xl hover:bg-slate-900 hover:border-slate-500 transition-all active:scale-[0.97]"
          >
            ÚJ FIÓK LÉTREHOZÁSA
          </button>
        </div>

        {/* Kis lábjegyzet a biztonságról */}
        <div className="flex items-center gap-2 mt-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[0.65rem] text-slate-300 uppercase tracking-[0.2em] font-bold">
            System Online & Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
