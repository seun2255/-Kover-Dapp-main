import React, { useState } from "react";
import { UserContext } from "../../App";

interface Search {
  width?: String;
  text?: string;
  onSearch?: (text: any) => void;
}
function SearchField({ width,text,onSearch}: Search) {
  const { theme } = React.useContext(UserContext);
  const [search, setSearch] = useState("");
  const handlerSearch = (e:any)=>{
    setSearch(e.target.value);
    if(onSearch){
      onSearch(e.target.value || '');
    }
  }
    return (
    <div className={`box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white ${width}`}>
      <input
        type="text"
        value={search}
        onChange={(e)=> handlerSearch(e)}
        placeholder= {`${text || "Search..."}`}
        className={`laceholder:text-dark-300 dark:text-dark-400 text-white bg-transparent text-xl min-w-0 max-w-none w-full placeholder:text-[#42434B] dark:dark:placeholder:text-[#42434B]` }
      />
      <button type="button">
        <img src="/images/Mask (3).svg" alt="" className="ml-1 sm:ml-0" />
      </button>
    </div>
  );
}

export default SearchField;
