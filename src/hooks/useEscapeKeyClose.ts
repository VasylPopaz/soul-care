import { useEffect } from "react";

export const useEscapeKeyClose = (isOpen: boolean, toggleModal: () => void) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent): void => {
      if (e.code === "Escape") {
        toggleModal();
      }
    };
    console.log("hidden");
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      console.log("auto");
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, toggleModal]);
};
