import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GlobalStyle } from "./assets/styles/GlobalStyle";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Habits } from "./components/Habits";
import { Today } from "./components/Today";
import { History } from "./components/History";

function App() {
  return (
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

  );
}

export default App;