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
            className="btn-secondary py-[8px] lg:py-[14px] px-[20px] lg:px-[40px] font-medium text-[16px] leading-[125%] tracking-[-0.01em] "
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
            className="btn-primary py-[8px] lg:py-[14px] px-[20px] lg:px-[40px] font-medium text-[16px] leading-[125%] tracking-[-0.01em]"
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
