import ImageUpload from "./components/imageUpload";
import Registration from "./components/Login/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./components/Language/LanguageContext";
function App() {
  return (
    <>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ImageUpload />}></Route>
          <Route path="/register" element={<Registration />}></Route>
        </Routes>
      </BrowserRouter>
      </LanguageProvider>
    </>
  );
}

export default App;
