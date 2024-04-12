'use client'

import { useEffect, useState } from 'react'

import TanstackReactTable from '@/@core/components/tanstack-react-table'
import { columns } from './Column'

export type DataGridRowType = {
  id: string
  product: string
  email: string
  status: string
}

const dummyData: DataGridRowType[] = [
  {
    id: '1',
    product: 'Agami-Tech Pvt Ltd',
    email: 'amit.vishwakarma@agami-tech.com',
    status: 'verified'
  },
  {
    id: '2',
    product: 'Agami-Tech Pvt Ltd',
    email: 'parth.patel@agami-tech.com',
    status: 'pending'
  },
  {
    id: '3',
    product: 'Agami-Tech Pvt Ltd',
    email: 'piyush.goel@agami-tech.com',
    status: 'verified'
  },
  {
    id: '4',
    product: 'Agami-Tech Pvt Ltd',
    email: 'ramesh.jha@agami-tech.com',
    status: 'verified'
  },
  {
    id: '5',
    product: 'Agami-Tech Pvt Ltd',
    email: 'amit.sharma@agami-tech.com',
    status: 'pending'
  },
  {
    id: '6',
    product: 'Agami-Tech Pvt Ltd',
    email: 'aman.singh@agami-tech.com',
    status: 'verified'
  },
  {
    id: '7',
    product: 'Agami-Tech Pvt Ltd',
    email: 'arti.desai@agami-tech.com',
    status: 'pending'
  }
]

const Table = () => {
  const [isFormsLoading, setIsFormLoading] = useState(false)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })
  const [total, setTotal] = useState<number>(0)
  const [rows, setRows] = useState<DataGridRowType[]>([])

  useEffect(() => {
    const filteredData = dummyData.filter(row => row.email.toLowerCase())
    const startIndex = pagination.pageIndex * pagination.pageSize
    const slicedData = filteredData.slice(startIndex, startIndex + pagination.pageSize)

    setRows(slicedData)
    setTotal(filteredData.length)
  }, [pagination])

  return (
    <>
      <TanstackReactTable
        loading={isFormsLoading}
        columns={columns}
        data={rows}
        dataCount={total}
        responsiveTable={true}
        enablePagination={true}
        manualPagination={true}
        pagination={pagination}
        setPagination={setPagination}
        enableColumnFilters={false}
        enableColumnsVisiblity={true}
      />
    </>
  )
}

export default Table
