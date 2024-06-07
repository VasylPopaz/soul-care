import ReactDOM from "react-dom";

import { Icon } from "../../components";

import { useEscapeKeyClose } from "../../hooks";

interface ModalProps {
  children: React.ReactNode;
  toggleModal: () => void;
}

const modalRoot = document.querySelector("#modalRoot")!;

export const Modal = ({ children, toggleModal }: ModalProps) => {
  useEscapeKeyClose(toggleModal);

  const handleClickOnBackdrop = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="flex items-center justify-center fixed bg-[#191a15] bg-opacity-60 w-full h-full left-0 top-0 z-50"
      onClick={handleClickOnBackdrop}
    >
      <div className="relative rounded-[30px] bg-[#FBFBFB] p-16">
        <button
          type="button"
          onClick={toggleModal}
          className="absolute top-7 right-7"
        >
          <Icon id="close" className="stroke-[#191A15]" size="28" />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
