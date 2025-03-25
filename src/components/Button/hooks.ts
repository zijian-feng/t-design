import { CSSProperties } from "react"

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export const useButtonCls = (type: ButtonType): CSSProperties => {
  switch (type) {
    case 'primary':
      return {
        backgroundColor: 'var(--primary-500)',
        color: '#fff'
      }
    case 'success':
      return {
        backgroundColor: 'var(--success-500)',
        color: '#fff'
      }
    case 'warning':
      return {
        backgroundColor: 'var(--warning-500)',
        color: '#fff'
      }
    case 'danger':
      return {
        backgroundColor: 'var(--danger-500)',
        color: '#fff'
      }
    case 'info':
      return {
        backgroundColor: 'var(--info-500)',
        color: '#fff'
      }
  }
}