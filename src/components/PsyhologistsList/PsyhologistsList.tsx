import { PsyhologistsListItem } from "./PsyhologistsListItem";

import { PsyhologistsListProps } from "../../types";

export const PsyhologistsList: React.FC<PsyhologistsListProps> = ({
  psyhologists,
  params: { page, limit },
}) => {
  return (
    <ul className="flex flex-wrap gap-[32px] md:justify-center md:w-[704px] lg:w-full mb-12 lg:mb-16">
      {psyhologists.map(
        (item, index) =>
          index < page * limit && (
            <PsyhologistsListItem key={index} item={item} />
          )
      )}
    </ul>
  );
};
