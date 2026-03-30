import { Route, Routes } from "react-router-dom";
import CreateProfile from "../CreateProfile";
import { Profiles } from "../Profiles";

function AppRouter() {
  return (
    <Routes>
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/create-profile" element={<CreateProfile />} />
    </Routes>
  );
}
export default AppRouter;
