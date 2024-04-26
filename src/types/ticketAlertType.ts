export type UserDataType = {
  id: string
  title: string,
  value: string,
  avatarIcon?: string,
  avatarColor?: string,
  subTitle?: string
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
  