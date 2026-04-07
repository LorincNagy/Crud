import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./SupabaseClient"; // Győződj meg róla, hogy az út jó!

function Header() {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomeRoute = location.pathname === "/";
  const isCreateProfileRoute = location.pathname === "/create-profile";
  const isSignInRoute = location.pathname === "/sign-in";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === "SIGNED_OUT") {
        navigate("/");
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
      <nav>
        <ul className="flex space-x-3 font-medium">
          {/* PROFILES - SZIGORÚAN CSAK HA VAN SESSION */}
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

          {/* CREATE PROFILE - Ott van a kezdőlapon (isHomeRoute) VAGY ha be van lépve (session) */}
          {!isCreateProfileRoute && (
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

          {/* SIGN IN - Csak ha NINCS session ÉS nem a login oldalon vagyunk */}
          {!session && !isSignInRoute && (
            <li>
              <NavLink
                to="/sign-in"
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-md text-sm transition-all shadow-sm ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-700 text-indigo-300 hover:bg-gray-600 hover:text-white"
                  }`
                }
              >
                Sign In
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className="flex gap-2">
        {session && (
          <button
            onClick={handleSignOut}
            className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold py-1 px-3 rounded transition-all active:scale-95"
          >
            Sign Out
          </button>
        )}
        {!isHomeRoute && (
          <button
            onClick={() => navigate("/")}
            className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold py-1 px-3 rounded transition-all active:scale-95"
          >
            Back to Home page
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
