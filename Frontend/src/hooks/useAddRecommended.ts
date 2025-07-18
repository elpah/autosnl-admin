import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const recommendCar = (carId: string) => {
  return axios.patch(
    `${import.meta.env.VITE_API_URL}recommend-car`,
    {},
    {
      params: { carId },
    }
  );
};

const useAddRecommend = () => {
  return useMutation({
    mutationFn: recommendCar,
  });
};

export default useAddRecommend;
