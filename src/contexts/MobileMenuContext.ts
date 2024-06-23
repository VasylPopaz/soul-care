import { createContext, useContext } from "react";

export const MobileMenuContext = createContext(false);

export const useMobileMenuContext = () => useContext(MobileMenuContext);
