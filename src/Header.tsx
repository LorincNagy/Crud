import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "./SupabaseClient"; // Győződj meg róla, hogy az út jó!

function Header() {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Kezdeti session ellenőrzése
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 2. Feliratkozás az auth változásokra (login, logout, token lejárat)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/sign-in");
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
      <nav>
        <ul className="flex space-x-4 font-medium">
          <li>
            <NavLink
              to="/profiles"
              className={({ isActive }) =>
                isActive ? "text-white" : "text-indigo-400 hover:text-gray-400"
              }
            >
              Profiles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-profile"
              className={({ isActive }) =>
                isActive ? "text-white" : "text-indigo-400 hover:text-gray-400"
              }
            >
              Create Profile
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* CSAK HA BE VAN JELENTKEZVE (Van session token) */}
      {session && (
        <button
          onClick={handleSignOut}
          className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold py-1 px-3 rounded transition-all active:scale-95"
        >
          Sign Out
        </button>
      )}
    </header>
  );
}

export default Header;
