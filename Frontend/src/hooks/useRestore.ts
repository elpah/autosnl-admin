import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { auth } from "../firebase.ts";

const restoreCar = async (carId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const token = await user.getIdToken();

  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}restore-car/${carId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const useRestoreCar = () => {
  return useMutation({
    mutationFn: restoreCar,
  });
};

export default useRestoreCar;
