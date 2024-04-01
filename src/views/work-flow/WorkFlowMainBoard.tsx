'use client'

import { useCallback, useState } from 'react'

import { Box, CardContent, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import 'reactflow/dist/style.css'

// * React Flow
import type { NodeChange, EdgeChange } from 'reactflow'
import {
  ReactFlow,
  Background,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlowProvider
} from 'reactflow'

// Custom Node Data Import
import ResizeSelectedNode from './config/ResizeSelectedNode'
import NodeSkeleton from './config/NodeSkeleton'
import WorkFlowControlPanel from './WorkFlowControlPannel'

const nodeTypes = { ResizeSelectedNode, NodeSkeleton }

const WorkFlowMainBoard = () => {
  const theme = useTheme()
  const [nodes, setNodes] = useNodesState([])
  const [edges, setEdges] = useEdgesState([])
  const [backgroundVariant, setBackgroundVariant] = useState('cross')

  const onConnect = useCallback(
    (connection: any) => setEdges(eds => addEdge({ ...connection, type: 'simplebezier' }, eds)),
    [setEdges]
  )

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes]
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges]
  )

  const onDragOver = useCallback((event: any) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const proOptions = { hideAttribution: true }
  const borderColor = theme.palette.mode === 'light' ? '#e5e5e5' : '#5d5d5d'
  const defaultViewport = { x: 0, y: 0, zoom: 1.8 }

  return (
    <>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <WorkFlowControlPanel></WorkFlowControlPanel>
          </Grid>
          <Grid item xs={9}>
            <Box sx={{ border: `1px solid ${borderColor}` }}>
              <Grid spacing={12} sx={{ height: '70vh' }}>
                <ReactFlowProvider>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    proOptions={proOptions}
                    onConnect={onConnect}
                    onDragOver={onDragOver}
                    defaultViewport={defaultViewport}
                    defaultZoom={1.5}
                    fitView
                  >
                    <MiniMap
                      nodeStrokeWidth={3}
                      nodeColor='#e2e2e2'
                      maskColor='rgb(240, 230, 240, 0.6)'
                      zoomable
                      pannable
                    />
                    <Controls />
                    <Background
                      variant={backgroundVariant}
                      color={
                        backgroundVariant === 'dots' ? '#959595' : backgroundVariant === 'cross' ? '#959595' : '#d4d4d4'
                      }
                      gap={backgroundVariant === 'dots' ? 10 : backgroundVariant === 'cross' ? 10 : 7}
                      size={backgroundVariant === 'dots' ? 2 : backgroundVariant === 'cross' ? 4 : 3}
                    />
                  </ReactFlow>
                </ReactFlowProvider>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </>
  )
}

export default WorkFlowMainBoard
