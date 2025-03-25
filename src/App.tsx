import './App.scss'
import TButton, { ButtonProps } from './components/Button'

const buttonProps = {
  className: 'active',
  type: 'success',
  size: 'small'
} as ButtonProps

const App = () => {
  return (
    <>
      <TButton {...buttonProps}>
        <div></div>
      </TButton>
    </>
  )
}

export default App
