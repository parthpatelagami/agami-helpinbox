'use client'

import { Card } from '@mui/material'

import WorkFlowHeader from '@/views/work-flow/WorkFlowHeader'
import WorkFlowMainBoard from '@/views/work-flow/WorkFlowMainBoard'

const WorkFlowMain = () => {
  return (
    <>
      <Card>
        <WorkFlowHeader></WorkFlowHeader>
        <WorkFlowMainBoard></WorkFlowMainBoard>
      </Card>
    </>
  )
}

export default WorkFlowMain
