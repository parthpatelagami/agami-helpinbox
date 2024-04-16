import { Box, Checkbox, Hidden, ListItem } from '@mui/material'
import { flexbox } from '@mui/system'
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import CustomTextField from '@core/components/mui/TextField'

type propstype = {
  filter: any
  filteroption: string[]
}
// interface jsonres {
//   title?: string;

// }

const CustomAutocompleteDatatable = (props: propstype) => {
  // const debouncedFunction = useDebounce(() => {
  //   console.log('deboune')
  // }, 500)
  // const handlechange = () => {
  //   debouncedFunction()
  // }
  return (
    <ListItem key={props.filter.id} sx={{ width: 'auto' }}>
      <CustomAutocomplete
        sx={{
          '& .MuiFormControl-root.MuiTextField-root .MuiInputBase-root': {
            border: 'none'
          },
          width: 120
        }}
        componentsProps={{ popper: { style: { width: '400px', paddingLeft: '140px' } } }}
        multiple
        limitTags={1}
        disableCloseOnSelect
        options={props.filteroption}
        id='autocomplete-checkboxes'
        getOptionLabel={option => option || ''}
        renderInput={params => <CustomTextField {...params} label={props.filter.label} placeholder='Select Options' />}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox checked={selected} sx={{ mr: 2 }} />
            {option}
          </li>
        )}
        renderTags={value => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: 120
            }}
          >
            <Box
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                width: 70
              }}
            >
              {value.length > 0 ? value + ',' : ''}
            </Box>
            {value.length > 0 ? (value.length > 1 ? `+${value.length - 1}` : '') : ''}
          </Box>
        )}
      />
    </ListItem>
  )
}
export default CustomAutocompleteDatatable
