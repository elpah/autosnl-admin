import { useQuery } from "@tanstack/react-query";
import { type ICarCategoriesResponse } from "../types/carCategoriesResponse";
import { auth } from "../firebase.ts";
import axios from "axios";

const useBrandModel = () => {
  const fetchCategories = async (): Promise<ICarCategoriesResponse> => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const token = await user.getIdToken();

    const res = await axios.get<ICarCategoriesResponse>(
      `${import.meta.env.VITE_API_URL}adminbrandmodelscountries`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };

  return useQuery<ICarCategoriesResponse, Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    refetchOnWindowFocus: false,
    // staleTime: Infinity,
  });
};

export default useBrandModel;
