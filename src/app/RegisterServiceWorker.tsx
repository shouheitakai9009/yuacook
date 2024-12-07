"use client";

import { useEffect } from "react";

export const RegisterServiceWorker = () => {
  // サービスワーカーを登録
  useEffect(() => {
    window.addEventListener("load", () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js");
      }
    });
  }, []);

  return null;
};
