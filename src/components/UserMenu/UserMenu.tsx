import { Icon } from "../../components";

export const UserMenu = () => {
  return (
    <div className="flex items-center gap-[28px]">
      <div className="flex gap-[14px] items-center">
        <span className="inline-flex justify-center items-center w-10 h-10 bg-accentColor rounded-[10px]">
          <Icon id="man" size="20" className="fill-[#fbfbfb]" />
        </span>
        <p className="font-semibold text-[16px] leading-[125%] tracking-[-0.01em]">
          User
        </p>
      </div>

      <button
        type="button"
        className="btn py-[14px] px-[40px] bg-transparent border border-[rgba(25, 26, 21, 0.2)] font-medium text-[16px] leading-[125%] tracking-[-0.01em] active:border-accentColor focus:border-accentColor lg:hover:border-accentColor active:text-accentColor focus:text-accentColor lg:hover:text-accentColor"
      >
        Log Out
      </button>
    </div>
  );
};
