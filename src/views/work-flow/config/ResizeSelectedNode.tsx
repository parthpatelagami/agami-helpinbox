import { memo } from 'react'
import { Handle, Position, NodeResizer } from 'reactflow'

interface Props {
  data: any
  selected: any
}

const ResizableNodeSelected = ({ data, selected }: Props) => {
  return (
    <>
      <NodeResizer color='#5a5a5a' isVisible={selected} minWidth={100} minHeight={40} />
      <Handle type='target' position={Position.Top} />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type='source' position={Position.Bottom} />
    </>
  )
}

export default memo(ResizableNodeSelected)
