import React, { ReactNode } from "react";
import cs from "classnames";

export type BtnVariantType = "primary" | "secondary";
export type BtnSizeType = "normal" | "small" | "x-small" | "large";
export type BtnRadiusType = "normal" | "full" | "bottom-right";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariantType;
  loading?: boolean;
  label: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: BtnSizeType;
  radius?: BtnRadiusType;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

const Button = ({
  className,
  fullWidth,
  disabled,
  loading,
  variant = "primary",
  type = "button",
  size = "normal",
  label,
  icon,
  radius = "normal",
  iconRight,
  ...props
}: Props) => {
  return (
    <button
      className={cs(
        "flex items-center gap-2 justify-center font-semibold hover:bg-opacity-[90%] text-center duration-150",
        {
          [`${className}`]: className,
          "bg-primary dark:bg-grey-light text-white border shadow-md shadow-primary/60 border-primary dark:border-grey-light focus:outline-[2px] focus:outline-offset-[1px] focus:outline-primary/60 dark:focus:outline-grey-light/60":
            variant === "primary",
          "bg-secondary-1 text-primary border shadow-md shadow-secondary-1/60 border-secondary-1 focus:outline-[2px] focus:outline-offset-[1px] focus:outline-secondary-1/60":
            variant === "secondary",
          "py-[14px] px-[30px] text-[18px]": size === "large",
          "py-[10px] px-[25px]": size === "normal",
          "py-[8px] px-[20px] text-[14px]": size === "small",
          "py-[5px] px-[16px] text-[12px]": size === "x-small",
          "w-full block": fullWidth,
          "opacity-[70%] cursor-not-allowed": disabled || loading,
          "rounded-lg": radius === "normal",
          "rounded-full": radius === "full",
          "rounded-br-3xl": radius === "bottom-right",
        }
      )}
      disabled={disabled || loading}
      {...props}
      type={type}
    >
      {icon}
      {label && (
        <span>
          {loading && "Loading..."}
          {!loading && label}
        </span>
      )}
      {iconRight}
    </button>
  );
};

export default Button;
