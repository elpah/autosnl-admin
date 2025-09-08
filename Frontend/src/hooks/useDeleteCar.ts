import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { auth } from "../firebase.ts";

const deleteCar = async (carId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const token = await user.getIdToken();

  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}delete-car/${carId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const useDeleteCar = () => {
  return useMutation({
    mutationFn: deleteCar,
  });
};

export default useDeleteCar;
