import { useState } from "react";

import { AuthForm, Modal } from "../../components";

import { useModal } from "../../hooks";

export const AuthNav = () => {
  const [mode, setMode] = useState("");

  const [isOpenModal, toggleModal] = useModal();
  return (
    <>
      <ul className="flex gap-3">
        <li>
          <button
            type="button"
            className="btn py-[8px] lg:py-[14px] px-[20px] lg:px-[40px] bg-transparent border border-[rgba(25, 26, 21, 0.2)] font-medium text-[16px] leading-[125%] tracking-[-0.01em] active:border-accentColor focus:border-accentColor lg:hover:border-accentColor active:text-accentColor focus:text-accentColor lg:hover:text-accentColor"
            onClick={() => {
              setMode("signIn");
              toggleModal();
            }}
          >
            Log In
          </button>
        </li>
        <li>
          <button
            type="button"
            className="btn py-[8px] lg:py-[14px] px-[20px] lg:px-[40px] bg-accentColor text-[#fbfbfb] border-transparent font-medium text-[16px] leading-[125%] tracking-[-0.01em] active:bg-accentHoverColor focus:bg-accentHoverColor lg:hover:bg-accentHoverColor"
            onClick={() => {
              setMode("signUp");
              toggleModal();
            }}
          >
            Registration
          </button>
        </li>
      </ul>
      {isOpenModal && (
        <Modal toggleModal={toggleModal}>
          <AuthForm mode={mode} toggleModal={toggleModal} />
        </Modal>
      )}
    </>
  );
};
