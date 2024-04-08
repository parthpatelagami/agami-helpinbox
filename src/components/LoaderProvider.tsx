'use client'

import { ChildrenType } from '@/@core/types'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import themeConfig from '@/configs/themeConfig'
import { useTheme } from '@mui/material'
const LoaderProvider = ({ children }: ChildrenType) => {
  const theme = useTheme()
  return (
    <>
      {children}
      {themeConfig.routingLoader && (
        <ProgressBar
          shallowRouting
          style={JSON.stringify({
            '#nprogress': {
              pointerEvents: 'none'
            },
            '& .bar': {
              left: 0,
              top: 0,
              height: 3,
              width: '100%',
              zIndex: 2000,
              position: 'fixed',
              backgroundColor: theme.palette.primary.main
            }
          })}
        />
      )}
    </>
  )
}

export default LoaderProvider
