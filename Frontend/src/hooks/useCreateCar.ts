import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { type ICarData } from "../context/GlobalContext";

const useCreateCar = () => {
  return useMutation({
    mutationFn: (carData: ICarData) =>
      axios
        .post(`${import.meta.env.VITE_API_URL}add-car`, carData)
        // .then((res) => res.status),
  });
};

export default useCreateCar;
