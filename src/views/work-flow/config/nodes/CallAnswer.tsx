import { memo } from 'react'

import { Handle, Position } from 'reactflow'

interface PhoneControls {
  data: any
  isConnectable: boolean
}

const CallAnswerControl: React.FC<PhoneControls> = ({ data, isConnectable }) => {
  console.log(data)
  console.log(isConnectable)

  return (
    <>
      <Handle type='target' position={Position.Top} />
      <div>
        <i className='custom-call-answer text-4xl' />
      </div>
      <Handle type='source' position={Position.Bottom} />
    </>
  )
}

export default memo(CallAnswerControl)
