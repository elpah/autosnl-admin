import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { auth } from "../firebase.ts";
import { type IUser } from "../context/GlobalContext";

const useEditUser = () => {
  return useMutation({
    mutationFn: async (userData: IUser) => {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      const token = await user.getIdToken();

      const formData = new FormData();
      formData.append("userData", JSON.stringify(userData));

      if (userData.profileImage) {
        formData.append("profileImage", userData.profileImage);
      }

      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}users/edit-user`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
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
