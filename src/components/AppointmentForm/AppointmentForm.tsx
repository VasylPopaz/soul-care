import {
  Controller,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

import { InputField } from "../../components";

import { useUser } from "../../hooks";
import { appointmentSchema } from "../../schemas";
import { createAppointment, createAppointmentWithoutSignIn } from "../../api";

interface FormData {
  psychologist?: {
    id: string;
    name: string;
  };
  name: string;
  phone: string;
  email: string;
  time: Date;
  comment: string;
}

interface AppointmentFormProps {
  id: string;
  name: string;
  avatar_url: string;
  toggleModal: () => void;
}

export const AppointmentForm = ({
  id,
  name,
  avatar_url,
  toggleModal,
}: AppointmentFormProps) => {
  const { currentUser } = useUser();

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
    const appointmentData = {
      ...data,
      phone: `+380${data.phone}`,
      time: data.time.toISOString(),
      psychologist: { id, name },
    };

    if (currentUser) {
      createAppointment(currentUser.uid, appointmentData)
        .then(() => {
          toast.info("Appointment created successfully!");
          toggleModal();
          reset();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      createAppointmentWithoutSignIn(nanoid(), appointmentData)
        .then(() => {
          toast.info("Appointment created successfully!");
          toggleModal();
          reset();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="scrollbar max-h-[73vh] md:max-h-[80vh] pr-[8px] md:pr-3 lg:pr-[22px]">
      <h2 className="title w-full md:w-[400px]">
        Make an appointment with a psychologists
      </h2>
      <p className="description w-full md:w-[472px]">
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>
      <div className="flex gap-[14px] mb-6 lg:mb-10">
        <img
          src={avatar_url}
          alt={name}
          width={44}
          height={44}
          className="rounded-[15px]"
        />
        <div className="flex flex-col justify-between">
          <p className="font-medium text-[12px] text-secTextColor leading-[133%]">
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
          dirtyFields={dirtyFields as Record<string, boolean>}
        />
        <div className="flex flex-col md:flex-row gap-[18px] md:gap-2 w-full md:w-[472px] mb-[18px]">
          <InputField
            divClass="md:w-[232px]"
            className="pl-[60px]"
            name="phone"
            placeholder=""
            type="tel"
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            dirtyFields={dirtyFields as Record<string, boolean>}
          />
          <Controller
            name="time"
            control={control}
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => (
              <InputField
                divClass="md:w-[232px]"
                tag="datepicker"
                name="time"
                placeholder=""
                register={register as unknown as UseFormRegister<FieldValues>}
                value={value}
                onChange={onChange}
                errors={errors}
                dirtyFields={dirtyFields as Record<string, boolean>}
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
          dirtyFields={dirtyFields as Record<string, boolean>}
        />
        <InputField
          tag="textarea"
          divClass="mb-6 lg:mb-10"
          name="comment"
          placeholder="Comment"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
          dirtyFields={dirtyFields as Record<string, boolean>}
        />
        <button type="submit" className="btn-primary p-4 w-full">
          Send
        </button>
      </form>
    </div>
  );
};
