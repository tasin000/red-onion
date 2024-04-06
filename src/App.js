import "./App.css";
import Home from "./components/pages/Home/Home/Home";
import Header from "./components/shared/Header/Header";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/shared/NotFound/NotFound";
import Login from "./components/pages/Auth/Login/Login";
import SignUp from "./components/pages/Auth/SignUp/SignUp";
import Orders from "./components/pages/Orders/Orders/Orders";
import RequireAuth from "./components/pages/Auth/RequireAuth/RequireAuth";

function App() {
  return (
    <div className="">
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route
          path="/orders"
          element={
            <RequireAuth>
              <Orders></Orders>
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/sign_up" element={<SignUp></SignUp>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </div>
  );
}

export default App;
