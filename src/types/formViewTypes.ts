export type FieldType = {
  type: string
  label: string
  category: string
}

export type Breakpoints = ('s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne')[] | undefined

export type LayoutItem = {
  i: string
  x: number
  y: number
  w: number
  h: number
  resizeHandles?: Breakpoints
  type?: string
}

export type LayoutBreakpoints = {
  [key: string]: LayoutItem[]
}
