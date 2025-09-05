import { Suspense, useEffect, useRef, useState } from "react";
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
  initialGetCarsParams,
  initialUser,
  type MenuOption,
  type Lang,
  type currentActionType,
  type GetCarsParams,
  type IUser,
} from "./context/GlobalContext";

import "./App.css";
import AddCarPage from "./pages/addCarPage/AddCarPage";
import EditCarPage from "./pages/editCarPage/EditCarPage";
import NotFound from "./pages/notFoundPage/NotFound";
import ShowModal from "./components/show-modal/ShowModal";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "./firebase.ts";
import Loader from "./components/loader/Loader.tsx";
import HomeRedirect from "./pages/homeRedirect/HomeRedirect.tsx";
import useGetUser from "./hooks/useGetUser.ts";

function App() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loggedUser, setLoggedUser] = useState<IUser>(initialUser);
  const [authLoading, setAuthLoading] = useState(true);
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
  const [getCarsParams, setGetCarsParams] =
    useState<GetCarsParams>(initialGetCarsParams);

  const INACTIVITY_LIMIT = 30 * 60 * 1000;
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data } = useGetUser(authUser?.uid || "", authUser?.email || "");
  useEffect(() => {
    if (data) {
      setLoggedUser(data);
    }
  }, [data]);

  const resetTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

    inactivityTimer.current = setTimeout(() => {
      if (auth.currentUser) {
        signOut(auth)
          .then(() => console.log("User logged out due to inactivity"))
          .catch((err) => console.error(err));
        navigate("/signin");
      }
    }, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setAuthLoading(false);

      if (user) {
        resetTimer();
      } else {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      }
    });
    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      unsubscribe();
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        //   const token = await user.getIdToken();
        // console.log("Token:", token);

        setAuthUser(user);
        setAuthLoading(false);
      } else {
        setAuthUser(null);
        setAuthLoading(false);
        navigate("/signin");
      }
    });

    return () => unsubscribe();
  }, []);

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

  if (authLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

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
          getCarsParams,
          setGetCarsParams,
          authUser,
          setAuthUser,
          authLoading,
          setAuthLoading,
          loggedUser,
          setLoggedUser,
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
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/cars/:type" element={<CarsPage />} />
            <Route path="/add-car" element={<AddCarPage />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="/cars/edit/:id" element={<EditCarPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
