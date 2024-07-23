import React from 'react'
import TableColumns, { TableColumnsProps } from './TableColumns'
import type { TableOptionsProps } from './TableOptions/TableOptions'
import TableRows, { TableRowsProps } from './TableRows'
import Skeleton from 'react-loading-skeleton'

export interface TableProps
  extends TableOptionsProps,
    TableColumnsProps,
    TableRowsProps {
  tabId?: number
  tabs?: number
  data?: any
  title?: string
}

function TableSkeleton({
  columns,
  rows,
  options,
  tabId,
  tabs,
  data,
  title,
}: TableProps) {
  return (
    <div>
      <TableColumns columns={columns} tableId={tabId} />
      <div className="mb-4">
        <Skeleton containerClassName="flex-1" height={'76px'} />
      </div>
      <div className="mb-4">
        <Skeleton containerClassName="flex-1" height={'76px'} />
      </div>
      <div className="mb-4">
        <Skeleton containerClassName="flex-1" height={'76px'} />
      </div>
    </div>
  )
}

export default TableSkeleton
