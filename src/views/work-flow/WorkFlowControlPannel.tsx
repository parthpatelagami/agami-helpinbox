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

  return (
    <>
      <Grid spacing={12}>
        <Box sx={{ border: `1px solid ${borderColor}` }}>
          <Grid spacing={12} sx={{ height: '70vh' }}>
            <Grid>
              <Stack spacing={2}>
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
                          <svg
                            width='32'
                            height='32'
                            viewBox='0 0 32 32'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            xlinkHref='http://www.w3.org/1999/xlink'
                          >
                            <rect width='32' height='32' fill='url(#pattern1)' />
                            <defs>
                              <pattern id='pattern1' patternContentUnits='objectBoundingBox' width='1' height='1'>
                                <use xlinkHref='#image0_0_1' transform='scale(0.0125)' />
                              </pattern>
                              <image
                                id='image0_0_1'
                                width='80'
                                height='80'
                                xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkFGQkY3RkY0NzE0MTFFOUIzQ0Q5Q0U2RjM4QkVCQTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkFGQkY4MDA0NzE0MTFFOUIzQ0Q5Q0U2RjM4QkVCQTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGQUZCRjdGRDQ3MTQxMUU5QjNDRDlDRTZGMzhCRUJBMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQUZCRjdGRTQ3MTQxMUU5QjNDRDlDRTZGMzhCRUJBMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pm9tmuIAAALBSURBVHja7Jw7bNNQFIav7QBLw8TES2qnCiRYGgRSF0AqHUphALGD2AmsCASCsWSBtXtVBkSRUBlgQaIiTEiETmXgMYWlDyFKHHOPcRoH5V43Lqa1+v3SUWL7JI6/+Nx7fjuK8+PhARXprI6yjpKOPoW6aVlHVccDHc9khRttuKfjqY6TwLOqL2I0EzFTjj4Dx6IVqHeNyxl4HQ6pVRaAQ3BIrSEBWIRDahVdGGxMAAQgAAEIQARAAAIQgAiAAAQgABEAAQhAACIA/h8Vst6BN3hR7Tg9YdweLH1Rq1OjKvi5GC5LrrzGpObXN2r1yaW15Z3np5S774Qxv1GtqMbbSn7PQG/wgnW7U9yvnD2HO4BbP3AMljy3wQtz9h6nhBkDAYgACMBtCrDVnlgVy5G2Zr3vFyx+/jf734Dk521BpjvYtftPa6Ifu/d1c2FvF29rvIEzxnz/43QHZFe3QO7AiPGL8eenM4WYOUBKGG2yldPl6B25bB2jGi9vrJVZ4egV5faPmK1cvaYar++0D2D4ti7jQ8Z8f/5xWMb5BajhJdkt//2kCqJxUIAkWbkWQBn/BHiSsgSY7xI2TDSMgUwiAEQA3E5WLmX+eqxc7vtAaTmC7zWrD45buV/Pr+pWxXwVOajXOnyz5DuWPrC58CLfXpgSRptbwuIWvNK18KpM1xL7Ntdx1yzJ+olr8Rdm2wdwrGy9cfR3fu4AFoZvWa2cbItf0iqcmjDCbuX7jw62rVypnGzlMgS45UrY6cWeYeWYRAAIAgACMLX1y/iO2xaxcnfDVsYITNuxuJWTy/u2PrD5qW3NmvUP4a+vkvpArBwlDEAEQAACEIAIgAAEIAARAAEIQAAiAAIQgAAEoI4lMKTWsgB8B4fUqgrAChxSqyIA5X/078OiZwmzmdYkclPHOR2vdKzAxqiViNF4xEz9FmAAqKHbNWS9O/AAAAAASUVORK5CYII='
                              />
                            </defs>
                          </svg>
                        </Item>
                        <Item elevation={0}>
                          <svg
                            width='32'
                            height='32'
                            viewBox='0 0 32 32'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            xlinkHref='http://www.w3.org/1999/xlink'
                          >
                            <rect width='32' height='32' fill='url(#pattern2)' />
                            <defs>
                              <pattern id='pattern2' patternContentUnits='objectBoundingBox' width='1' height='1'>
                                <use xlinkHref='#image0_0_2' transform='scale(0.0125)' />
                              </pattern>
                              <image
                                id='image0_0_2'
                                width='80'
                                height='80'
                                xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUEzOEI2Q0M0NzE0MTFFOUFENEVBNzEwQTY3MzA0MkMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUEzOEI2Q0Q0NzE0MTFFOUFENEVBNzEwQTY3MzA0MkMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFQTM4QjZDQTQ3MTQxMUU5QUQ0RUE3MTBBNjczMDQyQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFQTM4QjZDQjQ3MTQxMUU5QUQ0RUE3MTBBNjczMDQyQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pq8pgtkAAAM1SURBVHja7NwxaBNRHAbwZ4mLpLpUCAVx0UEEqbSKLV5BdGjBKhTUuYhuUqtdSsVBDJ20RjeLZJYaByvaQREqKFKLIIqIcRBBBadq6uKg7zvvShpyuXeXu2fe3ffBI7QXGu6X9+7937ujGauUE06GZBuTbY9sWcHUS0W2RdmuynYfv2hzDlyW7Z5sB4jXMFnHaM4xExnZDss2SZvAgdkL9MBztAidMQD20CF0egDYTofQaW+jQXMhIAEJSEACMgQkIAEJyBCQgAQkIENAAhKQgMZl+6adYmTHuP1KwBB4hf67EvC8/aoTUSvg7s19Ir+vKApWye4tUeJl12+0f8arTsSMLrzBrSfERPe1NZg42RuvL0aG58ZFHF0YFh+W35rfA2vx3BzbdkpYnQNKfyO3YYuN7odXixh3T4wdECd+Ztclz+MT3QVPhOpc7y/ZQx8NkI3wqhH3dw6aDYgLe6MTxTEgqnwR7tAHogo6Ul5+Yy4gThLD1y8YxhjOUWdq6ax4+mXeXEArwPCJalauxnv46bbZZYw77FR7q2l4Woawar79+mwcXuyAld8/lN83+Xyk6c9DTakTr2WWclEVvANyworyUvDfAVVKCMySUa0WUDSrzPrGAALHbxirXvtUyhF8VjnmpVtt1lml3J94C+lxu5huBHh8fq8wNbFfA2fLNxsOUZQ69dbJBKwaVn6ThNdmAwFTgKitjEkqotY6MImI2gtpVURs/esuio1ZiaggYovLa9MUBfOtg4/EwvBX8WDofSxbYS2/lFNBrLdtj7In31tc3arHMex4B9lkNaqQ9ovKvQsU21iJ4L3YY/SCwpcytTQa+yZqSwGqIgZdQgJSdTfI+N0YleEcJP9uEZxO9jUwbsSujt50AcaBmDrAKBHvfJxJJ2AUiLPlGW0zccs+nRUWEfdFmnneJjGA1YjFd1d8SxL0uJOPD9m9L1WFdJDgsY6ujr7V2hGoKLJffX8W2W3RRANyFiYgQ0ACEpCADAEJSEACMgQkIAEJSECGgAQ0HPAnGUKnAsCXdAidRQBO0yF0pgGIf6yfp0XgwGzOnUQuyHZUtieyrdDGMyuO0RHHTPwVYADs9Vhfy5AXbAAAAABJRU5ErkJggg=='
                              />
                            </defs>
                          </svg>
                        </Item>
                        <Item elevation={0}>3</Item>
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
