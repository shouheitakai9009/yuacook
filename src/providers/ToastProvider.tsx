"use client";

import { ToastContainer } from "react-toastify";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";

export function ToastProvider(props: { children: React.ReactNode }) {
  return (
    <>
      {props.children}
      <ToastContainer />
    </>
  );
}
