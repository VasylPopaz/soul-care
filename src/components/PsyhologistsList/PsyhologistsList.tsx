import { PsyhologistsListItem } from "./PsyhologistsListItem";

import { PsyhologistsListProps } from "../../types";

export const PsyhologistsList: React.FC<PsyhologistsListProps> = ({
  psyhologists,
}) => {
  return (
    <ul className="flex flex-wrap gap-[32px]">
      {psyhologists.map((item, index) => (
        <PsyhologistsListItem key={index} item={item} />
      ))}
    </ul>
  );
};
