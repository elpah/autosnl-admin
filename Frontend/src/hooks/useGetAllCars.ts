import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {type IDealer, type ICarData } from "../context/GlobalContext";

type ICarResponse = {
  totalCars: number;
  cars: ICarData[];
  dealer?: IDealer | string;
};

const useGetAllCars = (pageNumber: number) => {
  const fetchCars = () =>
    axios
      .get<ICarResponse>(`${import.meta.env.VITE_API_URL}get-all-cars`, {
        params: { pageNumber },
      })
      .then((res) => res.data);
  return useQuery<ICarResponse, Error>({
    queryKey: ["cars", pageNumber],
    queryFn: fetchCars,
  });
};
export default useGetAllCars;
