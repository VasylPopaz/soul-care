import { useEffect, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { Icon } from "../../components";

interface InputProps {
  divClass: string;
  className?: string;
  label?: string;
  name: string;
  type?: "text" | "number" | "password";
  placeholder: string;
  defaultValue?: string | number;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  dirtyFields: Record<string, boolean>;
}

export const InputField = ({
  divClass = "",
  className = "",
  name,
  placeholder,
  type = "text",
  defaultValue = "",
  register,
  errors,
  dirtyFields,
}: InputProps) => {
  const [showPass, setShowPass] = useState(false);
  const [isFilled, setIsFilled] = useState(!!defaultValue);

  useEffect(() => {
    setIsFilled(!!defaultValue);
  }, [defaultValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFilled(!!e.target.value);
  };

  const handleDivClick = () => {
    const inputElement = document.getElementById(name);
    if (inputElement) {
      inputElement.focus();
    }
  };

  return (
    <div className={`relative group ${divClass}`} onClick={handleDivClick}>
      <input
        id={name}
        {...register(name, { onChange: handleInputChange })}
        type={showPass ? "text" : type}
        placeholder=""
        defaultValue={defaultValue}
        className={`group-input px-[18px] py-4 rounded-[12px] border border-[rgb(25, 26, 21] border-opacity-10 bg-transparent outline-none w-full hover:border-accentColor focus:border-accentColor placeholder:text-[#191a15] transition duration-300 ${className}`}
        autoComplete="on"
      />
      <div
        className={`px-[4px] absolute top-[17px] left-[19px] bg-[#fbfbfb] transform transition-transform 
    group-focus-within:translate-y-[-28px] ${
      isFilled ? "translate-y-[-28px]" : ""
    }`}
      >
        {placeholder}
      </div>
      {type === "password" && (
        <button type="button" onClick={() => setShowPass(!showPass)}>
          {showPass ? (
            <Icon
              id="eye"
              className="stroke-black fill-white  absolute top-[20px] right-[18px]"
              size="20"
            />
          ) : (
            <Icon
              id="eye-off"
              className="stroke-black fill-white absolute top-[20px] right-[18px]"
              size="20"
            />
          )}
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
