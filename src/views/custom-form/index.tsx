'use client'

import FormTable from './FormTable'
interface PropsType {
  data: FormDataType[]
}
type FormDataType = {
  id: Number
  formName: string
  requestType: string
  ticketType: string
}

const CustomForm = (props: PropsType) => {
  return (
    <div className='h-full flex flex-col'>
      <FormTable tableData={props.data} />
    </div>
  )
}

export default CustomForm
