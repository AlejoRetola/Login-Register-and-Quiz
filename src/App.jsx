import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { client } from "./supabase/client";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Quiz from "./components/Quiz";

function App() {
  const navigate = useNavigate();
  const getUserSession = async () => {
    const { data, error } = await client.auth.getSession();
    if (data.session) {
      navigate("/NotFound");
      console.log(data.session);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    console.log("hi");
    getUserSession();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/NotFound" element={<NotFound />}></Route>
        <Route path="/Quiz" element={<Quiz />}></Route>
      </Routes>
    </div>
  );
}

export default App;
