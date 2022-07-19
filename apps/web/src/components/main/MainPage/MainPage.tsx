import React from "react";
import { Outlet } from "react-router-dom";

import { MainPageProps as Props } from "./MainPage.types";
import Avatar from "components/global/Avatar/Avatar";

const MainPage: React.FC<Props> = props => {
  return (
    <div className="MainPage flex">
      <main className="flex-1 isolate">
        <Outlet />
      </main>
      <aside className="min-h-screen w-[var(--sidebar-width)] bg-stone-900 flex flex-column justify-center py-4 isolate">
        <Avatar />
      </aside>
    </div>
  );
};

MainPage.defaultProps = {};

export default MainPage;
