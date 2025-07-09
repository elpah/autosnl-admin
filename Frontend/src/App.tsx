import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import {
  GlobalContext,
  ICarData,
  initialCarData,
  initialOther,
  IOther,
} from "./context/GlobalContext";

import "./App.css";
import { Suspense, useState } from "react";

function App() {
  const [currentLanguage, setCurrentLanguage] = useState<
    "en" | "ru" | "nl" | "ua"
  >("en");
  const [carPageLang, setCarPageLang] = useState<"en" | "ru" | "nl" | "ua">(
    "en"
  );
  const [currentSelection, setCurrentSelection] = useState<
    "Basic" | "Advanced" | "Dealer"
  >("Basic");
  const [carData, setCarData] = useState<ICarData>(initialCarData);
  const [activeMenu, setActiveMenu] = useState<
    "dashboard" | "cars" | "settings" | "preview" | "sign out"
  >("dashboard");
  const [other, setOther] = useState<IOther>(initialOther);
  return (
    <>
      <GlobalContext.Provider
        value={{
          currentLanguage,
          setCurrentLanguage,
          carPageLang,
          setCarPageLang,
          carData,
          setCarData,
          activeMenu,
          setActiveMenu,
          currentSelection,
          setCurrentSelection,
          other,
          setOther,
        }}
      >
        <Suspense fallback={<div>Fallback testing</div>}>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
