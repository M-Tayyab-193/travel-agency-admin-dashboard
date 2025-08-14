import React from "react";
import { Outlet } from "react-router";

const adminLayout = () => {
  return (
    <div className="children">
      <aside className="hidden lg:block">Admin Layout</aside>
      <Outlet />
    </div>
  );
};

export default adminLayout;
