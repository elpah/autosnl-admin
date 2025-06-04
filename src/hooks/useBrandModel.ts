import { useQuery } from "@tanstack/react-query";
import { type ICarCategoriesResponse } from "../types/carCategoriesResponse";
import axios from "axios";

const useBrandModel = () => {
  const fetchCategories = () =>
    axios
      .get<ICarCategoriesResponse>(
        `${import.meta.env.VITE_API_URL}brandmodelscountries`
      )
      .then((res) => res.data);
  return useQuery<ICarCategoriesResponse, Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    // staleTime: Infinity,
  });
};
export default useBrandModel;
