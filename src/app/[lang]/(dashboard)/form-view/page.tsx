import FormView from '@/views/form-view'
import { FieldType } from '@/types/formViewTypes'

const initialFields: FieldType[] = [
  { type: 'input', label: 'Subject', category: 'static' },
  { type: 'select', label: 'Status', category: 'static' },
  { type: 'area', label: 'Comment', category: 'static' },
  { type: 'select', label: 'Channel', category: 'static' },
  { type: 'select', label: 'Country', category: 'custom' },
  { type: 'select', label: 'State', category: 'custom' },
  { type: 'select', label: 'City', category: 'custom' }
]

const FromViewPage = () => {
  return <FormView fields={initialFields} />
}

export default FromViewPage
