import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./SupabaseClient";

function Header() {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomeRoute = location.pathname === "/";
  const isCreateProfileRoute = location.pathname === "/sign-up";
  const isSignInRoute = location.pathname === "/sign-in";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        if (event === "SIGNED_OUT") {
          navigate("/");
        }
      },
    );
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const navLinkStyling = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-1.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-all shadow-sm ${
      isActive
        ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_-3px_rgba(34,211,238,0.6)]"
        : "bg-slate-900 text-cyan-500 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800"
    }`;

  return (
    <header className="bg-slate-950 border-b border-slate-800 p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg relative">
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent"></div>

      <nav className="w-full md:w-auto">
        <ul className="flex flex-wrap justify-center md:justify-start items-center gap-2">
          <li className="mr-2 md:mr-4">
            <span
              className="text-cyan-500 font-black tracking-tighter text-lg md:text-xl italic cursor-pointer"
              onClick={() => navigate("/")}
            >
              TODO<span className="text-slate-500">APP</span>
            </span>
          </li>

          {session && (
            <li>
              <NavLink to="/profiles" className={navLinkStyling}>
                Profilok
              </NavLink>
            </li>
          )}

          {!session && !isCreateProfileRoute && (
            <li>
              <NavLink to="/sign-up" className={navLinkStyling}>
                <span className="hidden sm:inline">Regisztráció</span>
                <span className="sm:hidden">Reg.</span>
              </NavLink>
            </li>
          )}

          {!session && !isSignInRoute && (
            <li>
              <NavLink to="/sign-in" className={navLinkStyling}>
                Belépés
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      <div className="flex flex-wrap justify-center items-center gap-2">
        {session?.user?.user_metadata?.userName && (
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mr-2">
            <span className="hidden sm:inline">Üdv, </span>
            <span className="text-cyan-400">
              {session.user.user_metadata.userName}
            </span>
          </span>
        )}

        {session && (
          <button
            onClick={handleSignOut}
            className="bg-transparent border border-rose-500/50 text-rose-500 hover:bg-rose-500 hover:text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-xl transition-all active:scale-95"
          >
            Kijelentkezés
          </button>
        )}

        {!isHomeRoute && (
          <button
            onClick={() => navigate("/")}
            className="bg-slate-800 text-slate-300 hover:text-cyan-400 text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-xl border border-slate-700 transition-all active:scale-95"
          >
            <span className="hidden sm:inline">Vissza a főoldalra</span>
            <span className="sm:hidden">Vissza</span>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
