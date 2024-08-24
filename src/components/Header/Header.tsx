import { useState } from "react";

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
  const [userName, setUserName] = useState<string | null>(null);
  const [isOpenMenu, toggleMenu] = useModal();

  const { currentUser } = useUser();

  const onSignUpSuccess = (name: string) => {
    setUserName(name);
  };

  return (
    <>
      <header className="relative border-b border-b-[#191a1519]">
        <div className="relative container flex justify-between items-center">
          <MobileMenuContext.Provider value={false}>
            <NavMenu />
          </MobileMenuContext.Provider>
          {currentUser ? (
            <UserMenu userName={userName} />
          ) : (
            <AuthNav onSignUpSuccess={onSignUpSuccess} />
          )}
          <button type="button" className="lg:hidden" onClick={toggleMenu}>
            <Icon
              id="menu"
              size="40"
              className="fill-accentColor stroke-transparent active:fill-transparent active:stroke-accentColor focus-visible:fill-transparent focus-visible:stroke-accentColor transition duration-3000"
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
