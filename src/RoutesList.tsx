import React from "react";
import { Link } from "react-router-dom";
import { routes } from "./App";

function RoutesList() {
  return (
    <div className="p-10">
      <h2 className="text-[40px] leading-none mb-10 mx-3">Routes Root</h2>
      <div className="grid grid-cols-2 w-max gap-x-10 gap-y-4 uppercase">
        {routes.map(({ route, id }) => (
          <div key={id}>
            <Link className="hover:bg-dark-75 py-2 px-3 block hover:no-underline" to={`/${route}`}>
              {route}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoutesList;
