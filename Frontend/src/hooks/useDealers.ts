import { useQuery } from "@tanstack/react-query";
import { IDealerResponse } from "../types/dealerResponse";
import axios from "axios";
import { auth } from "../firebase.ts";

const useDealers = () => {
  const fetchDealers = async (): Promise<IDealerResponse[]> => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const token = await user.getIdToken();

    const res = await axios.get<IDealerResponse[]>(
      `${import.meta.env.VITE_API_URL}dealers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };

  return useQuery<IDealerResponse[], Error>({
    queryKey: ["dealers"],
    queryFn: fetchDealers,
    refetchOnWindowFocus: false,
    // staleTime: Infinity,
  });
};

export default useDealers;
