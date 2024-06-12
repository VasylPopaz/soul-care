export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const { key, target } = e;
  const value = (target as HTMLInputElement).value;

  if (
    !/[0-9]/.test(key) &&
    key !== "Backspace" &&
    key !== "Delete" &&
    key !== "ArrowLeft" &&
    key !== "ArrowRight" &&
    key !== "Tab" &&
    key !== "Home" &&
    key !== "End"
  ) {
    e.preventDefault();
  }

  if (
    value.length >= 9 &&
    key !== "Backspace" &&
    key !== "Delete" &&
    key !== "ArrowLeft" &&
    key !== "ArrowRight" &&
    key !== "Tab" &&
    key !== "Home" &&
    key !== "End"
  ) {
    e.preventDefault();
  }
};
