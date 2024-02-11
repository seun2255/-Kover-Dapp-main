import React from "react";
import TableColumns, { TableColumnsProps } from "./TableColumns";
import type { TableOptionsProps } from "./TableOptions/TableOptions";
import TableRows, { TableRowsProps } from "./TableRows";

export interface TableProps extends TableOptionsProps, TableColumnsProps, TableRowsProps {
  tabId?: number;
  tabs?: number;
}

function Table({ columns, rows, options, tabId,tabs}: TableProps) {
  return (
    <div>
      <TableColumns columns={columns} tableId={tabId} />
      <TableRows columns={columns} rows={rows} options={options} tableId={tabId} tabs={tabs}/>
    </div> 
  );
}

export default Table;
