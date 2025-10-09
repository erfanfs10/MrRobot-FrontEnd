"use client";

import { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [navigations, setNavigations] = useState([
    { label: "خانه", href: "/" },
  ]);

  return (
    <NavigationContext.Provider value={{ navigations, setNavigations }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
