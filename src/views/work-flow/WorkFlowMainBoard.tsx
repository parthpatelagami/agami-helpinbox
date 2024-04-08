'use client'

import React, { useCallback, useState } from 'react'

import { Box, CardContent, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import 'reactflow/dist/style.css'

// * React Flow
import type { NodeChange, EdgeChange, DefaultEdgeOptions, Node, ReactFlowInstance } from 'reactflow'
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
  ReactFlowProvider,
  useReactFlow
} from 'reactflow'

// Custom Node Data Import
import CallAnswerControl from './config/nodes/CallAnswer'
import ResizeSelectedNode from './config/ResizeSelectedNode'
import NodeSkeleton from './config/NodeSkeleton'
import WorkFlowControlPanel from './WorkFlowControlPannel'

const nodeTypes = { ResizeSelectedNode, NodeSkeleton, CallAnswerControl: CallAnswerControl }

const onInit = ReactFlowInstance => console.log('flow loaded:', ReactFlowInstance)

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true
}

const initialNodes: Node[] = [
  { id: '1', type: 'CallAnswerControl', position: { x: 0, y: 0 }, data: { value: 250 } },
  { id: '2', type: 'input', position: { x: 3, y: 3 }, data: { value: 200 } }
]

let id = 0
const getId = () => `node_${id++}`

const WorkFlowMainBoard: React.FC = () => {
  const theme = useTheme()
  const [nodes, setNodes] = useNodesState(initialNodes)
  const [edges, setEdges] = useEdgesState([])
  const [backgroundVariant, setBackgroundVariant] = useState('cross')

  const [reactFlowInstance, setReactFlowInstance] = useState(null)

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

  const onDrop = useCallback(
    (event: any) => {
      console.log('----drag event')
      console.log(event)

      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')

      if (typeof type === 'undefined' || !type) {
        return
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      })

      const newNode = {
        id: getId(),
        type: 'CallAnswerControl',
        position,
        data: { label: `${type} node` },
        style: { background: '#fff', border: '1px solid black', fontSize: 10 }
      }

      setNodes(nds => nds.concat(newNode))
    },
    [reactFlowInstance]
  )

  /*const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    console.log('----drag event')
    console.log(event)

    event.preventDefault()

    const type = event.dataTransfer.getData('application/reactflow')

    if (typeof type === 'undefined' || !type) {
      return
    }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

    const newNode = {
      id: getId(),
      type: 'CallAnswerControl',
      position,
      data: { label: `${type} node` },
      style: { background: '#fff', border: '1px solid black', fontSize: 10 }
    }

    setNodes(nds => nds.concat(newNode))
  }*/

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    console.log('Node clicked:', node)
  }

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
              <Grid sx={{ height: '70vh' }}>
                <ReactFlowProvider>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodeClick={onNodeClick}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    proOptions={proOptions}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onInit={onInit}
                    defaultViewport={defaultViewport}
                    defaultEdgeOptions={defaultEdgeOptions}
                    defaultzoom={1.5}
                    panOnScroll
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
