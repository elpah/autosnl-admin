import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";
import { type IDealer, type ICarData } from "../context/GlobalContext";

type ICarResponse = {
  totalCars: number;
  cars: ICarData[];
  dealer?: IDealer | string;
};

const useGetAllCars = (pageNumber: number, type: "available" | "deleted") => {
  const fetchCars = useCallback(() => {
    return axios
      .get<ICarResponse>(`${import.meta.env.VITE_API_URL}get-all-cars`, {
        params: { pageNumber, type },
      })
      .then((res) => res.data);
  }, [pageNumber, type]);

  return useQuery<ICarResponse, Error>({
    queryKey: ["cars", pageNumber, type],
    queryFn: fetchCars,
    staleTime: 1000 * 60 * 5,
    // refetchOnWindowFocus: false,
  });
};
export default useGetAllCars;
