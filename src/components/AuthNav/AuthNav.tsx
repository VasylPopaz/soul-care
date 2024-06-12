import { useState } from "react";

import { AuthForm, Modal } from "../../components";

import { useModal } from "../../hooks";
import { useMobileMenuContext } from "../../context";

export const AuthNav = () => {
  const isMobileMenu = useMobileMenuContext();
  const [mode, setMode] = useState("");

  const [isOpenModal, toggleModal] = useModal();
  return (
    <>
      <ul
        className={`${
          isMobileMenu
            ? "flex flex-col items-center gap-4"
            : "hidden lg:flex gap-3"
        } `}
      >
        <li className={`${isMobileMenu ? "w-full" : ""}`}>
          <button
            type="button"
            className={`btn-secondary py-[8px] lg:py-[14px] px-[20px] lg:px-[40px] font-medium text-[16px] leading-[125%] tracking-[-0.01em] ${
              isMobileMenu ? "w-full" : ""
            }`}
            onClick={() => {
              setMode("signIn");
              toggleModal();
            }}
          >
            Log In
          </button>
        </li>
        <li className={`${isMobileMenu ? "w-full" : ""}`}>
          <button
            type="button"
            className={`btn-primary py-[8px] lg:py-[14px] px-[20px] lg:px-[40px] font-medium text-[16px] leading-[125%] tracking-[-0.01em] ${
              isMobileMenu ? "w-full" : ""
            }`}
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
