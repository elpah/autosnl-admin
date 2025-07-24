import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { type ICarData } from "../context/GlobalContext";

const useCreateCar = () => {
  return useMutation({
    mutationFn: async (carData: ICarData) => {
      const formData = new FormData();

      formData.append("carData", JSON.stringify(carData));

      carData.carImages.forEach((image) => {
        formData.append("carImages[]", image);
      });

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}add-car`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (error) {
        if (import.meta.env.VITE_NODE_ENV !== "production") {
          console.error("Error submitting car data:", error);
        }
        throw error;
      }
    },
  });
};

export default useCreateCar;
