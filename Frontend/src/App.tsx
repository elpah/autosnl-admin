import { Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CarsPage from "./pages/carsPage/CarsPage";
import SettingPage from "./pages/settingsPage/SettingPage";
import {
  GlobalContext,
  ICarData,
  initialCarData,
  initialOther,
  IOther,
  type MenuOption,
  type Lang,
  type currentActionType,
} from "./context/GlobalContext";

import "./App.css";
import AddCarPage from "./pages/addCarPage/AddCarPage";
import EditCarPage from "./pages/editCarPage/EditCarPage";
import NotFound from "./pages/notFoundPage/NotFound";
import ShowModal from "./components/show-modal/ShowModal";

function App() {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState<
    "en" | "ru" | "nl" | "ua"
  >("en");
  const [carPageLang, setCarPageLang] = useState<Lang>("en");
  const [currentSelection, setCurrentSelection] = useState<
    "Basic" | "Advanced" | "Dealer"
  >("Basic");
  const [carData, setCarData] = useState<ICarData>(initialCarData);
  const [activeMenu, setActiveMenu] = useState<MenuOption | null>(null);
  const [other, setOther] = useState<IOther>(initialOther);
  const location = useLocation();
  const activeMenuName = location.pathname.split("/")[1] || "dashboard";
  const [currentAction, setCurrentAction] = useState<currentActionType>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pendingLink, setPendingLink] = useState<string | null>(null);

  useEffect(() => {
    if (
      [
        "dashboard",
        "cars",
        "settings",
        "preview",
        "sign out",
        "add-car",
      ].includes(activeMenuName)
    ) {
      setActiveMenu(activeMenuName as MenuOption);
    }
  }, [location]);

  const handleProceedClick = () => {
    setCarData(initialCarData);
    setCurrentAction(null);
    setShowModal(false);
    if (pendingLink) {
      navigate(`/${pendingLink}`);
      setPendingLink(null);
    }
  };

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
          currentAction,
          setCurrentAction,
          showModal,
          setShowModal,
          pendingLink,
          setPendingLink,
        }}
      >
        {showModal && (
          <ShowModal
            text={`You are currently ${
              currentAction === "isEditing" ? "editing a" : "adding a new"
            } car. You will loose currently filled information if you proceed. Do you still want to proceed? `}
            handleProceedClick={handleProceedClick}
            handleCancelClick={() => setShowModal(false)}
          />
        )}
        <Suspense fallback={<div>Fallback testing</div>}>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/cars/:type" element={<CarsPage />} />
            <Route path="/add-car" element={<AddCarPage />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="/cars/edit/:id" element={<EditCarPage />} />
            <Route path="*" element={<NotFound />} />
            EditCarPage
          </Routes>
        </Suspense>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
