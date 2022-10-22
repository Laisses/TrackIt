import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GlobalStyle } from "./assets/styles/GlobalStyle";
import { useState } from "react";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Habits } from "./components/Habits";
import { Today } from "./components/Today";
import { History } from "./components/History";
import { AppContext } from "./components/context";

function App() {

  const userProfile = {
    name: "",
    image: "",
    email: "",
    password: "",
    token: "",
  }

  const [user, setUser] = useState(userProfile);
  const [progress, setProgress] = useState(0);
  const [dailyHabits, setDailyHabits] = useState(undefined);

  return (
    <AppContext.Provider
      value={{ user, setUser, progress, setProgress, dailyHabits, setDailyHabits }}
    >
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/habitos" element={<Habits />} />
          <Route path="/hoje" element={<Today />} />
          <Route path="/historico" element={<History />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;