import ImageUpload from "./components/imageUpload";
import Registration from "./components/Login/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./components/Language/LanguageContext";
import Login from "./components/Login/login";
import Home from "./components/Home/home";
import { PhoneNumberProvider } from "./components/Language/PhoneContext";
function App() {
  return (
    <>
    <LanguageProvider>
      <PhoneNumberProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/image" element={<ImageUpload />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      </PhoneNumberProvider>
      </LanguageProvider>
    </>
  );
}

export default App;
