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
        <ul className="flex space-x-3 font-medium">
          {session && (
            <li>
              <NavLink
                to="/profiles"
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-md text-sm transition-all shadow-sm ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-700 text-indigo-300 hover:bg-gray-600 hover:text-white"
                  }`
                }
              >
                Profiles
              </NavLink>
            </li>
          )}
          {!session && (
            <li>
              <NavLink
                to="/create-profile"
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-md text-sm transition-all shadow-sm ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-700 text-indigo-300 hover:bg-gray-600 hover:text-white"
                  }`
                }
              >
                Create Profile
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
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
