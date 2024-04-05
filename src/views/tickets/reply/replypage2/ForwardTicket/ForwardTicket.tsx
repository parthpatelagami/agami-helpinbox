// // ** React Imports
// import { useState, ChangeEvent } from 'react'

// // ** MUI Imports
// import Drawer from '@mui/material/Drawer'
// import Button from '@mui/material/Button'
// import MenuItem from '@mui/material/MenuItem'
// import { styled } from '@mui/material/styles'
// import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'
// import Box, { BoxProps } from '@mui/material/Box'
// import CustomTextField from '@core/components/mui/TextField'
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { useForm, Controller } from 'react-hook-form'
// import Checkbox from '@mui/material/Checkbox'
// import ListItemText from '@mui/material/ListItemText'
// import { SelectChangeEvent } from '@mui/material/Select'
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'
// import CardContent from '@mui/material/CardContent'
// import Tooltip from '@mui/material/Tooltip'
// // ** Icon Imports
// // import Icon from 'src/@core/components/icon'

// import CardSnippet from 'src/@core/components/card-snippet'
// import EditorControlled from '../../editor/EditControlled'
// import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
// import FormControlLabel from '@mui/material/FormControlLabel'


// // ** Store Imports
// import { useDispatch, useSelector } from 'react-redux'
// import CustomChip from '@core/components/mui/Chip'

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// // ** Types Imports
// // import { UsersType } from 'src/types/apps/Usertypes'
// import { Divider } from '@mui/material'

// interface ForwardTicketType {
//   open: boolean
//   toggle: () => void
// }

// interface UserData {
//   bcc: string
//   subject: string
//   billing: string
//   country: string
//   contact: number
//   emailto: string
//   cc: string
// }

// const showErrors = (field: string, valueLen: number, min: number) => {
//   if (valueLen === 0) {
//     return `${field} field is required`
//   } else if (valueLen > 0 && valueLen < min) {
//     return `${field} must be at least ${min} characters`
//   } else {
//     return ''
//   }
// }

// const Header = styled(Box)<BoxProps>(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(6),
//   justifyContent: 'space-between'
// }))

// const schema = yup.object().shape({
//   subject: yup.string().required(),
//   bcc: yup.string().email().required(),
//   emailto: yup.string().email().required(),
// //   cc: yup.string().email().required(),
//   contact: yup
//     .number()
//     .typeError('Contact Number field is required')
//     .min(10, obj => showErrors('Contact Number', obj.value.length, obj.min))
//     .required(),
//   cc: yup
//     .string()
//     .min(3, obj => showErrors('CC', obj.value.length, obj.min))
//     .required()
// })

// const defaultValues = {
//   bcc: '',
//   subject: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi maxime voluptatibus odit sint, animi quos minus possimus tempora esse, atque accusantium. Consequuntur expedita et porro beatae amet commodi quo? Harum?',
//   emailto: '',
//   cc: ''
// }

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder'
// ]
// const ForwardTicket = (props: ForwardTicketType) => {
//   // ** Props
//   const { open, toggle } = props

//   const [personName, setPersonName] = useState<string[]>([])
//   const [personNameNative, setPersonNameNative] = useState<string[]>([])

//   const handleChange = (event: SelectChangeEvent<unknown>) => {
//     setPersonName(event.target.value as string[])
//   }

//   const handleChangeMultipleNative = (event: ChangeEvent<HTMLSelectElement>) => {
//     const { options } = event.target
//     const value: string[] = []
//     for (let i = 0, l = options.length; i < l; i += 1) {
//       if (options[i].selected) {
//         value.push(options[i].value)
//       }
//     }
//     setPersonNameNative(value)
//   }

//   // ** State
//   const [plan, setPlan] = useState<string>('basic')
//   const [role, setRole] = useState<string>('subscriber')

//   // ** Hooks
// //   const dispatch = useDispatch<AppDispatch>()
// //   const store = useSelector((state: RootState) => state.user)
//   const {
//     reset,
//     control,
//     // setValue,
//     // setError,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues,
//     mode: 'onChange',
//     resolver: yupResolver(schema)
//   })
//   const onSubmit = ()=>{

//   }
// //   const onSubmit = (data: UserData) => {
// //     if (store.allData.some((u: UsersType) => u.email === data.email || u.cc === data.cc)) {
// //       store.allData.forEach((u: UsersType) => {
// //         if (u.email === data.email) {
// //           setError('email', {
// //             message: 'Email already exists!'
// //           })
// //         }
// //         if (u.cc === data.cc) {
// //           setError('cc', {
// //             message: 'cc already exists!'
// //           })
// //         }
// //       })
// //     } 
// //     else {
// //       dispatch(addUser({ ...data, role, currentPlan: plan }))
// //       toggle()
// //       reset()
// //     }
// //   }

//   const handleClose = () => {
//     // setPlan('basic')
//     // setRole('subscriber')
//     // setValue('contact', Number(''))
//     toggle()
//     reset()
//   }

//   return (
//     <Drawer
//       open={open}
//       anchor='right'
//       variant='temporary'
//       onClose={handleClose}
//       ModalProps={{ keepMounted: true }}
//       sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 , md:800} } }}
//     >
//         <Header>
//             <Typography variant='h5'>Forward Ticket</Typography>
//             <IconButton
//                 size='small'
//                 onClick={handleClose}
//                 sx={{
//                     p: '0.438rem',
//                     borderRadius: 1,
//                     color: 'text.primary',
//                     backgroundColor: 'action.selected',
//                     '&:hover': {
//                     backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
//                     }
//                 }}
//             >
//                 <Icon icon='tabler:x' fontSize='1.125rem' />
//             </IconButton>    
//         </Header>   
//         <Divider/>
//         <Box sx={{ p: theme => theme.spacing(0, 6, 6) , mt:5}}>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <Controller
//                     name='emailto'
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field: { value, onChange } }) => (
//                         <CustomTextField
//                             select
//                             fullWidth
//                             sx={{ mb: 4 }}
//                             label='Email To :-'
//                             id='select-multiple-chip'
//                             SelectProps={{
//                             multiple: true,
//                             value: personName,
//                             onChange: e => handleChange(e),
//                             renderValue: selected => (
//                                 <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
//                                 {(selected as unknown as string[]).map(value => (
//                                     <CustomChip key={value} label={value} sx={{ m: 0.75 }} skin='light' color='primary' />
//                                 ))}
//                                 </Box>
//                             )
//                             }}
//                             >
//                             {names.map(name => (
//                             <MenuItem key={name} value={name}>
//                                 {name}
//                             </MenuItem>
//                             ))}
//                         </CustomTextField>
//                     )}
//                 />
//                 <Controller
//                     name='cc'
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field: { value, onChange } }) => (
//                         <CustomTextField
//                             select
//                             fullWidth
//                             sx={{ mb: 4 }}
//                             label='CC :-'
//                             id='select-multiple-chip'
//                             SelectProps={{
//                             multiple: true,
//                             value: personName,
//                             onChange: e => handleChange(e),
//                             renderValue: selected => (
//                                 <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
//                                 {(selected as unknown as string[]).map(value => (
//                                     <CustomChip key={value} label={value} sx={{ m: 0.75 }} skin='light' color='primary' />
//                                 ))}
//                                 </Box>
//                             )
//                             }}
//                             >
//                             {names.map(name => (
//                             <MenuItem key={name} value={name}>
//                                 {name}
//                             </MenuItem>
//                             ))}
//                         </CustomTextField>
//                     )}
//                 />
//                 <Controller
//                     name='bcc'
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field: { value, onChange } }) => (
//                         <CustomTextField
//                             select
//                             fullWidth
//                             sx={{ mb: 4 }}
//                             label='BCC :-'
//                             id='select-multiple-chip'
//                             SelectProps={{
//                             multiple: true,
//                             value: personName,
//                             onChange: e => handleChange(e),
//                             renderValue: selected => (
//                                 <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
//                                 {(selected as unknown as string[]).map(value => (
//                                     <CustomChip key={value} label={value} sx={{ m: 0.75 }} skin='light' color='primary' />
//                                 ))}
//                                 </Box>
//                             )
//                             }}
//                         >
//                         {names.map(name => (
//                         <MenuItem key={name} value={name}>
//                             {name}
//                         </MenuItem>
//                         ))}
//                         </CustomTextField>
//                     )}
//                 />
//                 <Controller
//                     name='subject'
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                         fullWidth
//                         value={value}
//                         label='Subject :-'
//                         onChange={onChange}
//                         placeholder='Test Ticket'
//                         error={Boolean(errors.subject)}
//                         {...(errors.subject && { helperText: errors.subject.message })}
//                     />
//                     )}
//                 />
//                 <EditorWrapper sx={{py:5}}>   
//                     <Grid>
//                         <Typography variant='inherit'>Comment :-</Typography>
//                         <EditorControlled/>      
//                     </Grid>                              
//                 </EditorWrapper>   
//                 <Button
//                     sx={{my:5}}
//                     component="label"
//                     role={undefined}
//                     variant="contained"
//                     tabIndex={-1}
//                     startIcon={<Icon icon='simple-line-icons:cloud-upload' fontSize={25}/>}
//                     >
//                     Upload file
//                     <VisuallyHiddenInput type="file" />
//                 </Button> 
//                 <Box sx={{ display: 'flex', justifyContent:{md:'flex-end'} }}>
//                     <Button type='submit' variant='contained' sx={{ mr: 3 }}>
//                     Submit
//                     </Button>
//                     <Button variant='tonal' color='secondary' onClick={handleClose}>
//                     Cancel
//                     </Button>
//                 </Box>
//             </form>
//         </Box>
//     </Drawer>
//   )
// }

// export default ForwardTicket;
