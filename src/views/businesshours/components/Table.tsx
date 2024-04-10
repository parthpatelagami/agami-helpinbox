'use client'

import { useEffect, useState } from 'react'

import { TextField } from '@mui/material'

import TanstackReactTable from '@/@core/components/tanstack-react-table'
import { columns } from './Column'

export type DataGridRowType = {
  id: string
  title: string
}

const dummyData: DataGridRowType[] = [
  {
    id: '1',
    title:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
  },
  {
    id: '2',
    title:
      'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
  },
  {
    id: '3',
    title:
      'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
  },
  {
    id: '4',
    title:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
  },
  {
    id: '5',
    title:
      'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'
  },
  {
    id: '6',
    title:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.'
  },
  {
    id: '7',
    title:
      'If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. '
  }
]

const Table = () => {
  const [isFormsLoading, setIsFormLoading] = useState(false)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })
  const [total, setTotal] = useState<number>(0)
  const [rows, setRows] = useState<DataGridRowType[]>([])

  useEffect(() => {
    const filteredData = dummyData.filter(row => row.title.toLowerCase())
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
