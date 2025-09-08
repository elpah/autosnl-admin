import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";
import { auth } from "../firebase.ts";

type ITotalResponse = {
  totalCars: number;
  totalDamaged: number;
  totalUsed: number;
  totalDealers: number;
};

const useGetTotals = () => {
  const fetchTotals = useCallback(async (): Promise<ITotalResponse> => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const token = await user.getIdToken();

    const res = await axios.get<ITotalResponse>(
      `${import.meta.env.VITE_API_URL}get-total-cars`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  }, []);

  return useQuery<ITotalResponse, Error>({
    queryKey: ["totals"],
    queryFn: fetchTotals,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetTotals;
