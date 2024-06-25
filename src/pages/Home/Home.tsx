import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Icon } from "../../components";

import woman1x from "../../assets/images/woman1x.webp";
import woman2x from "../../assets/images/woman2x.webp";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add(
      "bg-gradient-to-r",
      "from-firstGradColor",
      "to-secondGradColor"
    );
    return () => {
      document.body.classList.remove(
        "bg-gradient-to-r",
        "from-firstGradColor",
        "to-secondGradColor"
      );
    };
  }, []);

  return (
    <section className="lg:h-[85vh] py-8 md:pt-[48px] lg:pt-[78px] md:pb-[40px] lg:pb-[100px]">
      <div className="container flex flex-col gap-4 md:flex-row md:gap-[10px] lg:gap-[125px] items-center">
        <div className="lg:text-left">
          <h1 className="font-semibold text-[32px] md:text-[48px] lg:text-[80px] leading-[102%] tracking-[-0.02em] mb-[20px]">
            The road to the{" "}
            <span className="text-accentColor italic">depths</span> of the human
            soul
          </h1>
          <p className="md:w-[400px] lg:w-[510px] font-medium text-[14px] md:text-[16px] lg:text-[18px] leading-[133%] tracking-[-0.02em] mb-[30px] md:mb-10">
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
          <button
            type="button"
            className="btn-primary flex items-center gap-[18px] py-[18px] px-[50px] md:text-[16px] lg:text-[20px] leading-[120%] tracking-[-0.01em]"
            onClick={() => navigate("/psychologists")}
          >
            Get started
            <Icon id="arrow" className="fill-[#fbfbfb]" size="17" />
          </button>
        </div>
        <div className="relative">
          <div className="flex justify-center items-center absolute top-[140px] lg:top-[190px] left-[-10px] md:left-[-35px] w-9 h-9 lg:w-[40px] lg:h-[40px] bg-iconBgColor rounded-[10px] rotate-[-15deg]">
            <Icon
              className="fill-[#fbfbfb] rotate-[15deg]"
              id="quest"
              size="15"
            />
          </div>
          <div className="flex justify-center items-center absolute top-[44px] right-[-10px] md:right-[-18px] w-10 h-10 lg:w-[48px] lg:h-[48px] bg-[#FBC75E] rounded-[10px] rotate-[15deg]">
            <Icon
              className="fill-[#fbfbfb] rotate-[-15deg]"
              id="people"
              size="17"
            />
          </div>
          <div className="flex justify-center items-center gap-4 absolute bottom-[40px] md:bottom-[10px] lg:bottom-[75px] left-[-10px] md:left-[-60px] lg:left-[-101px] w-[250px] h-[70px] md:w-[270px] md:h-[80px] lg:w-[311px] lg:h-[118px] bg-accentColor rounded-[20px]">
            <div className="flex justify-center items-center w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[54px] lg:h-[54px] bg-[#fbfbfb] rounded-[13px]">
              <Icon className="fill-accentColor" id="check" size="17" />
            </div>
            <div>
              <p className="text-[14px] text-[#fbfbfb7f]">
                Experienced psychologists
              </p>
              <p className="font-bold md:text-[18px] lg:text-[24px] text-[#fbfbfb]">
                15,000
              </p>
            </div>
          </div>

          <img
            srcSet={`${woman1x} 1x, ${woman2x} 2x`}
            src={woman1x}
            alt="Woman"
            width={464}
            height={526}
            className="sm-max:w-[280px] w-[339px] md:w-[290px] lg:w-[526px] lg:max-w-[65vh] rounded-[10px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
