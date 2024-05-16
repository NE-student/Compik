import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/User/Login/Login";
import Registration from "./Components/User/Registration/Registrations";
import Verification from "./Components/User/Verification/Verification";
import Configuration from "./Components/Configuration/Configuration";
import Admin from "./Components/Admin/Admin";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "MyRedux/slices/Auth";
import Footer from "./Components/Footer/Footer";
import Profile from "Components/User/Profile/Profile";

function App() {
  const dispatch = useDispatch();
  // const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <div className=" flex flex-col h-[100%] ">
      <Header />
      <Routes>
        <Route path="/" element={<Configuration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/emailVerify" element={<Verification />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
