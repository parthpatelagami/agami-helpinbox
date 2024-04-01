'use client'

import React from 'react'

import { Box, CardHeader, Tooltip, IconButton } from '@mui/material'

import { Icon } from '@iconify/react'

import { useTheme } from '@mui/material/styles'

export default function WorkFlowHeader() {
  const theme = useTheme()

  return (
    <>
      <CardHeader
        title='Design WorkFlow'
        action={
          <Box>
            <Tooltip placement='top' title='Preview'>
              <IconButton
                sx={{ mr: 1, p: '3.5px', border: `1px solid ${theme.palette.primary.main}`, borderRadius: '1rem' }}
              >
                <Icon icon='icon-park-outline:preview-open' color={`${theme.palette.primary.main}`} fontSize={10} />
              </IconButton>
            </Tooltip>
            <Tooltip placement='top' title='Save'>
              <IconButton
                sx={{ mr: 1, p: '3.5px', border: `1px solid ${theme.palette.primary.main}`, borderRadius: '1rem' }}
              >
                <Icon icon='fluent:save-28-regular' color={`${theme.palette.primary.main}`} fontSize={10} />
              </IconButton>
            </Tooltip>
            <Tooltip placement='top' title='Reset'>
              <IconButton
                sx={{ mr: 1, p: '3.5px', border: `1px solid ${theme.palette.primary.main}`, borderRadius: '1rem' }}
              >
                <Icon icon='system-uicons:reset' color={`${theme.palette.primary.main}`} fontSize={10} />
              </IconButton>
            </Tooltip>
            <Tooltip placement='top' title='Reset'>
              <IconButton
                sx={{ mr: 1, p: '3.5px', border: `1px solid ${theme.palette.primary.main}`, borderRadius: '1rem' }}
              >
                <Icon icon='clarity:close-line' color={`${theme.palette.primary.main}`} fontSize={10} />
              </IconButton>
            </Tooltip>
          </Box>
        }
      ></CardHeader>
    </>
  )
}
