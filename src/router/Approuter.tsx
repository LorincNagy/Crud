import { Route, Routes } from "react-router-dom";
import SignUp from "../CreateProfile";
import Home from "../Home";
import { Profiles } from "../Profiles";
import SignIn from "../SignIn";
import TodoList from "../TodoList";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/todo-list" element={<TodoList />} />
    </Routes>
  );
}
export default AppRouter;
