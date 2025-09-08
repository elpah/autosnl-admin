import { useMutation } from "@tanstack/react-query";
import { auth } from "../firebase.ts";
import axios from "axios";

const recommendCar = async (carId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");
  const token = await auth.currentUser?.getIdToken();

  return axios.patch(
    `${import.meta.env.VITE_API_URL}recommend-car`,
    {},
    {
      params: { carId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const useAddRecommend = () => {
  return useMutation({
    mutationFn: recommendCar,
  });
};

export default useAddRecommend;
