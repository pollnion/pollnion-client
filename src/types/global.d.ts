// types/global.d.ts (or similar)

import React from "react";
import { JSX } from "react";

/** Generic type for React children */
export type Children = React.ReactNode;
export type Element = JSX.Element;

export type OpenProps = {
  isOpen: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

/** Generic list state wrapper */
export interface ListState<T> {
  data: T[];
  error?: Error;
  loading: boolean;
}

/** Generic single-item view state wrapper */
export interface ViewState<T> {
  data: T;
  error?: Error;
  loading: boolean;
}

/** Object with unknown structure */
export type AnyObject = Record<string, unknown>;

/** Query string object (e.g., URLSearchParams style) */
export type Query = Record<string, string | number | string[] | number[]>;
