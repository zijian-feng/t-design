import './index.scss'
import classNames from 'classnames'
import { ButtonHTMLAttributes, type FC, HTMLAttributes, ReactNode } from 'react'

export type ButtonIconPosition = 'left' | 'right'
export type ButtonSize = 'small' | 'large' | 'default'
export type ButtonVariant = 'text' | 'outlined' | 'filled' | 'solid' | 'dashed'
export type ButtonState = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
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
const Button: FC<ButtonProps> = ({
  icon,
  type,
  onClick,
  children,
  disabled,
  className = '',
  size = 'default',
  variant = 'solid',
  state = 'primary',
  iconPosition = 'left',
  ...props
}) => {
  return (
    <button
      {...props}
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
      {icon && <div className="t-button_icon">{icon}</div>}
      {children && <div className="t-button_wrapper">{children}</div>}
    </button>
  )
}

export default Button
