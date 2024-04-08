import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  styled,
  Typography
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Icon } from '@iconify/react'

import CustomTextField from '@core/components/mui/TextField'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const WorkFlowControlPanel = () => {
  const theme = useTheme()
  const borderColor = theme.palette.mode === 'light' ? '#e5e5e5' : '#5d5d5d'

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)

    console.log(`DragSta`)
    console.log(`Node type data`, nodeType)
  }

  return (
    <>
      <Grid>
        <Box sx={{ border: `1px solid ${borderColor}` }}>
          <Grid sx={{ height: '70vh' }}>
            <Grid>
              <Stack>
                <Box
                  sx={{
                    borderBottom: `1px solid ${borderColor}`,
                    maring: '5px',
                    py: 3,
                    px: 5,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <CustomTextField
                    fullWidth
                    placeholder='Search for controls...'
                    sx={{ '& .MuiInputBase-root': { borderRadius: '30px !important' } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start' sx={{ color: 'text.secondary' }}>
                          <i className='tabler:search' />

                          <Icon icon='tabler:search' />
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid>
              <Paper
                elevation={0}
                sx={{
                  padding: '6px',
                  maxHeight: '63.5vh',
                  overflowY: 'auto',
                  scrollbarWidth: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: '1',
                  position: 'relative'
                }}
              >
                <Stack>
                  <Accordion defaultExpanded>
                    <AccordionSummary id='panel-header-1' aria-controls='panel-content-1'>
                      <Typography>General</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack direction='row' spacing={3}>
                        <Item elevation={0}></Item>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion defaultExpanded>
                    <AccordionSummary id='panel-header-2' aria-controls='panel-content-2'>
                      <Typography>Phone Controls</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack direction='row' spacing={3}>
                        <Item elevation={0}>
                          <i
                            className='custom-call-answer cursor-move text-3xl'
                            onDragStart={event => onDragStart(event, 'output')}
                            draggable
                          />
                        </Item>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary id='panel-header-3' aria-controls='panel-content-3'>
                      <Typography>Edges</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack direction='row' spacing={3}>
                        <Item>1</Item>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary id='panel-header-3' aria-controls='panel-content-3'>
                      <Typography>External</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Gingerbread lemon drops bear claw gummi bears bonbon wafer jujubes tiramisu. Jelly pie cake.
                        Sweet roll dessert sweet pastry powder.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary id='panel-header-4' aria-controls='panel-content-4'>
                      <Typography>External 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Gingerbread lemon drops bear claw gummi bears bonbon wafer jujubes tiramisu. Jelly pie cake.
                        Sweet roll dessert sweet pastry powder.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary id='panel-header-4' aria-controls='panel-content-4'>
                      <Typography>External 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Gingerbread lemon drops bear claw gummi bears bonbon wafer jujubes tiramisu. Jelly pie cake.
                        Sweet roll dessert sweet pastry powder.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary id='panel-header-4' aria-controls='panel-content-4'>
                      <Typography>External 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Gingerbread lemon drops bear claw gummi bears bonbon wafer jujubes tiramisu. Jelly pie cake.
                        Sweet roll dessert sweet pastry powder.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary id='panel-header-4' aria-controls='panel-content-4'>
                      <Typography>External 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Gingerbread lemon drops bear claw gummi bears bonbon wafer jujubes tiramisu. Jelly pie cake.
                        Sweet roll dessert sweet pastry powder.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  )
}

export default WorkFlowControlPanel
