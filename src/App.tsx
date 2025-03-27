import './App.scss'
import TButton, { ButtonProps } from './components/Button'

const buttonProps = {
  icon: '$',
  size: 'large'
} as ButtonProps

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <TButton {...buttonProps}>button</TButton>
        <TButton {...buttonProps} state="success">
          button
        </TButton>
        <TButton {...buttonProps} state="warning">
          button
        </TButton>
        <TButton {...buttonProps} state="info">
          button
        </TButton>
        <TButton {...buttonProps} state="danger">
          button
        </TButton>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <TButton {...buttonProps} variant="filled">
          button
        </TButton>
        <TButton {...buttonProps} state="success" variant="filled">
          button
        </TButton>
        <TButton {...buttonProps} state="warning" variant="filled">
          button
        </TButton>
        <TButton {...buttonProps} state="info" variant="filled">
          button
        </TButton>
        <TButton {...buttonProps} state="danger" variant="filled">
          button
        </TButton>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <TButton {...buttonProps} variant="dashed">
          button
        </TButton>
        <TButton {...buttonProps} state="success" variant="dashed">
          button
        </TButton>
        <TButton {...buttonProps} state="warning" variant="dashed">
          button
        </TButton>
        <TButton {...buttonProps} state="info" variant="dashed">
          button
        </TButton>
        <TButton {...buttonProps} state="danger" variant="dashed">
          button
        </TButton>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <TButton {...buttonProps} variant="outlined">
          button
        </TButton>
        <TButton {...buttonProps} state="success" variant="outlined">
          button
        </TButton>
        <TButton {...buttonProps} state="warning" variant="outlined">
          button
        </TButton>
        <TButton {...buttonProps} state="info" variant="outlined">
          button
        </TButton>
        <TButton {...buttonProps} state="danger" variant="outlined">
          button
        </TButton>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <TButton {...buttonProps} variant="text">
          button
        </TButton>
        <TButton {...buttonProps} state="success" variant="text">
          button
        </TButton>
        <TButton {...buttonProps} state="warning" variant="text">
          button
        </TButton>
        <TButton {...buttonProps} state="info" variant="text">
          button
        </TButton>
        <TButton {...buttonProps} state="danger" variant="text">
          button
        </TButton>
      </div>
    </div>
  )
}

export default App
