import React, { memo } from 'react'

import { Handle, useStore, Position } from 'reactflow'

const Placeholder = () => (
  <div className='placeholder'>
    <div />
  </div>
)

interface Props {
  data: any
}

export default memo(({ data }: Props) => {
  const [, , zoom] = useStore(state => state.transform)
  const showContent = zoom >= 1.5

  return (
    <>
      <Handle type='target' position={Position.Left} />
      {showContent ? data.content : <Placeholder />}
      <Handle type='source' position={Position.Right} />
    </>
  )
})
