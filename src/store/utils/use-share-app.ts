import { useContext } from "react";
import { ShareContext } from "@/components/providers/share-provider";

export const useShareApp = () => useContext(ShareContext);
