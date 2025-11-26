"use client";

import { create } from "zustand";
import { AnyObject } from "@/types";

export type GetResponse = {
  data: AnyObject;
  setData: (data: AnyObject) => void;
};

export const useGetResponse = create<GetResponse>((set) => ({
  data: {},
  setData: (data: AnyObject) => set({ data }),
}));
