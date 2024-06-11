import { useEffect, useRef, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Icon } from "../../components";

interface InputProps {
  tag?: "input" | "textarea" | "datepicker";
  divClass?: string;
  className?: string;
  name: string;
  type?: "text" | "number" | "password" | "tel" | "time";
  placeholder: string;
  defaultValue?: string | number;
  value?: string | Date | null;
  register: UseFormRegister<FieldValues>;
  onChange?: (date: Date | null) => void;
  errors: FieldErrors<FieldValues>;
  dirtyFields: Record<string, boolean>;
}

export const InputField = ({
  tag = "input",
  divClass = "",
  className = "",
  name,
  placeholder,
  type = "text",
  defaultValue = "",
  value,
  register,
  onChange,
  errors,
  dirtyFields,
}: InputProps) => {
  const [showPass, setShowPass] = useState(false);
  const [isFilled, setIsFilled] = useState(!!defaultValue);

  const inputRef = useRef<DatePicker>(null);

  useEffect(() => {
    setIsFilled(!!defaultValue);
  }, [defaultValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsFilled(!!value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, target } = e;
    const value = (target as HTMLInputElement).value;

    if (
      !/[0-9]/.test(key) &&
      key !== "Backspace" &&
      key !== "Delete" &&
      key !== "ArrowLeft" &&
      key !== "ArrowRight" &&
      key !== "Tab" &&
      key !== "Home" &&
      key !== "End"
    ) {
      e.preventDefault();
    }

    if (
      value.length >= 9 &&
      key !== "Backspace" &&
      key !== "Delete" &&
      key !== "ArrowLeft" &&
      key !== "ArrowRight" &&
      key !== "Tab" &&
      key !== "Home" &&
      key !== "End"
    ) {
      e.preventDefault();
    }
  };

  const handleDivClick = () => {
    const inputElement = document.getElementById(name);
    if (inputElement) {
      inputElement.focus();
    }

    inputRef.current && inputRef.current.setFocus();
  };

  return (
    <div
      className={`relative group ${divClass} ${
        name === "phone"
          ? ` before:content-['+380'] before:absolute before:top-[50%] before:left-[18px] before:translate-y-[-50%] `
          : ""
      }`}
      onClick={handleDivClick}
    >
      {tag === "input" ? (
        <input
          id={name}
          {...register(name, { onChange: handleInputChange })}
          type={showPass ? "text" : type}
          placeholder=""
          defaultValue={defaultValue}
          onKeyDown={name === "phone" ? handleKeyDown : () => {}}
          className={`group-input px-[18px] py-4 rounded-[12px] border border-[#191a15] border-opacity-10 bg-transparent outline-none w-full hover:border-accentColor focus:border-accentColor placeholder:text-[#191a15] transition duration-300 ${className}`}
          autoComplete="on"
        />
      ) : tag === "textarea" ? (
        <div className="rounded-[12px] overflow-hidden">
          <textarea
            id={name}
            {...register(name, { onChange: handleInputChange })}
            defaultValue={defaultValue}
            className="px-[18px] py-4 text-[16px] leading-[125%] rounded-[12px] border border-[#191a15] border-opacity-10 bg-transparent outline-none w-full h-[116px] hover:border-accentColor focus:border-accentColor placeholder:text-[#191a15] transition duration-300 resize-none align-top scrollbar"
          />
        </div>
      ) : (
        <>
          <DatePicker
            selected={value as Date | null}
            onChange={(date: Date | null) => onChange?.(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Meeting time"
            timeFormat="HH:mm"
            dateFormat="HH:mm"
            ref={inputRef}
          />
          <Icon
            id="clock"
            size="20"
            className="absolute top-[50%] right-[20px] translate-y-[-50%] fill-none stroke-[#191a15]"
          />
        </>
      )}
      {placeholder && (
        <div
          className={`px-[4px] absolute top-[17px] left-[19px] bg-[#fbfbfb] transform transition-transform 
    group-focus-within:translate-y-[-28px] ${
      isFilled ? "translate-y-[-28px]" : ""
    }`}
        >
          {placeholder}
        </div>
      )}
      {type === "password" && (
        <button type="button" onClick={() => setShowPass(!showPass)}>
          <Icon
            id={`${showPass ? "eye" : "eye-off"}`}
            className="stroke-black fill-white  absolute top-[20px] right-[18px]"
            size="20"
          />
        </button>
      )}
      {(errors[name]?.message && dirtyFields[name]) || errors[name]?.message ? (
        <p className="text-red-700 text-[12px] bg-[#fbfbfb] absolute bottom-[-9px] left-[12px] px-[4px] rounded-[18px]">
          <>{errors[name]?.message}</>
        </p>
      ) : null}
    </div>
  );
};
