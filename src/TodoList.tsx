import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./SupabaseClient";

// Típusok definiálása a beágyazott adatokhoz
interface Todo {
  id: string;
  task: string;
  is_completed: boolean;
  created_at: string;
}

interface ProfileWithTodos {
  id: string;
  userName: string;
  color: string;
  todos: Todo[];
}

export function TodoList() {
  const [task, setTask] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [profilesData, setProfilesData] = useState<ProfileWithTodos[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const currentProfile = location.state?.profile;

  // Adatok betöltése: Profilok + a hozzájuk tartozó feladatok
  const fetchAllData = async () => {
    const { data, error } = await supabase.from("profiles").select(`
        id,
        userName,
        color,
        todos (*)
      `); // Ez lekéri a profilokat és beágyazza a todos tábla sorait

    if (error) {
      console.error("Hiba az adatok lekérésekor:", error);
    } else {
      setProfilesData(data as ProfileWithTodos[]);
    }
  };

  useEffect(() => {
    const doFetch = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (!user) {
        alert("Be kell jelentkezned!");
        navigate("/sign-in");
        return;
      }
      await fetchAllData();
    };
    doFetch();
  }, [navigate]);

  const handleAddTodo = async () => {
    if (!task.trim()) return;

    const { error } = await supabase
      .from("todos")
      .insert({ member_id: currentProfile.id, task: task });

    if (error) {
      console.error("Hiba a hozzáadáskor:", error);
    } else {
      setTask("");
      fetchAllData(); // Frissítjük a teljes listát
    }
  };

  if (!currentProfile) {
    return (
      <div className="text-center mt-10">
        <p className="text-rose-400 mb-4">Nem választottál ki profilt!</p>
        <button
          onClick={() => navigate("/profiles")}
          className="bg-rose-400 p-2 rounded text-black font-bold"
        >
          Vissza a profilokhoz
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 mt-10 pb-20">
      {/* Aktív profil és Form */}
      <div className="bg-black opacity-90 shadow-2xl rounded-2xl border border-gray-600 mb-10 overflow-hidden">
        <div className="p-4 border-b border-gray-600 text-center bg-gray-900">
          <p className="text-gray-400 text-sm">Aktív profil:</p>
          <h1 className="text-xl font-bold text-white uppercase tracking-widest">
            {currentProfile.userName}
          </h1>
          <div
            className="h-1 w-24 mx-auto mt-2 rounded-full"
            style={{ backgroundColor: currentProfile.color }}
          ></div>
        </div>

        <form
          className="p-6 flex flex-col sm:flex-row gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTodo();
          }}
        >
          <input
            required
            type="text"
            placeholder="Mit kell elintézni?"
            className="flex-1 p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-rose-400 outline-none"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="submit"
            className="bg-rose-400 text-black font-black py-3 px-8 rounded-xl hover:bg-rose-300 transition-all active:scale-95"
          >
            FELVESZ
          </button>
        </form>
      </div>

      {/* CSOPORTOSÍTOTT LISTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profilesData.map((prof) => (
          <div
            key={prof.id}
            className="bg-gray-900 rounded-2xl border border-gray-800 shadow-lg overflow-hidden"
          >
            {/* Családtag neve (Szekció fejléc) */}
            <div
              className="p-3 border-b border-gray-800 flex items-center justify-between"
              style={{ backgroundColor: "black" }}
            >
              <span
                className="font-bold text-sm tracking-tighter"
                style={{ color: prof.color }}
              >
                ● {prof.userName.toUpperCase()}
              </span>
              <span className="bg-gray-800 text-gray-400 text-[10px] px-2 py-1 rounded-full">
                {prof.todos.length} feladat
              </span>
            </div>

            {/* Teendők listája az adott személyhez */}
            <div className="p-4 space-y-3">
              {prof.todos.length === 0 ? (
                <p className="text-gray-600 text-xs italic">
                  Nincs aktív teendő.
                </p>
              ) : (
                prof.todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="group flex items-start gap-3 bg-black p-3 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors"
                  >
                    <div
                      className="mt-1 h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: prof.color }}
                    ></div>

                    <div className="flex flex-col gap-1 flex-1">
                      <span className="text-gray-200 text-sm leading-tight">
                        {todo.task}
                      </span>
                      <span className="text-[10px] text-gray-600">
                        {new Date(todo.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* CSAK HA SAJÁT: Itt jönnek a gombok */}
                    {user?.id === prof.id && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(todo)}
                          className="text-gray-500 hover:text-rose-400 text-xs"
                        >
                          Szerkesztés
                        </button>
                        <button
                          onClick={() => handleDelete(todo.id)}
                          className="text-gray-500 hover:text-red-500 text-xs"
                        >
                          Törlés
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
