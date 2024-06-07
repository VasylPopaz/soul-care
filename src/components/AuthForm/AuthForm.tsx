import { yupResolver } from "@hookform/resolvers/yup";

import {
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";

import { InputField } from "../../components";

import { signInSchema, signUpSchema } from "../../schemas";

interface FormData {
  name?: string;
  email: string;
  password: string;
}

interface AuthFormProps {
  mode: string;
  toggleModal: () => void;
}

export const AuthForm = ({ mode, toggleModal }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(mode === "signIn" ? signInSchema : signUpSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (date) => {
    console.log(date);
    toggleModal();
    reset();
  };

  return (
    <>
      <h2 className="font-medium text-[40px] leading-[120%] tracking-[-0.02em] mb-5">
        {mode === "signIn" ? "Log In" : "Registration"}
      </h2>
      <p className="w-[438px] text-[16px] text-[rgb(25, 26, 21)] opacity-50 leading-[125%] mb-10">
        {mode === "signIn"
          ? "Welcome back! Please enter your credentials to access your account and        continue your search for a psychologist."
          : "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information."}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {mode === "signUp" ? (
          <InputField
            className="mb-[18px]"
            placeholder="Name"
            name="name"
            type="text"
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
          />
        ) : null}
        <InputField
          className="mb-[18px]"
          placeholder="Email"
          name="email"
          type="text"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
        />
        <InputField
          className="mb-10 pr-[40px]"
          placeholder="Password"
          name="password"
          type="password"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
        />
        <button
          type="submit"
          className="btn w-full py-4 px-[196px] bg-accentColor text-[#fbfbfb] active:bg-[#36a379] focus:bg-[#36a379] lg:hover:bg-[#36a379]"
        >
          {mode === "signIn" ? "Log In" : "Sign Up"}
        </button>
      </form>
    </>
  );
};
