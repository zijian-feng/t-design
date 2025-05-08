import type { FC, HTMLProps } from 'react'
import { useNamespace } from '@/hooks/useNamespace.ts'
import { InputContainer } from '@/components/Input/styles/container.ts'

export interface InputNumberProps extends HTMLProps<HTMLInputElement> {}

const InputNumber: FC<InputNumberProps> = ({ ...props }) => {
  const { join, cls } = useNamespace('input-number')
  return (
    <InputContainer className={join(cls)}>
      <input type="text" {...props} />
    </InputContainer>
  )
}

export default InputNumber
