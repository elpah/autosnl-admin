import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { type ICarData } from "../context/GlobalContext";

const useUpdateCar = () => {
  return useMutation({
    mutationFn: async (carData: ICarData) => {
      const formData = new FormData();

      formData.append("carData", JSON.stringify(carData));

      carData.carImages.forEach((image) => {
        formData.append("carImages[]", image);
      });

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}update-car`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error submitting car data:", error);
        throw error;
      }
    },
  });
};

export default useUpdateCar;
