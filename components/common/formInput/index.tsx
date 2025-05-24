import React, { useState } from "react";
import cs from "classnames";
import EyeIcon from "@/assets/svgs/eye.svg";
import EyeSlashIcon from "@/assets/svgs/eye-slash.svg";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  showMargin?: boolean;
}

const FormInput = ({
  label,
  name,
  id,
  type = "text",
  disabled,
  showMargin = true,
  ...otherProps
}: Props) => {
  const [inputType, setInputType] = useState(type);

  const handlePasswordShow = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const isInvalid = false;

  return (
    <div className={cs({ "mb-5": showMargin })}>
      <div className="relative w-full">
        {label && (
          <label
            className={cs(
              "text-text-grey dark:text-white font-medium block text-[14px]",
              {
                "opacity-60 cursor-not-allowed": disabled,
              }
            )}
            htmlFor={id || name}
          >
            {label}
          </label>
        )}
        <input
          {...otherProps}
          name={name}
          id={id || name}
          type={inputType}
          disabled={disabled}
          className={cs(
            "w-full mt-1 outline-offset-0 dark:bg-grey-light/60 text-[14px] text-text-grey dark:text-white font-raleway placeholder:font-raleway duration-100 focus:outline px-4 py-3 border border-primary/30 dark:border-grey-light/30 rounded-lg",
            {
              "focus:!outline-error/10 focus:!bg-error/5 !border-error/60":
                isInvalid,
              "focus:!outline-primary/10 dark:focus:!outline-white/10 focus:!bg-primary/5  focus:!border-primary/60":
                !isInvalid,
              "opacity-70 cursor-not-allowed": disabled,
              "!pr-12": type === "password",
            }
          )}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={handlePasswordShow}
            disabled={disabled}
            className={cs(
              "absolute right-2 bottom-[7px] focus:outline focus:outline-purple-base/10 bg-text-color-50 text-grey-text text-[11px] px-3 py-2 rounded-lg",
              {
                "opacity-60 cursor-not-allowed": disabled,
              }
            )}
          >
            {inputType === "password" && (
              <span>
                <EyeSlashIcon className="w-[14px] h-[14px] text-text-grey" />
              </span>
            )}
            {inputType === "text" && (
              <span>
                <EyeIcon className="w-[14px] h-[14px] text-text-grey" />
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;
