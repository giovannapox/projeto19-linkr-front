import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage/> } />
          <Route path="/" element={<SigninPage/> } />
        </Routes>
      </BrowserRouter>
    </>
  );
};
