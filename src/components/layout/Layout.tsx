import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { Scrollbars } from "react-custom-scrollbars-2";
function Layout() {
  return (
    <>
      <Navbar/>
          <div className="mx-[15px] layout-side-width" >
            <div className="layout-left-margin relative lg:mr-[50px]">
              <div className="max-w-[600px]:layout-space">
              <Outlet />
              </div>
            </div>
          </div>
    </>
  );
}
export default Layout;