import ReactDOM from "react-dom";

import { Icon } from "../../components";

import { useEscapeKeyClose } from "../../hooks";
import { handleClickOnBackdrop } from "../../helpers";

interface ModalProps {
  className?: string;
  children: React.ReactNode;
  toggleModal: () => void;
}

const modalRoot = document.querySelector("#modalRoot")!;

export const Modal = ({ className, children, toggleModal }: ModalProps) => {
  useEscapeKeyClose(toggleModal);

  return ReactDOM.createPortal(
    <div
      className="flex items-center justify-center fixed bg-[#191a15] bg-opacity-60 w-full h-full  left-0 top-0 z-50"
      onClick={(e) => handleClickOnBackdrop(toggleModal, e)}
    >
      <div
        className={`relative rounded-[30px] bg-[#FBFBFB] p-8 md:p-12 sm-max:max-w-[300px] max-w-[330px] md:max-w-[700px] lg:max-w-[1180px] max-h-[95%] ${className}`}
      >
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
