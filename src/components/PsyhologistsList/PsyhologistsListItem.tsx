import { useState } from "react";

import { AppointmentForm, Icon, Modal } from "../../components";

import { Psyhologist } from "../../types";
import { useModal } from "../../hooks";

interface PsyhologistsListItemProps {
  item: Psyhologist;
}

export const PsyhologistsListItem: React.FC<PsyhologistsListItemProps> = ({
  item: {
    name,
    avatar_url,
    rating,
    price_per_hour,
    experience,
    license,
    specialization,
    initial_consultation,
    reviews,
    about,
  },
}) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const [isOpenModal, toggleModal] = useModal();

  const handleReadMoreClick = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <>
      <li className="bg-[#fbfbfb] p-6 rounded-[24px]">
        <div className="flex gap-6">
          <div className="relative shrink-0 w-[120px] h-[120px] p-3 rounded-[30px] border-2 border-[#54be9633]">
            <div className="absolute top-[9px] right-[14px]  w-[14px] h-[14px] rounded-[50%] bg-[#fbfbfb] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:content-[''''] after:inline-block after:h-[9px] after:w-[9px] after:rounded-[50%] after:bg-[#38cd3e]"></div>
            <img
              className="rounded-[15px]"
              src={avatar_url}
              alt={name}
              width={96}
              height={96}
            />
          </div>

          <div className="flex flex-wrap w-full gap-y-6">
            <div className="flex justify-between w-full">
              <div>
                <p className="font-medium text-[16px] text-[#8a8a89] leading-[150%] mb-[8px]">
                  Psychologist
                </p>
                <h2 className="font-medium text-[24px] leading-[100%] text-[#191a15]">
                  {name}
                </h2>
              </div>

              <div className="flex gap-4 font-medium text-[16px] leading-[150%]">
                <div className="flex gap-2">
                  <Icon id="star" className="fill-[#ffc531]" size="22" />
                  <p> Rating: {rating}</p>
                </div>
                <span className="text-[#191a1533]">|</span>
                <div className="flex gap-7 items-start">
                  <p>
                    Price / 1 hour:{" "}
                    <span className="text-[#38cd3e]">{price_per_hour}$</span>
                  </p>
                  <button type="button" className="group">
                    <Icon
                      id="heart"
                      className="fill-transparent stroke-black group-active:text-accentColor group-focus:text-accentColor group-hover:stroke-accentColor transition duration-300"
                      size="26"
                    />
                  </button>
                </div>
              </div>
            </div>

            <ul className="flex flex-wrap gap-x-1 gap-y-2 w-[844px]">
              {[
                { label: "Experience", value: experience },
                { label: "License", value: license },
                { label: "Specialization", value: specialization },
                {
                  label: "Initial_consultation",
                  value: initial_consultation,
                },
              ].map(({ label, value }, index) => (
                <li
                  key={index}
                  className="rounded-[24px] px-[16px] py-[8px] bg-[#f3f3f3]"
                >
                  <p className="font-medium text-[16px] text-[#8a8a89] leading-[150%]">
                    {label}: <span className="text-[#191a15]">{value}</span>
                  </p>
                </li>
              ))}
            </ul>

            <div>
              <p
                className={`text-[16px] text-[#191a157f] leading-[125%] tracking-[-0.01em] ${
                  isReadMore ? "mb-12" : "mb-[14px]"
                }`}
              >
                {about}
              </p>

              {isReadMore ? (
                <div>
                  <ul className="flex flex-col gap-4 mb-10">
                    {reviews.map(({ reviewer, rating, comment }, index) => (
                      <li key={index} className="">
                        <div
                          data-content={reviewer[0]}
                          className={`relative pl-[56px] font-medium text-[16px] leading-[125%] mb-4 before:absolute before:left-0 before:top-0 before:content-[attr(data-content)] before:flex before:justify-center before:items-center before:h-[44px] before:w-[44px] before:rounded-[50%] before:bg-reviewBgColor before:text-accentColor before:font-medium before:text-[20px] before:leading-[100%]`}
                        >
                          <h3 className="mb-1">{reviewer}</h3>
                          <div className="flex gap-2">
                            {" "}
                            <Icon
                              id="star"
                              className="fill-[#ffc531]"
                              size="20"
                            />{" "}
                            <p>
                              {rating.toString().length === 1
                                ? `${rating}.0`
                                : rating}
                            </p>
                          </div>
                        </div>
                        <p className="text-[14px] text-[#191a157f] leading-[125%]">
                          {comment}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="btn-primary px-[32px] py-[14px] font-medium text-[16px] leading-[125%] tracking-[-0.01em]"
                    onClick={toggleModal}
                  >
                    Make an appointment
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="font-medium text-[16px] leading-[150%] underline active:text-accentColor focus:text-accentColor lg:hover:text-accentColor transition duration-300"
                  onClick={handleReadMoreClick}
                >
                  Read more
                </button>
              )}
            </div>
          </div>
        </div>
      </li>
      {isOpenModal && (
        <Modal toggleModal={toggleModal} className="md:pt-14 md:pb-12 md:pr-9">
          <AppointmentForm
            name={name}
            url={avatar_url}
            toggleModal={toggleModal}
          />
        </Modal>
      )}
    </>
  );
};
