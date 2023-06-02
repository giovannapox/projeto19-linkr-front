import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.js";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import Timeline from "./pages/Timeline";

export default function App() {
  return (
    <>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage/> } />
          <Route path="/" element={<SigninPage/> } />
          <Route path="/timeline" element={<Timeline/>} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}
