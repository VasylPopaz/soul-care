import { useLayoutEffect, useState } from "react";

import { themes } from "../constants";

export const useTheme = () => {
  const savedTheme = localStorage.getItem("theme") ?? "green";
  const initialTheme = themes.includes(savedTheme) ? savedTheme : "green";

  const [theme, setTheme] = useState(initialTheme);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateFavicon(theme);
  }, [theme]);

  const updateFavicon = (theme: string) => {
    const favicon = document.getElementById("favicon") as HTMLLinkElement;
    if (favicon) {
      favicon.href = `/favicon-${theme}.ico`;
    }
  };

  return { theme, setTheme };
};
