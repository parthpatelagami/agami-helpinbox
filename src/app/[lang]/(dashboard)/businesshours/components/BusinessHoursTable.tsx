// ** React Imports
import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'

// ** MUI Imports
import type { GridSortModel } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'

import columns from './BusinessHoursColumn'

type SortType = 'asc' | 'desc' | undefined | null

export type DataGridRowType = {
  id: string
  title: string
}

const dummyData: DataGridRowType[] = [
  { id: '1', title: 'TESTING 1' },
  { id: '2', title: 'TESTING 2' },
  { id: '3', title: 'TESTING 3' },
  { id: '4', title: 'TESTING 4' },
  { id: '5', title: 'TESTING 5' },
  { id: '6', title: 'TESTING 6' },
  { id: '7', title: 'TESTING 7' }
]

const BusinessHoursTable = () => {
  // ** States
  const [total, setTotal] = useState<number>(0)
  const [sort, setSort] = useState<SortType>('asc')
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<any>()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })

  useEffect(() => {
    let filteredData = dummyData.filter(row => row.title.toLowerCase().includes(searchValue.toLowerCase()))

    filteredData = filteredData.sort((a, b) => {
      const columnA = a[sortColumn] || ''
      const columnB = b[sortColumn] || ''

      if (sort === 'asc') {
        return columnA.localeCompare(columnB)
      } else {
        return columnB.localeCompare(columnA)
      }
    })

    const startIndex = paginationModel.page * paginationModel.pageSize
    const slicedData = filteredData.slice(startIndex, startIndex + paginationModel.pageSize)

    setRows(slicedData)
    setTotal(filteredData.length)
  }, [searchValue, sort, sortColumn, paginationModel])

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)
    } else {
      setSort('asc')
      setSortColumn('title')
    }
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  return (
    <>
      <DataGrid
        autoHeight
        pagination
        rows={rows}
        rowCount={total}
        columns={columns}
        sortingMode='server'
        paginationMode='server'
        pageSizeOptions={[5, 10, 25, 50]}
        paginationModel={paginationModel}
        onSortModelChange={handleSortModel}
        onPaginationModelChange={setPaginationModel}
        slotProps={{
          baseButton: {
            size: 'medium',
            variant: 'tonal'
          },
          toolbar: {
            value: searchValue,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
          }
        }}
      />
    </>
  )
}

export default BusinessHoursTable
