import { Watch } from "react-loader-spinner";

export const Loader = () => {
  const root = document.documentElement;
  const accentColor = getComputedStyle(root).getPropertyValue("--accent-color");
  return (
    <div className="flex items-center justify-center fixed bg-[#191a1599] w-full h-full  left-0 top-0 z-50">
      <Watch
        visible={true}
        height="80"
        width="80"
        radius="48"
        color={accentColor}
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
