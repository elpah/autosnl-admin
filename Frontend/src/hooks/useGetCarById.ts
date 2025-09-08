import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { auth } from "../firebase.ts";
import { type ICarData } from "../context/GlobalContext";

const useGetCarById = (carId: string) => {
  const fetchCar = async (): Promise<ICarData> => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const token = await user.getIdToken();

    const res = await axios.get<ICarData>(
      `${import.meta.env.VITE_API_URL}get-car-by-id/${carId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };

  return useQuery<ICarData, Error>({
    queryKey: ["carById", carId],
    queryFn: fetchCar,
    refetchOnWindowFocus: false,
  });
};

export default useGetCarById;
