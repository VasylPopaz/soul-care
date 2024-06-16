export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const { key, target } = e;
  const value = (target as HTMLInputElement).value;
  const allowedKeys = new Set([
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Home",
    "End",
  ]);

  if (
    (!/[0-9]/.test(key) && !allowedKeys.has(key)) ||
    (value.length >= 9 && !allowedKeys.has(key))
  ) {
    e.preventDefault();
  }
};
