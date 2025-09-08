import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";
import { auth } from "../firebase.ts";
import {
  type IDealer,
  type ICarData,
  type GetCarsParams,
} from "../context/GlobalContext";

type ICarResponse = {
  totalCars: number;
  cars: ICarData[];
  dealer?: IDealer | string;
};

const useGetAllCars = (
  params: GetCarsParams,
  type: "available" | "deleted"
) => {
  const fetchCars = useCallback(async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const token = await user.getIdToken();

    const res = await axios.get<ICarResponse>(
      `${import.meta.env.VITE_API_URL}admin-get-all-cars`,
      {
        params: { ...params, type },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  }, [params, type]);

  return useQuery<ICarResponse, Error>({
    queryKey: ["cars", params, type],
    queryFn: fetchCars,
    // staleTime: 1000 * 60 * 5,
    // refetchOnWindowFocus: false,
  });
};

export default useGetAllCars;
