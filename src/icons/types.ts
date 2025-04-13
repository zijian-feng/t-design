import { HTMLAttributes } from 'react'

export interface IconProps extends HTMLAttributes<SVGSVGElement> {
  size?: number | string
  color?: string
}
