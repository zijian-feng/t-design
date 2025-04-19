import './App.scss'
import { useState } from 'react'
import Flex from './components/Flex'
import Rate from './components/Rate'
import { Button } from './components'

const App = () => {
  const [state, setState] = useState(3)
  return (
    <Flex gap={20} align="center">
      <Rate allowHalf value={state} onChange={setState} />
      <Button onClick={() => setState(4)}>click</Button>
    </Flex>
  )
}

export default App
