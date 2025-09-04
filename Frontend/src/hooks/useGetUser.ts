import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type IUser } from "../context/GlobalContext";

const useGetUser = (firebaseUid: string, userEmail: string) => {
  const fetchUser = async () => {
    const response = await axios.get<IUser>(
      `${import.meta.env.VITE_API_URL}users/get-or-create`,
      {
        params: {
          firebaseUid,
          email: userEmail,
        },
      }
    );
    return response.data;
  };

  return useQuery<IUser, Error>({
    queryKey: ["getUser", firebaseUid],
    queryFn: fetchUser,
    enabled: !!firebaseUid && !!userEmail,
    refetchOnWindowFocus: false,
  });
};

export default useGetUser;
