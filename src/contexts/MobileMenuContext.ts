import { createContext, useContext } from "react";

export const MobileMenuContext = createContext<boolean>(false);

export const useMobileMenuContext = () => useContext(MobileMenuContext);
