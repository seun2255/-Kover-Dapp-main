import { Link, useLocation } from "react-router-dom";
import React from "react";
import pages from "./pages.json";
import { UserContext } from "../../../../App";
import useWindowDimensions from "../../../global/UserInform/useWindowDimensions";

function Pages() {
  const location = useLocation();
  const path = location.pathname;
  const { theme } = React.useContext(UserContext);
  const { width } = useWindowDimensions();
  return (
    <ul className={`list-none flex-col gap-[1px] flex ${width > 699 ? "mt-[85px]" : "mt-[35px]"}`}>
      {pages.map(({ id, icon, url, name }, index) => {
        const current = index === 0 ? url === path : path.indexOf(url) >= 0;
        return (
          <>
            <li key={id} className="">
              <Link to={url}
                className={`flex py-[18px] px-[40px] hover:no-underline items-center gap-3.5
                group uppercase dark:hover:side-selected-tab-light hover:side-selected-tab-dark
                ${current ? `${theme === 'dark' ? "dark:side-selected-tab-light " : "side-selected-tab-dark"}` : "menu-tag"}`}>

                {current === false &&
                  <img src={theme === "dark" ? icon[1] : icon[1]} className="group-hover:hidden" alt="" />}
                  <img src={theme === "dark" ? icon[0] : icon[0]} className={`svg-light-grey group-hover:block ${current ? "block" : "hidden "}`} alt="" /> 

                {name}
              </Link>
            </li>
          </>
        );
      })}
    </ul>
  );
}
export default Pages;
