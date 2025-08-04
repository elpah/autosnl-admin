import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const HomeRedirect = () => {
  const globalContext = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!globalContext.authLoading && globalContext.authUser) {
      navigate("/dashboard");
    }
  }, []);

  return <div></div>;
};

export default HomeRedirect;
