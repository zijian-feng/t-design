// import buttonStyle from './index.module.scss'

import { CSSProperties, useEffect } from "react"
import { useButtonCls } from './hooks'

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'small' | 'large' | 'default'

export interface ButtonProps {
  className?: string
  type?: ButtonType
  size?: ButtonSize
  children: React.ReactNode
  onClick?: () => void
}

interface ButtonSizes {
  [key: string]: CSSProperties
}

// 对象字面量
const buttonSizes: ButtonSizes = {
  'small': {
    'height': '24px',
    'lineHeight': '20px',
    'fontSize': '12px',
    padding: '0 7px'
  },
  'large': {
    'height': '40px',
    'lineHeight': '24px',
    'fontSize': '16px',
    padding: '0 15px'
  },
  'default': {
    'height': '32px',
    'lineHeight': '22px',
    'fontSize': '14px',
    padding: '0 15px'
  }
}

const Button = (props: ButtonProps) => {
  useEffect(() => {
    // 
  })

  const {
    className = '',
    onClick,
    type = 'primary',
    size = 'default',
    children
  } = props

  const buttonCls = useButtonCls(type)

  return (
    <button
      onClick={onClick}
      className={`t-button ${className}`.trimEnd()}
      style={{
        ...buttonCls,
        ...buttonSizes[size],
        outline: 'none',
        border: 'none',
        borderRadius: '4px'
      }}
    >
      { children }
    </button>
  )
}

export default Button
