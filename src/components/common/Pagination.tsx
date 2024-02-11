import React from "react";
import 'react-modern-drawer/dist/index.css'
import { UserContext } from "../../App";

function Pagination() {
    const { theme } = React.useContext(UserContext);
    return (
        <>
            <div className="my-[30px] flex gap-[10px]">
                <button className="pagination-item previous-btn">{"<"}</button>
                <button className="pagination-item">1</button>
                <button className="pagination-item pagination-btn-active dark:pagination-btn-active-dark">2</button>
                <button className="pagination-item">3</button>
                <button className="pagination-item">4</button>
                <button className="pagination-item">5</button>
                <button className="pagination-item next-btn">{">"}</button>
            </div>
        </>
    );
}
export default Pagination;
