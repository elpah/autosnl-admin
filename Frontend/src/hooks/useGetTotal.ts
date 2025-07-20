import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";

type ITotalResponse = {
  totalCars: number;
  totalDamaged: number;
  totalUsed: number;
  totalDealers: number;
};

const useGetTotals = () => {
  const fetchCars = useCallback(() => {
    return axios
      .get<ITotalResponse>(`${import.meta.env.VITE_API_URL}get-total-cars`)
      .then((res) => res.data);
  }, []);

  return useQuery<ITotalResponse, Error>({
    queryKey: ["totals"],
    queryFn: fetchCars,
    staleTime: 1000 * 60 * 5,
  });
};
export default useGetTotals;
