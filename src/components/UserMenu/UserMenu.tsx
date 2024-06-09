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
        className="btn-secondary py-[14px] px-[40px] font-medium text-[16px] leading-[125%] tracking-[-0.01em]"
      >
        Log Out
      </button>
    </div>
  );
};
