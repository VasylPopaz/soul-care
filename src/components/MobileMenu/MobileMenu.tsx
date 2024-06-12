import { AuthNav, NavMenu, UserMenu } from "../../components";

import { handleClickOnBackdrop } from "../../helpers";
import { useEscapeKeyClose } from "../../hooks";
import { MobileMenuContext } from "../../context";

interface MobileMenuProps {
  backDropClass: string;
  menuClass: string;
  isLoggedIn: boolean;
  toggleMenu: () => void;
}

export const MobileMenu = ({
  backDropClass,
  menuClass,
  isLoggedIn,
  toggleMenu,
}: MobileMenuProps) => {
  useEscapeKeyClose(toggleMenu);

  return (
    <MobileMenuContext.Provider value={true}>
      <div
        className={`lg:hidden items-center justify-center fixed backdrop-blur-sm bg-[#191a15] bg-opacity-60 w-full h-full  left-0 top-0 z-50 ${backDropClass}`}
        onClick={(e) => handleClickOnBackdrop(toggleMenu, e)}
      >
        <div
          className={`flex flex-col gap-6 px-6 py-8 w-[300px] md:w-[350px] h-full bg-[#fbfbfb] absolute top-0 right-0 transition duration-500 ${menuClass}`}
        >
          <NavMenu isLoggedIn={isLoggedIn} toggleMenu={toggleMenu} />
          {!isLoggedIn ? <AuthNav /> : <UserMenu />}
        </div>
      </div>
    </MobileMenuContext.Provider>
  );
};
