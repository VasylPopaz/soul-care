import { AuthNav, NavMenu, UserMenu } from "../../components";

import { handleClickOnBackdrop } from "../../helpers";
import { useEscapeKeyClose } from "../../hooks";
import { MobileMenuContext } from "../../context";

interface MobileMenuProps {
  isOpen: boolean;
  backDropClass: string;
  menuClass: string;
  isLoggedIn: boolean;
  toggleMenu: () => void;
}

export const MobileMenu = ({
  isOpen,
  backDropClass,
  menuClass,
  isLoggedIn,
  toggleMenu,
}: MobileMenuProps) => {
  useEscapeKeyClose(isOpen, toggleMenu);

  return (
    <MobileMenuContext.Provider value={true}>
      <div
        className={`lg:hidden items-center justify-center fixed backdrop-blur-sm bg-[#191a15] bg-opacity-60 w-full h-full  left-0 top-0 z-50 ${backDropClass}`}
        onClick={(e) => handleClickOnBackdrop(toggleMenu, e)}
      >
        <div
          className={`bg-gradient-to-r from-firstGradColor to-secondGradColor flex flex-col gap-10 px-6 py-8 w-[300px] md:w-[350px] h-full font-medium text-[18px] absolute top-0 right-0 transition duration-300 ${menuClass}`}
        >
          <NavMenu isLoggedIn={isLoggedIn} toggleMenu={toggleMenu} />
          {!isLoggedIn ? <AuthNav toggleMenu={toggleMenu} /> : <UserMenu />}
        </div>
      </div>
    </MobileMenuContext.Provider>
  );
};
