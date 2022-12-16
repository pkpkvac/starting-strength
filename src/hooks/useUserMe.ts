import { useSession } from "next-auth/react";

const useUserMe = () => {
  const { data: session } = useSession();
  return session?.user;
};

export default useUserMe;
