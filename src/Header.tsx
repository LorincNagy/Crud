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

  // Közös stílus a NavLinkekhez
  const navLinkStyling = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-1.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-all shadow-sm ${
      isActive
        ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_-3px_rgba(34,211,238,0.6)]"
        : "bg-slate-900 text-cyan-500 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800"
    }`;

  return (
    <header className="bg-slate-950 border-b border-slate-800 p-4 flex justify-between items-center shadow-lg relative">
      {/* Egy vékony neon csík a fejléc alján */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent"></div>

      <nav>
        <ul className="flex space-x-3 items-center">
          {/* LOGO vagy App név kicsiben */}
          <li className="mr-4">
            <span
              className="text-cyan-500 font-black tracking-tighter text-xl italic cursor-pointer"
              onClick={() => navigate("/")}
            >
              TODO<span className="text-slate-500">APP</span>
            </span>
          </li>

          {/* PROFILES */}
          {session && (
            <li>
              <NavLink to="/profiles" className={navLinkStyling}>
                Profilok
              </NavLink>
            </li>
          )}

          {/* CREATE PROFILE */}
          {!isCreateProfileRoute && (
            <li>
              <NavLink to="/sign-up" className={navLinkStyling}>
                Regisztráció
              </NavLink>
            </li>
          )}

          {/* SIGN IN */}
          {!session && !isSignInRoute && (
            <li>
              <NavLink to="/sign-in" className={navLinkStyling}>
                Bejelentkezés
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      <div className="flex gap-3 items-center">
        {/* Felhasználónév kijelzése a fejlécben, ha be van lépve */}
        {session?.user?.user_metadata?.userName && (
          <span className="hidden md:block text-[10px] text-slate-500 uppercase tracking-widest font-bold mr-2">
            Üdv,{" "}
            <span className="text-cyan-400">
              {session.user.user_metadata.userName}
            </span>
          </span>
        )}

        {session && (
          <button
            onClick={handleSignOut}
            className="bg-transparent border border-rose-500/50 text-rose-500 hover:bg-rose-500 hover:text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-xl transition-all active:scale-95"
          >
            Kijelentkezés
          </button>
        )}

        {!isHomeRoute && (
          <button
            onClick={() => navigate("/")}
            className="bg-slate-800 text-slate-300 hover:text-cyan-400 text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-xl border border-slate-700 transition-all active:scale-95"
          >
            Vissza a főoldalra
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
