import { useEffect, useRef, useState } from "react";

import { Icon } from "../../components";

import { themes } from "../../constants";
import { useTheme } from "../../hooks";

export const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleIconClick: React.MouseEventHandler<SVGElement> = (e) => {
    e.stopPropagation();
    handleToggle();
  };

  const handleOptionClick = (newTheme: string) => {
    setIsOpen(false);
    setTheme(newTheme);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="absolute top-[50%] translate-y-[-50%] sm-max:right-[40px] right-[50px] md:right-[80px] lg:right-[600px] z-20"
      ref={dropdownRef}
    >
      <div
        className="group flex sm-max:gap-2 gap-3 items-center py-2 px-4 bg-transparent text-primaryTextColor sm-max:text-[14px] text-[16px] leading-[125%] rounded-[14px] cursor-pointer active:text-accentHoverColor focus:text-accentHoverColor  lg:hover:text-accentHoverColor transition duration-300"
        onClick={handleToggle}
      >
        Theme
        <Icon
          id="chevron"
          className={`sm-max:size-[10px] fill-none stroke-primaryTextColor group-active:stroke-accentHoverColor group-focus:stroke-accentHoverColor  lg:group-hover:stroke-accentHoverColor transition duration-300 ${
            isOpen ? "" : "rotate-[180deg]"
          }`}
          size="12"
          onClick={handleIconClick}
        />
      </div>
      {isOpen && (
        <ul className="w-full py-2 px-4 bg-thirdBgColor rounded-[14px] overflow-hidden block absolute top-[35px] left-0 z-[1] space-y-[8px] shadow-custom-inset text-[16px] text-aboutTextColor leading-[125%]">
          {themes.map((item, index) => (
            <li
              key={index}
              style={item === theme ? { color: "var(--accent-color)" } : {}}
              className="w-full cursor-pointer hover:text-primaryTextColor transition duration-300"
              onClick={() => handleOptionClick(item)}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
