import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type ICarData } from "../context/GlobalContext";

const useGetCarById = (carId: string) => {
  const fetchCars = () =>
    axios
      .get<ICarData>(`${import.meta.env.VITE_API_URL}get-car-by-id/${carId}`)
      .then((res) => res.data);
  return useQuery<ICarData, Error>({
    queryKey: ["carById", carId],
    queryFn: fetchCars,
    refetchOnWindowFocus: false,
  });
};
export default useGetCarById;
