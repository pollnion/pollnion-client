import { useContext } from "react";
import { AuthContext } from "@/components/providers/auth-provider";

const useAuth = () => useContext(AuthContext);

export default useAuth;
