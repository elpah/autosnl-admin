import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const restoreCar = (carId: string) => {
  return axios.patch(`${import.meta.env.VITE_API_URL}restore-car/${carId}`);
};

const useRestoreCar = () => {
  return useMutation({
    mutationFn: restoreCar,
  });
};

export default useRestoreCar;
