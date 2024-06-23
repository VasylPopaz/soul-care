import { useLocation } from "react-router-dom";

import {
  UserMenu,
  AuthNav,
  Icon,
  MobileMenu,
  NavMenu,
  ThemeSwitcher,
} from "../../components";

import { useModal, useUser } from "../../hooks";
import { MobileMenuContext } from "../../contexts";

export const Header = () => {
  const [isOpenMenu, toggleMenu] = useModal();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { currentUser } = useUser();

  return (
    <>
      <header
        className={`${
          isHomePage
            ? "bg-gradient-to-r from-firstGradColor to-secondGradColor"
            : ""
        } relative border-b border-b-[#191a1519]`}
      >
        <div className="relative container flex justify-between items-center">
          <MobileMenuContext.Provider value={false}>
            <NavMenu />
          </MobileMenuContext.Provider>
          {currentUser ? <UserMenu /> : <AuthNav />}
          <button type="button" className="lg:hidden" onClick={toggleMenu}>
            <Icon
              id="menu"
              size="40"
              className="fill-accentColor stroke-transparent active:fill-transparent active:stroke-accentColor focus:fill-transparent focus:stroke-accentColor transition duration-3000"
            />
          </button>
          <ThemeSwitcher />
        </div>
      </header>

      <MobileMenu
        isOpen={isOpenMenu}
        backDropClass={isOpenMenu ? "scale-100" : "scale-0"}
        menuClass={isOpenMenu ? "translate-x-0" : "translate-x-[100%]"}
        toggleMenu={toggleMenu}
      />
    </>
  );
};
