import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { Icon } from "../../components";

interface InputProps {
  className?: string;
  label?: string;
  name: string;
  type?: "text" | "number" | "password";
  placeholder: string;
  defaultValue?: string | number;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const InputField = ({
  label,
  className,
  name,
  placeholder,
  type = "text",
  defaultValue = "",
  register,
}: InputProps) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <div className="relative ">
        <input
          id={name}
          {...register(name)}
          type={showPass ? "text" : type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`px-[18px] py-4 rounded-[12px] border border-[rgb(25, 26, 21] border-opacity-10 outline-none w-full hover:border-accentColor focus:border-accentColor placeholder:text-[#191a15] transition duration-300 ${className}`}
          autoComplete="on"
        />
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
      </div>
    </>
  );
};
