import { useQuery } from "@tanstack/react-query";
import { IDealerResponse } from "../types/dealerResponse";
import axios from "axios";

const useDealers = () => {
  const fetchDealers = () =>
    axios
      .get<IDealerResponse[]>(`${import.meta.env.VITE_API_URL}dealers`)
      .then((res) => res.data);
  return useQuery<IDealerResponse[], Error>({
    queryKey: ["dealers"],
    queryFn: fetchDealers,
    refetchOnWindowFocus: false,
    // staleTime: Infinity,
  });
};

export default useDealers;
