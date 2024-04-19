import CustomForm from '@/views/custom-form'
import { FieldType } from '@/types/formViewTypes'

const initialFields: FieldType[] = [
  { id: '1', type: 'input', label: 'Subject', category: 'static' },
  { id: '2', type: 'select', label: 'Status', category: 'static' },
  { id: '3', type: 'area', label: 'Agent Reply', category: 'static' },
  { id: '4', type: 'editor', label: 'Comment', category: 'static' },
  { id: '5', type: 'select', label: 'Channel', category: 'static' },
  { id: '6', type: 'select', label: 'Country', category: 'custom' },
  { id: '7', type: 'select', label: 'State', category: 'custom' },
  { id: '8', type: 'select', label: 'City', category: 'custom' },
  { id: '9', type: 'date', label: 'Date', category: 'custom' }
]

const FormData = [
  {
    id: 1,
    formName: 'Main Form',
    requestType: 'Issue',
    ticketType: 'Complaint'
  },
  {
    id: 2,
    formName: 'Enquiry',
    requestType: 'India',
    ticketType: 'Rupee'
  },
  {
    id: 3,
    formName: 'Feedback',
    requestType: 'India',
    ticketType: 'Rupee'
  }
]

const CustomFormPage = () => {
  return <CustomForm data={FormData} />
}

export default CustomFormPage
