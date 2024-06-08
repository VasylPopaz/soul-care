import { useNavigate } from "react-router-dom";

import { Icon } from "../../components";

import woman1x from "../../assets/images/woman1x.jpg";
import woman2x from "../../assets/images/woman2x.jpg";

const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="lg:h-[85vh] md:pt-[48px] lg:pt-[78px] md:pb-[40px] lg:pb-[100px] bg-gradient-to-r from-firstGradColor to-secondGradColor">
      <div className="container flex md:flex-col md:gap-[40px] lg:flex-row lg:gap-[125px] items-center">
        <div className="lg:text-left">
          <h1 className="font-semibold text-[80px] leading-[102%] tracking-[-0.02em] mb-[20px]">
            The road to the{" "}
            <span className="text-accentColor italic">depths</span> of the human
            soul
          </h1>
          <p className="w-[510px] font-medium text-[18px] leading-[133%] tracking-[-0.02em] mb-[40px]">
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
          <button
            type="button"
            className="flex items-center gap-[18px] btn py-[18px] px-[50px] bg-accentColor border-transparent text-[20px] text-[#fbfbfb] leading-[120%] tracking-[-0.01em]  active:bg-accentHoverColor focus:bg-accentHoverColor lg:hover:bg-accentHoverColor"
            onClick={() => navigate("/psyhologists")}
          >
            Get started
            <Icon id="arrow" className="fill-[#fbfbfb]" size="17" />
          </button>
        </div>
        <div className="relative">
          <div className="flex justify-center items-center absolute top-[190px] left-[-35px] w-[40px] h-[40px] bg-[#4535AF] rounded-[10px] rotate-[-15deg]">
            <Icon
              className="fill-[#fbfbfb] rotate-[15deg]"
              id="quest"
              size="15"
            />
          </div>
          <div className="flex justify-center items-center absolute top-[44px] right-[-38px] w-[48px] h-[48px] bg-[#FBC75E] rounded-[10px] rotate-[15deg]">
            <Icon
              className="fill-[#fbfbfb] rotate-[-15deg]"
              id="people"
              size="17"
            />
          </div>
          <div className="flex justify-center items-center gap-4 absolute bottom-[75px] left-[-101px]  w-[311px] h-[118px] bg-accentColor rounded-[20px]">
            <div className="flex justify-center items-center w-[54px] h-[54px] bg-[#fbfbfb] rounded-[13px]">
              <Icon className="fill-accentColor" id="check" size="17" />
            </div>
            <div>
              <p className="text-[14px] text-[#a7dcc8]">
                Experienced psychologists
              </p>
              <p className="font-bold text-[24px] text-[#fbfbfb]">15,000</p>
            </div>
          </div>

          <img
            srcSet={`${woman1x} 1x, ${woman2x} 2x`}
            src={woman1x}
            alt="Woman"
            width={464}
            height={526}
            className="max-w-none md:w-[540px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
