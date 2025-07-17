import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const deleteCar = (carId: string) => {
  return axios.delete(`${import.meta.env.VITE_API_URL}permanent-delete-car/${carId}`);
};

const usePermanentDeleteCar = () => {
  return useMutation({
    mutationFn: deleteCar,
  });
};

export default usePermanentDeleteCar;
