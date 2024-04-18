import { memo } from 'react'

import { Handle, Position } from 'reactflow'

interface PhoneControls {
  data: any
  isConnectable: boolean
}

const CaseWhen: React.FC<PhoneControls> = ({ data, isConnectable }) => {
  console.log(data)
  console.log(isConnectable)

  return (
    <>
      <div>
        <Handle type='target' position={Position.Top} />
        <i className='custom-case-when text-4xl block' />
        <Handle type='source' position={Position.Bottom} />
        <Handle type='source' position={Position.Left} />
        <Handle type='source' position={Position.Right} />
      </div>
    </>
  )
}

export default memo(CaseWhen)
