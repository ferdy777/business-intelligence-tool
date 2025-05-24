import { useId } from "react";
import cs from "classnames";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

const FormCheckbox = ({ label, name, disabled, ...otherProps }: Props) => {
  const id2 = useId();
  return (
    <div className="mb-5">
      <div className="relative w-full flex items-center gap-3">
        <input
          {...otherProps}
          name={name}
          id={id2 || name}
          type="checkbox"
          disabled={disabled}
          className={cs(
            "w-[20px] h-[20px] checked:after:text-purple-base after:absolute dark:checked:after:text-white checked:after:content-['✔'] relative after:rounded-full after:top-[50%] after:left-[50%]",
            "after:translate-x-[-50%] after:translate-y-[-50%] appearance-none checked:border-purple-base/80",
            "focus:outline-[4px] outline-offset-0 text-[14px] dark:bg-grey-light font-raleway placeholder:font-raleway duration-100 border border-primary/30 dark:border-grey-light/30 rounded",
            {
              "focus:outline-purple-base/10 focus:border-purple-base/60": true,
              "opacity-60 cursor-not-allowed": disabled,
            }
          )}
        />
        {label && (
          <label
            className={cs(
              "text-text-grey dark:text-white font-medium block text-[14px]",
              {
                "opacity-60 cursor-not-allowed": disabled,
                "cursor-pointer": !disabled,
              }
            )}
            htmlFor={id2 || name}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default FormCheckbox;
