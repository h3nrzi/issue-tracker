import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";

export default function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    async queryFn() {
      const res = await axios.get<User[]>("/api/users");
      return res.data;
    },
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });
}
