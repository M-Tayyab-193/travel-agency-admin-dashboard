// @ts-nocheck
import React, { useRef } from "react";
import { Link } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import NavItems from "./NavItems";

const MobileSidebar = () => {
  const sidebarRef = useRef<SidebarComponent>(null);

  const toggleSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.toggle();
    }
  };

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            className="size-[30px]"
          />
          <h1>Tourvisto</h1>
        </Link>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
        >
          <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
        </button>
      </header>

      <SidebarComponent
        width={270}
        ref={sidebarRef}
        created={() => sidebarRef.current?.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="Over"
      >
        <NavItems toggleSidebar={toggleSidebar} />
      </SidebarComponent>
    </div>
  );
};

export default MobileSidebar;
