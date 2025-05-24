import React, { ReactNode } from "react";
import HamburgerIcon from "@/assets/svgs/hamburger.svg";
import Container from "@/components/common/container";
import ThemeToggle from "@/components/common/themeToggle";

interface Props {
  children?: ReactNode;
  handleAsideOpen: () => void;
}

const Main = ({ children, handleAsideOpen }: Props) => {
  return (
    <main className="lg:ml-[250px] pb-20">
      <header className="h-[70px] md:h-[105px] mb-4 flex items-center">
        <Container>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button className="lg:hidden" onClick={handleAsideOpen}>
                <HamburgerIcon className="w-[20px] h-[20px]" />
              </button>
              <h3 className="font-semibold text-2xl">Dashboard</h3>
            </div>
            <ThemeToggle />
          </div>
        </Container>
      </header>
      {children}
    </main>
  );
};

export default Main;
