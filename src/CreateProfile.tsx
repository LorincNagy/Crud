import { useState } from "react";
import { supabase } from "./SupabaseClient";

interface ProfileData {
  name: string;
  color: string;
  email: string;
  password: string;
}

function CreateProfile() {
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    color: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${import.meta.env.VITE_BASE_URL}/sign-in`,
        data: {
          display_name: formData.name,
          favorite_color: formData.color,
        },
      },
    });

    if (error) alert(error.message);
    else
      alert(
        "Ellenőrizd az e-mailedet! A profilod az első belépéskor jön létre.",
      );
  };

  return (
    <div className="mx-auto max-w-md bg-black opacity-80 shadow-xl rounded-2xl overflow-hidden border border-gray-400 mt-10">
      <h2 className="text-center opacity-70 p-5 text-xl font-bold text-rose-400 border-b">
        Create a new profile
      </h2>

      <form
        className="p-6 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        {/* EMAIL MEZŐ */}
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-rose-400  ml-1">
            Email:
          </span>
          <input
            required
            type="email"
            placeholder="example@mail.com"
            className="text-rose-400  bg-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </label>

        {/* JELSZÓ MEZŐ */}
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-rose-400  ml-1">
            Password:
          </span>
          <input
            required
            type="password"
            placeholder="******"
            className="text-rose-400  bg-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </label>

        {/* NÉV MEZŐ */}
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-rose-400  ml-1">
            Name:
          </span>
          <input
            required
            type="text"
            placeholder="John Doe"
            className="text-rose-400  bg-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>

        {/* SZÍN MEZŐ */}
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-rose-400  ml-1">
            Color:
          </span>
          <input
            required
            type="text"
            placeholder="blue"
            className="text-rose-400 bg-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
          />
        </label>

        <button
          className="w-full bg-rose-400 hover:bg-gray-500 text-black  font-bold py-3 px-4 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95"
          type="submit"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}

export default CreateProfile;
