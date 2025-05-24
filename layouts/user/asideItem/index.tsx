import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  href: string;
  label: string;
  icon: ReactNode;
  btn?: boolean;
  onClick?: () => void;
}

const AsideItem = ({ href, icon, label, btn, onClick }: Props) => {
  return (
    <>
      {btn && (
        <button
          onClick={onClick}
          className="flex items-center w-full gap-3 border bg-primary dark:bg-grey-light rounded-lg shadow-lg text-white py-2 px-4 border-primary"
        >
          <div>{icon}</div>
          <p>{label}</p>
        </button>
      )}
      {!btn && (
        <Link
          href={href}
          className="flex items-center gap-3 border bg-primary dark:bg-grey-light rounded-lg shadow-lg text-white py-2 px-4 border-primary"
        >
          <div>{icon}</div>
          <p>{label}</p>
        </Link>
      )}
    </>
  );
};

export default AsideItem;
