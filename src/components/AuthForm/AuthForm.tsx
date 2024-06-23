import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

import { InputField } from "../../components";

import { signInUser, signUpUser } from "../../api";
import { signInSchema, signUpSchema } from "../../schemas";

interface FormData {
  name?: string;
  email: string;
  password: string;
}

interface AuthFormProps {
  mode: string;
  onSignUpSuccess?: (name: string) => void;
  toggleModal: () => void;
}

export const AuthForm = ({
  mode,
  onSignUpSuccess,
  toggleModal,
}: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(mode === "signIn" ? signInSchema : signUpSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async ({
    name,
    email,
    password,
  }) => {
    try {
      if (mode === "signIn") {
        await signInUser(email, password);
        toast.info("Welcome back!");
      } else {
        onSignUpSuccess && onSignUpSuccess(name ?? "");
        await signUpUser(name ?? "", password, email);
        toast.info("User registered successfully!");
      }
      toggleModal();
      reset();
    } catch (error) {
      toast.error(error instanceof Error && error.message);
    }
  };

  return (
    <>
      <h2 className="title">{mode === "signIn" ? "Log In" : "Registration"}</h2>
      <p className="description w-[260px] md:w-[400px] lg:w-[438px]">
        {mode === "signIn"
          ? "Welcome back! Please enter your credentials to access your account and        continue your search for a psychologist."
          : "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information."}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {mode === "signUp" ? (
          <InputField
            divClass="mb-[18px]"
            placeholder="Name"
            name="name"
            type="text"
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            dirtyFields={dirtyFields}
          />
        ) : null}
        <InputField
          divClass="mb-[18px]"
          placeholder="Email"
          name="email"
          type="text"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
          dirtyFields={dirtyFields}
        />
        <InputField
          divClass="mb-6 md:mb-10"
          className="pr-[40px]"
          placeholder="Password"
          name="password"
          type="password"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
          dirtyFields={dirtyFields}
        />
        <button type="submit" className="btn-primary w-full p-4">
          {mode === "signIn" ? "Log In" : "Sign Up"}
        </button>
      </form>
    </>
  );
};
