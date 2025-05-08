import { useContext, type FC, type HTMLProps, type ReactNode } from 'react'
import { InputContainer } from './styles/container.ts'
import { useNamespace } from '@/hooks/useNamespace'
import InputNumber from './number.tsx'
import ConfigProviderContext from '../ConfigProvider/providers/context.ts'
import Input from './styles/input.ts'

export type HTMLInputProps = Omit<HTMLProps<HTMLInputElement>, 'size'>

export interface InputProps extends HTMLInputProps {
  /**
   * 组件前置元素
   * @default undefined
   */
  before?: ReactNode
  /**
   * 组件后置元素
   * @default undefined
   */
  after?: ReactNode
  /**
   * 是否开启前置元素的填充模式
   */
  fillBefore?: boolean
  /**
   * 是否开启后置元素的填充模式
   */
  fillAfter?: boolean
  /**
   * 组件大小
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
}

export interface InputComponent extends FC<InputProps> {
  Number: typeof InputNumber
}

const TroveInput: InputComponent = ({
  size,
  after,
  before,
  fillAfter = false,
  fillBefore = false,
  ...props
}) => {
  const ns = useNamespace('input')
  const { size: commonSize } = useContext(ConfigProviderContext)

  return (
    <InputContainer
      size={size ?? commonSize}
      className={ns.join(ns.cls, ns.is(size ?? commonSize!))}
    >
      {!!before && (
        <div className={ns.join(ns.is('before'), ns.is('fill', fillBefore))}>
          {before}
        </div>
      )}
      <Input type="text" {...props} />
      {!!after && (
        <div className={ns.join(ns.is('after'), ns.is('fill', fillAfter))}>
          {after}
        </div>
      )}
    </InputContainer>
  )
}

TroveInput.Number = InputNumber

export default TroveInput
