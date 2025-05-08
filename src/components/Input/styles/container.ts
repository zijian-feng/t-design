import styled from 'styled-components'

interface InputContainerProps {
  size?: 'small' | 'medium' | 'large'
}

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  overflow: hidden;
  border: thin solid #cdced7;

  .is-before:not(.is-fill) + input {
    padding-left: 0;
  }

  input:has(+ .is-after:not(.is-fill)) {
    padding-right: 0;
  }

  .is-before,
  .is-after {
    display: flex;
    align-items: center;
    justify-content: center;

    &.is-fill {
      color: #1f2937;
      background-color: #f3f4f6;
    }
  }

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          height: 24px;
          font-size: 10px;
          border-radius: 4px;

          input {
            padding: 0 4px;
            line-height: 24px;
          }

          .is-before,
          .is-after {
            height: 100%;
            padding: 0 4px;
            min-width: 20px;
          }
        `
      case 'medium':
        return `
          height: 32px;
          font-size: 12px;
          border-radius: 6px;

          input {
            padding: 0 8px;
            line-height: 32px;
          }

          .is-before,
          .is-after {
            height: 100%;
            padding: 0 8px;
            min-width: 24px;
          }
        `
      case 'large':
        return `
          height: 40px;
          font-size: 14px;
          border-radius: 8px;

          input {
            padding: 0 10px;
            line-height: 40px;
          }

          .is-before,
          .is-after {
            height: 100%;
            padding: 0 10px;
            min-width: 30px;
          }
        `
    }
  }}
`
