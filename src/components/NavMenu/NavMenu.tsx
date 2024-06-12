import { Link, NavLink } from "react-router-dom";

import { useMobileMenuContext } from "../../context";

interface NavMenuProps {
  isLoggedIn: boolean;
  toggleMenu?: () => void;
}

export const NavMenu = ({
  isLoggedIn,

  toggleMenu,
}: NavMenuProps) => {
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
      } ${isLoggedIn ? "lg:gap-[226px]" : "lg:gap-[130px]"}`}
    >
      <Link
        to="/"
        className="font-semibold text-[20px] leading-[120%] tracking-[-0.02em] py-[16px] lg:py-[38px]"
        onClick={handleClick}
      >
        <span className="text-accentColor font-bold text-[20px] leading-[120%] tracking-[-0.02em]">
          psychologists.
        </span>
        services
      </Link>
      <ul
        className={`${
          isMobileMenu ? "flex flex-col items-center" : "hidden lg:flex"
        } gap-4 lg:gap-10 text-[16px] leading-[125%] tracking-[-0.01em]`}
      >
        <li>
          <NavLink
            to="/"
            className="inline-block py-[8px] lg:py-[38px] active:text-accentColor lg:hover:text-accentColor transition duration-300"
            onClick={handleClick}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/psyhologists"
            className="inline-block py-[8px] lg:py-[38px] active:text-accentColor lg:hover:text-accentColor transition duration-300"
            onClick={handleClick}
          >
            Psyhologists
          </NavLink>
        </li>
        {isLoggedIn ? (
          <li>
            <NavLink
              to="/favorites"
              className="inline-block py-[8px] lg:py-[38px] active:text-accentColor lg:hover:text-accentColor transition duration-300"
              onClick={handleClick}
            >
              Favorites
            </NavLink>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};
