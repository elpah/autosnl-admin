import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const deleteCar = (carId: number) => {
  return axios.delete(`${import.meta.env.VITE_API_URL}delete-car`, {
    params: { carId },
  });
};

const useDeleteCar = () => {
  return useMutation({
    mutationFn: deleteCar,
  });
};

export default useDeleteCar;
