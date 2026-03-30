import { useState } from "react";

interface CreateProfile {
  name: string;
  color: string;
}

function CreateProfile() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  return (
    <div>
      <h2>Create a new profile</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Color:
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
}

export default CreateProfile;
