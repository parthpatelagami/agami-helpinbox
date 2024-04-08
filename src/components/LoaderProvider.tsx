'use client'

import { ChildrenType } from '@/@core/types'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import themeConfig from '@/configs/themeConfig'
import { useTheme } from '@mui/material'
const LoaderProvider = ({ children }: ChildrenType) => {
  const theme = useTheme()
  const customStyles = `
    #nprogress {
      pointer-events: none;
    }
    #nprogress .bar {
      left: 0;
      top: 0;
      height: 3px;
      width: 100%;
      z-index: 2000;
      position: fixed;
      background-color: ${theme.palette.primary.main};
    }
  `
  return (
    <>
      {children}
      {themeConfig.routingLoader && <ProgressBar shallowRouting style={customStyles} />}
    </>
  )
}
//backgroundColor: theme.palette.primary.main

export default LoaderProvider
