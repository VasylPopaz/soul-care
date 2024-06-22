import { Link, NavLink } from "react-router-dom";

import { useMobileMenuContext } from "../../context";
import { useUser } from "../../hooks";

interface NavMenuProps {
  toggleMenu?: () => void;
}

export const NavMenu = ({ toggleMenu }: NavMenuProps) => {
  const { currentUser } = useUser();

  const isMobileMenu = useMobileMenuContext();

  const handleClick = () => {
    if (isMobileMenu && toggleMenu) {
      toggleMenu();
    }
  };

  return (
    <nav
      className={`flex gap-10 lg:gap-[60px] items-center ${
        isMobileMenu ? "flex-col" : ""
      } ${currentUser ? "lg:gap-[226px]" : "lg:gap-[130px]"}`}
    >
      <Link
        to="/"
        className="font-semibold sm-max:text-[16px] text-[18px] md:text-[20px] leading-[120%] tracking-[-0.02em] py-[16px] lg:py-[38px]"
        onClick={handleClick}
      >
        <span className="text-accentColor font-bold leading-[120%] tracking-[-0.02em]">
          psychologists.
        </span>
        services
      </Link>
      <ul
        className={`${
          isMobileMenu ? "flex flex-col items-center w-full" : "hidden lg:flex"
        } gap-4 lg:gap-10 text-[16px] leading-[125%] tracking-[-0.01em]`}
      >
        {[
          { route: "/", label: "Home" },
          { route: "/psychologists", label: "Psychologists" },
          { route: "/favorites", label: "Favorites" },
        ].map(({ route, label }, index) => {
          if (!currentUser && label === "Favorites") {
            return null;
          }
          return (
            <li key={index} className="w-full text-center">
              <NavLink
                to={route}
                className="inline-block py-[8px] lg:py-[38px] w-full active:text-accentColor lg:hover:text-accentColor transition duration-300"
                onClick={handleClick}
              >
                {label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
