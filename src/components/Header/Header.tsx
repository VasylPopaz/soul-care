import { Link, NavLink, useLocation } from "react-router-dom";

import { UserMenu, AuthNav } from "../../components";

export const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const isLoggedIn = false;
  return (
    <header
      className={`${
        isHomePage
          ? "bg-gradient-to-r from-firstGradColor to-secondGradColor"
          : ""
      } border-b border-b-[rgba(25, 26, 21, 0.1)]`}
    >
      <div className="container flex justify-between items-center">
        <nav className="flex gap-[130px] items-center">
          <Link
            to="/"
            className=" font-semibold text-[20px] leading-[120%] tracking-[-0.02em]"
          >
            <span className="text-accentColor font-bold text-[20px] leading-[120%] tracking-[-0.02em]">
              psychologists.
            </span>
            services
          </Link>

          <ul className="flex gap-10 text-[16px] leading-[125%] tracking-[-0.01em]">
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
  );
};
