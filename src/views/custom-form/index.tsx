'use client'

import ClientSideTable from '@/components/layout/shared/table/ClientSideTable'
interface PropsType {
  data: FormDataType[]
  columns: ColumnsType[]
}
type FormDataType = {
  id: Number
  formName: string
  requestType: string
  ticketType: string
}

type ColumnsType = {
  accessor: string
  header: string
}

const CustomForm = (props: PropsType) => {
  return (
    <div className='h-full flex flex-col'>
      <ClientSideTable tableData={props.data} columnNames={props.columns} redirectUrl='custom-form/form-view' />
    </div>
  )
}

export default CustomForm
