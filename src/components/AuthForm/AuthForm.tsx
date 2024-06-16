import { yupResolver } from "@hookform/resolvers/yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";

import { auth } from "../../firebase";
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
    formState: { errors, dirtyFields },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(mode === "signIn" ? signInSchema : signUpSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (date) => {
    console.log(date);
    mode === "signIn"
      ? await signInWithEmailAndPassword(auth, date.email, date.password)
      : await createUserWithEmailAndPassword(auth, date.email, date.password);
    toggleModal();
    reset();
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
