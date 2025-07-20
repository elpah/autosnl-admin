import { ClipLoader } from "react-spinners";

const Loader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "40vh",
    }}
  >
    <ClipLoader color="#3498db" size={35} />
  </div>
);

export default Loader;
