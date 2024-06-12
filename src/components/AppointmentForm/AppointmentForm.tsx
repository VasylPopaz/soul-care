import {
  Controller,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputField } from "../../components";

import { appointmentSchema } from "../../schemas";

interface FormData {
  name: string;
  phone: string;
  email: string;
  time: Date;
  comment: string;
}

interface AppointmentFormProps {
  name: string;
  url: string;
  toggleModal: () => void;
}

export const AppointmentForm = ({
  name,
  url,
  toggleModal,
}: AppointmentFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(appointmentSchema),
    defaultValues: {
      time: new Date(),
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    data.phone = `+380${data.phone}`;
    console.log(data);
    toggleModal();
    reset();
  };

  return (
    <div className="scrollbar h-[85vh] pr-[10px] md:pr-3">
      <h2 className="title  w-full md:w-[400px]">
        Make an appointment with a psychologists
      </h2>
      <p className="description w-full md:w-[472px]">
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>
      <div className="flex gap-[14px] mb-10">
        <img
          src={url}
          alt={name}
          width={44}
          height={44}
          className="rounded-[15px]"
        />
        <div className="flex flex-col justify-between">
          <p className="font-medium text-[12px] text-[#8a8a89] leading-[133%]">
            Your psychologists
          </p>
          <h3 className="font-medium text-[16px] leading-[150%]">{name}</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          divClass="mb-[18px]"
          name="name"
          placeholder="Name"
          type="text"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
          dirtyFields={dirtyFields}
        />
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-[472px] mb-[18px]">
          <InputField
            className="pl-[60px]"
            name="phone"
            placeholder=""
            type="tel"
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            dirtyFields={dirtyFields}
          />
          <Controller
            name="time"
            control={control}
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => (
              <InputField
                tag="datepicker"
                name="time"
                placeholder=""
                register={register as unknown as UseFormRegister<FieldValues>}
                value={value}
                onChange={onChange}
                errors={errors}
                dirtyFields={dirtyFields}
              />
            )}
          />
        </div>
        <InputField
          divClass="mb-[18px]"
          name="email"
          placeholder="Email"
          type="text"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
          dirtyFields={dirtyFields}
        />
        <InputField
          tag="textarea"
          divClass="mb-10"
          name="comment"
          placeholder="Comment"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
          dirtyFields={dirtyFields}
        />
        <button type="submit" className="btn-primary p-4 w-full">
          Send
        </button>
      </form>
    </div>
  );
};
