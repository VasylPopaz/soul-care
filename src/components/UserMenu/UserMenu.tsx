import { Icon } from "../../components";

import { signoutUser } from "../../api";
import { useMobileMenuContext } from "../../context";

export const UserMenu = () => {
  const isMobileMenu = useMobileMenuContext();

  return (
    <div
      className={` ${
        isMobileMenu ? "flex flex-col justify-between h-full" : "hidden lg:flex"
      } items-center gap-[28px]`}
    >
      <div
        className={`flex gap-[14px] items-center ${
          isMobileMenu ? "flex-wrap w-full justify-center" : ""
        }`}
      >
        <span className="inline-flex justify-center items-center w-10 h-10 bg-accentColor rounded-[10px]">
          <Icon id="man" size="20" className="fill-[#fbfbfb]" />
        </span>
        <p
          className={`font-semibold text-[16px] leading-[125%] tracking-[-0.01em]  ${
            isMobileMenu ? "text-center max-w-[240px] break-words" : ""
          }`}
        >
          User
        </p>
      </div>

      <button
        type="button"
        className={`btn-secondary py-[14px] px-[40px] font-medium text-[16px] leading-[125%] tracking-[-0.01em] ${
          isMobileMenu ? "w-full" : ""
        }`}
        onClick={signoutUser}
      >
        Log Out
      </button>
    </div>
  );
};
