import React from "react";
import AsideItem from "../asideItem";
import { Path } from "@/navigations/routes";
import TimelineIcon from "@/assets/svgs/timeline.svg";
import TimesIcon from "@/assets/svgs/times.svg";
import ChartBarIcon from "@/assets/svgs/chart-bar.svg";
import LogoutIcon from "@/assets/svgs/logout.svg";
import cs from "classnames";
import { useAuthContext } from "@/context/auth-context";

interface Props {
  isOpen: boolean;
  handleAsideClose: () => void;
}

const Aside = ({ isOpen, handleAsideClose }: Props) => {
  const { handleLogout } = useAuthContext();

  return (
    <>
      <div
        onClick={handleAsideClose}
        className={cs(
          "lg:hidden fixed top-0 z-10 w-full h-full bg-primary/30 dark:bg-dark/30",
          {
            "left-0": isOpen,
            "left-[-100%]": !isOpen,
          }
        )}
      />
      <aside
        className={cs(
          "fixed top-0 lg:left-0 w-[250px] h-full duration-200 z-10 bg-primary/90 lg:bg-primary/10 dark:bg-dark px-4",
          {
            "left-0": isOpen,
            "left-[-100%]": !isOpen,
          }
        )}
      >
        <div className="h-[105px] mb-4 w-full flex flex-row justify-between lg:justify-center gap-2 text-white lg:text-text-grey dark:text-white items-center">
          <div className="flex flex-col lg:items-center">
            <TimelineIcon className="w-[25px] h-[25px]" />
            <h4 className="font-medium">Intelligence Panel</h4>
          </div>
          <button onClick={handleAsideClose} className="lg:hidden">
            <TimesIcon className="w-[20px] h-[20px]" />
          </button>
        </div>
        <div className="space-y-4">
          <AsideItem
            href={Path.Dashboard}
            icon={<ChartBarIcon className="w-[20px] h-[20px] text-white" />}
            label="Dashboard"
          />
          <AsideItem
            href=""
            icon={<LogoutIcon className="w-[20px] h-[20px] text-white" />}
            label="Logout"
            onClick={handleLogout}
            btn
          />
        </div>
      </aside>
    </>
  );
};

export default Aside;
