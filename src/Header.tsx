import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="bg-gray-800 p-4 flex justify-between relative z-10">
        <div className="text-white text-2xl font-bold">Laurence's sandBox</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/profiles"
                className=" text-indigo-400 hover:text-gray-400"
              >
                Profiles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create-profile"
                className=" text-indigo-400 hover:text-gray-400"
              >
                Create Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
export default Header;
