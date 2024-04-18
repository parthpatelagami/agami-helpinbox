import { memo } from 'react'

import { Handle, Position } from 'reactflow'

interface PhoneControls {
  data: any
  isConnectable: boolean
}

const GetOutPutControl: React.FC<PhoneControls> = ({ data, isConnectable }) => {
  console.log(data)
  console.log(isConnectable)

  return (
    <>
      <div>
        <Handle type='target' position={Position.Top} style={{}} />
        <i className='custom-get-output text-4xl block' />
        <Handle type='source' position={Position.Bottom} />
        <Handle type='source' position={Position.Left} />
        <Handle type='source' position={Position.Right} />
      </div>
    </>
  )
}

export default memo(GetOutPutControl)
