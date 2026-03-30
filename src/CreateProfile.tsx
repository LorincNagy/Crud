import { useState } from "react";

interface CreateProfile {
  name: string;
  color: string;
}

function CreateProfile() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      <h2 className="text-center bg-gray-50 p-5 text-xl font-bold text-gray-800 border-b">
        Create a new profile
      </h2>

      <form
        className="p-6 flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-600 ml-1">
            Name:
          </span>
          <input
            type="text"
            placeholder="John Doe"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-600 ml-1">
            Color:
          </span>
          <input
            type="text"
            placeholder="#3b82f6"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <button
          className="w-full bg-black hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95"
          type="submit"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}

export default CreateProfile;
