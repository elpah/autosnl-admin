import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { type IUser } from "../context/GlobalContext";

const useEditUser = () => {
  return useMutation({
    mutationFn: async (userData: IUser) => {
      const formData = new FormData();

      formData.append("userData", JSON.stringify(userData));

      formData.append("userimage", userData.profileImage);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}users/create-edit-user`,
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
          console.error("Error submitting user data:", error);
        }
        throw error;
      }
    },
  });
};

export default useEditUser;
