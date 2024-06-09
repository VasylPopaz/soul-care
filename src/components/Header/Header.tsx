import { Link, NavLink, useLocation } from "react-router-dom";

import { UserMenu, AuthNav } from "../../components";
import { useState } from "react";

export const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <header
        className={`${
          isHomePage
            ? "bg-gradient-to-r from-firstGradColor to-secondGradColor"
            : ""
        } relative border-b border-b-[#191a1519]`}
      >
        <button
          type="button"
          className="absolute top-[50%] left-[60%] translate-y-[-50%] btn py-[8px] lg:py-[14px] px-[20px] lg:px-[40px] bg-transparent border border-[rgba(25, 26, 21, 0.2)] font-medium text-[16px] leading-[125%] tracking-[-0.01em] active:border-accentColor focus:border-accentColor lg:hover:border-accentColor active:text-accentColor focus:text-accentColor lg:hover:text-accentColor"
          onClick={() => {
            setIsLoggedIn(!isLoggedIn);
          }}
        >
          Log In
        </button>
        <div className="container flex justify-between items-center">
          <nav
            className={`flex md:gap-[60px] items-center ${
              isLoggedIn ? "lg:gap-[226px]" : "lg:gap-[130px]"
            }`}
          >
            <Link
              to="/"
              className=" font-semibold text-[20px] leading-[120%] tracking-[-0.02em]"
            >
              <span className="text-accentColor font-bold text-[20px] leading-[120%] tracking-[-0.02em]">
                psychologists.
              </span>
              services
            </Link>

            <ul className="flex md:gap-4 lg:gap-10 text-[16px] leading-[125%] tracking-[-0.01em]">
              <li>
                <NavLink
                  to="/"
                  className="inline-block py-[38px] active:text-accentColor lg:hover:text-accentColor transition duration-300"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/psyhologists"
                  className="inline-block py-[38px] active:text-accentColor lg:hover:text-accentColor transition duration-300"
                >
                  Psyhologists
                </NavLink>
              </li>
              {isLoggedIn ? (
                <li>
                  <NavLink
                    to="/favorites"
                    className="inline-block py-[38px] active:text-accentColor lg:hover:text-accentColor transition duration-300"
                  >
                    Favorites
                  </NavLink>
                </li>
              ) : null}
            </ul>
          </nav>
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </div>
      </header>
    </>
  );
};
