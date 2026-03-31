import { Route, Routes } from "react-router-dom";
import CreateProfile from "../CreateProfile";
import { Profiles } from "../Profiles";
import SignIn from "../SignIn";

function AppRouter() {
  return (
    <Routes>
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/create-profile" element={<CreateProfile />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
}
export default AppRouter;
