'use client'

import { ChildrenType } from '@/@core/types'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import themeConfig from '@/configs/themeConfig'

const LoaderProvider = ({ children }: ChildrenType) => {
  return (
    <>
      {children}
      {themeConfig.routingLoader && <ProgressBar height='1px' color='red' shallowRouting />}
    </>
  )
}

export default LoaderProvider
