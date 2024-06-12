import { useLocation } from "react-router-dom";
import { useState } from "react";

import { UserMenu, AuthNav, Icon, MobileMenu, NavMenu } from "../../components";

import { useModal } from "../../hooks";
import { MobileMenuContext } from "../../context";

export const Header = () => {
  const [isOpenMenu, toggleMenu] = useModal();
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
          className="absolute top-[50%] left-[60%] translate-y-[-50%] btn py-[8px] lg:py-[14px] px-[10px] bg-transparent border border-[#191a1533] font-medium text-[16px] leading-[125%] tracking-[-0.01em] active:border-accentColor focus:border-accentColor lg:hover:border-accentColor active:text-accentColor focus:text-accentColor lg:hover:text-accentColor"
          onClick={() => {
            setIsLoggedIn(!isLoggedIn);
          }}
        >
          Log In
        </button>
        <div className="container flex justify-between items-center">
          <MobileMenuContext.Provider value={false}>
            {" "}
            <NavMenu isLoggedIn={isLoggedIn} />
          </MobileMenuContext.Provider>
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
          <button type="button" className="lg:hidden" onClick={toggleMenu}>
            <Icon
              id="menu"
              size="40"
              className="fill-accentColor stroke-transparent active:fill-transparent active:stroke-accentColor focus:fill-transparent focus:stroke-accentColor transition duration-3000"
            />
          </button>
        </div>
      </header>

      <MobileMenu
        backDropClass={isOpenMenu ? "scale-100" : "scale-0"}
        menuClass={isOpenMenu ? "translate-x-0" : "translate-x-[100%]"}
        isLoggedIn={isLoggedIn}
        toggleMenu={toggleMenu}
      />
    </>
  );
};
