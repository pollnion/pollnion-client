"use client";
import React from "react";
import { AnyObject } from "@/types";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const props = {};

  return React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement, props as AnyObject)
    : children;
};

export default Layout;
