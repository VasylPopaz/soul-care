import Icons from "../../assets/sprite.svg";

interface IconProps {
  id: string;
  className: string;
  size: string;
  onClick?: React.MouseEventHandler<SVGElement>;
}

export const Icon = ({ id, size, ...rest }: IconProps) => {
  return (
    <svg height={size} width={size} {...rest}>
      <use href={Icons + "#icon-" + id}></use>
    </svg>
  );
};
