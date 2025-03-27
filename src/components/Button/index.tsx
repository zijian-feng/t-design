import './index.scss'
import classNames from 'classnames'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonState = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'small' | 'large' | 'default'
export type ButtonIconPosition = 'left' | 'right'
export type ButtonVariant = 'text' | 'outlined' | 'filled' | 'solid' | 'dashed'

export interface ButtonProps {
  /**
   * 设置按钮的大小
   * @default default
   */
  size?: ButtonSize
  /**
   * 设置按钮的图标
   * @default null
   */
  icon?: ReactNode
  /**
   * 设置按钮的类名
   * @default ''
   */
  className?: string
  /**
   * 设置按钮的状态
   * @default primary
   */
  state?: ButtonState
  /**
   * 设置按钮的样式
   * @default solid
   */
  variant?: ButtonVariant
  /**
   * 设置按钮的内容
   * @default null
   */
  children: React.ReactNode
  /**
   * 设置按钮的图标位置
   * @default left
   */
  iconPosition?: ButtonIconPosition
  /**
   * 设置按钮的类型
   * @default button
   */
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  /**
   * 设置按钮是否禁用
   * @default false
   */
  disabled?: ButtonHTMLAttributes<HTMLButtonElement>['disabled']
  /**
   * 设置按钮的点击事件
   * @default null
   */
  onClick?: () => void
}

/**
 * @author 冯子健
 * @date 2025/3/26
 * @description 按钮组件
 */
const Button = (props: ButtonProps) => {
  const {
    icon,
    type,
    onClick,
    children,
    disabled,
    className = '',
    size = 'default',
    variant = 'solid',
    state = 'primary',
    iconPosition = 'left'
  } = props

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        't-button',
        `is-${state}`,
        `size-${size}`,
        `is-${variant}`,
        className
      )}
      style={{
        outline: 'none',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse'
      }}
    >
      <div className="t-button_icon">{icon}</div>
      <div className="t-button_wrapper">{children}</div>
    </button>
  )
}

export default Button
