import Icons from "../../assets/sprite.svg";

interface IconProps {
  id: string;
  className: string;
  size: string;
}

export const Icon = ({ id, className, size }: IconProps) => {
  return (
    <svg className={className} height={size} width={size}>
      <use href={Icons + "#icon-" + id}></use>
    </svg>
  );
};
