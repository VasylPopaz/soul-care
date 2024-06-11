import { useEffect, useRef, useState } from "react";

import { Icon } from "../../components";

import { statuses } from "../../constants";

export const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Show all");

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

  const handleOptionClick = (label: string) => {
    setIsOpen(false);
    setSortBy(label);
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
    <div className="mb-[32px]">
      <p className="font-medium text-[14px] text-[#8a8a89] leading-[129%] mb-[8px]">
        Filters
      </p>
      <div className="relative inline-block w-[226px] " ref={dropdownRef}>
        <div
          className="flex justify-between items-center py-[16px] px-[18px] w-full bg-accentColor font-medium text-[#fbfbfb] text-[16px] leading-[125%] rounded-[14px] cursor-pointer hover:text-bg-card-color hover:bg-accentHoverColor transition duration-300"
          onClick={handleToggle}
        >
          {sortBy}
          <Icon
            id="chevron"
            className={`fill-none stroke-white transition duration-300 ${
              isOpen ? "" : "rotate-[180deg]"
            }`}
            size="15"
            onClick={handleIconClick}
          />
        </div>
        {isOpen && (
          <ul className="w-full py-[14px] px-[18px] bg-[#fff] rounded-[14px] overflow-hidden block absolute top-[60px] left-0 z-[1] space-y-[8px] shadow-custom-inset text-[16px] text-[#191a154c] leading-[125%]">
            {statuses.map((item, index) => (
              <li
                key={index}
                style={item === sortBy ? { color: "#191a15" } : {}}
                className="cursor-pointer hover:text-[#0404039a] transition duration-300"
                onClick={() => handleOptionClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
