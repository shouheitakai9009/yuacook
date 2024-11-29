"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

const TextContext = createContext({
  text: "",
  setText: (text: string) => {},
});

export const TextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [text, setText] = useState("");

  return (
    <TextContext.Provider value={{ text, setText }}>
      {children}
    </TextContext.Provider>
  );
};

export const useText = () => useContext(TextContext);
