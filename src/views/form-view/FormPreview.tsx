// React Imports
import { useEffect, useRef, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import type { DialogProps } from '@mui/material/Dialog'
import { Grid, IconButton, MenuItem } from '@mui/material'

// Third-party Imports
import { Responsive, WidthProvider } from 'react-grid-layout'
import classnames from 'classnames'

import { FieldType, LayoutBreakpoints } from '@/types/formViewTypes'
import CustomTextField from '@/@core/components/mui/TextField'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import AppReactDraftWysiwyg from '@/libs/styles/AppReactDraftWysiwyg'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface PropsType {
  layoutState: LayoutBreakpoints
  usedFields: FieldType[]
  columns: number
}

const FormPreview = (props: PropsType) => {
  const { layoutState, usedFields, columns } = props
  const [date, setDate] = useState<Date | null | undefined>(new Date())

  // States
  const [open, setOpen] = useState<boolean>(false)
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper')

  // Refs
  const descriptionElementRef = useRef<HTMLElement>(null)

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef

      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <div className='flex gap-4'>
      <IconButton
        onClick={handleClickOpen('paper')}
        size='small'
        className='mx-1 p-1 border-solid border border-primary rounded-full'
      >
        <i className={`tabler-player-play-filled text-primary`} />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        scroll={scroll}
        onClose={handleClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>Form View</DialogTitle>
        <DialogContent
          id='scroll-dialog-description'
          ref={descriptionElementRef}
          tabIndex={-1}
          dividers={scroll === 'body'}
        >
          <ResponsiveGridLayout
            cols={{ xxs: 1, xs: 2, sm: columns, md: columns, lg: columns, xl: columns }}
            layouts={layoutState}
            isDraggable={false}
            isDroppable
            style={{ minHeight: '100%' }}
            isResizable={false}
            rowHeight={65}
          >
            {usedFields?.map(component => (
              <Grid key={component.label} item xs={12}>
                {component.type?.includes('input') ? (
                  <CustomTextField
                    className='p-0'
                    inputProps={{ readOnly: true }}
                    id={component.label}
                    autoFocus
                    fullWidth
                    label={component.label}
                    placeholder={component.label}
                  />
                ) : component.type?.includes('select') ? (
                  <CustomTextField
                    variant='standard'
                    inputProps={{ readOnly: true }}
                    className='p-0'
                    select
                    fullWidth
                    defaultValue='Select'
                    label={component.label}
                    id={component.label}
                  >
                    <MenuItem value='Select'>
                      <em>Select</em>
                    </MenuItem>
                  </CustomTextField>
                ) : component.type?.includes('area') ? (
                  <CustomTextField
                    multiline
                    rows={4}
                    className='p-0'
                    inputProps={{ readOnly: true }}
                    id={component.label}
                    autoFocus
                    fullWidth
                    label={component.label}
                    placeholder={component.label}
                  />
                ) : component.type?.includes('date') ? (
                  <AppReactDatepicker
                    dateFormat='dd/MM/yyyy'
                    readOnly
                    selected={date}
                    id={component.label}
                    onChange={(date: Date) => setDate(date)}
                    customInput={<CustomTextField InputProps={{ readOnly: true }} label={component.label} fullWidth />}
                  />
                ) : (
                  <AppReactDraftWysiwyg />
                )}
              </Grid>
            ))}
          </ResponsiveGridLayout>
        </DialogContent>
        <DialogActions className={classnames('dialog-actions-dense', { '!pt-3': scroll === 'body' })}>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FormPreview
