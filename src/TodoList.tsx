import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./SupabaseClient";

export function TodoList() {
  const [task, setTask] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddTodo = async () => {
    const { error } = await supabase
      .from("todos")
      .insert({ member_id: profile.id, task });
    if (error) {
      console.error("Hiba a teendő hozzáadásakor:", error);
    }
  };

  // A state-ből kinyerjük a profile-t.
  // Érdemes fallback-et (opcionális láncolást) használni, ha valaki közvetlen linkkel jönne ide.
  const profile = location.state?.profile;

  // Ha nincs profil (pl. frissítették az oldalt és elveszett a state),
  // visszaküldhetjük a felhasználót a profilválasztóhoz.
  if (!profile) {
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
    <div className="mx-auto max-w-md bg-black opacity-80 shadow-xl rounded-2xl overflow-hidden border border-gray-400 mt-10">
      <div className="p-6 border-b border-gray-400">
        {/* Itt már használhatod a profil adatait! */}
        <h1 className="text-center text-xl font-bold text-rose-400 mb-2">
          {profile.name} teendői
        </h1>
        <div
          className="h-1 w-20 mx-auto mb-4 rounded"
          style={{ backgroundColor: profile.color }}
        ></div>

        <h2 className="text-gray-400 text-center text-sm">
          Profil azonosító: {profile.id}
        </h2>
      </div>

      <form
        className="p-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo();
        }}
      >
        <input
          required
          type="text"
          placeholder="Új teendő..."
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button
          type="submit"
          className="w-full mt-4 bg-rose-400 text-black font-bold py-3 px-4 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95"
        >
          Hozzáadás
        </button>
      </form>
    </div>
  );
}

export default TodoList;
