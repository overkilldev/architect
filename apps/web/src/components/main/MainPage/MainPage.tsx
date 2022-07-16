import React from "react";
import { Outlet } from "react-router-dom";

import { MainPageProps as Props } from "./MainPage.types";

const MainPage: React.FC<Props> = props => {
  return (
    <div className="MainPage flex">
      <main className="flex-1">
        <Outlet />
      </main>
      <aside className="min-h-screen w-[var(--sidebar-width)] bg-stone-900"></aside>
    </div>
  );
};

MainPage.defaultProps = {};

export default MainPage;
