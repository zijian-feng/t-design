import './App.scss'
import THeader from '@/components/Header'
import TFooter from '@/components/Footer'
import TAside from '@/components/Aside'
import TButton from '@/components/Button'
import TContainer from '@/components/Container'
import { useState } from 'react'

const App = () => {
  const [expanded, setExpanded] = useState(true)
  return (
    <>
      <TContainer style={{ height: '100vh' }}>
        <THeader></THeader>
        <TContainer tagName="main">
          <TAside
            width={expanded ? '280px' : '80px'}
            style={{ background: 'var(--color-info-50)' }}
          >
            <TButton icon="$" onClick={() => setExpanded(!expanded)}>
              {expanded ? '缩小' : '扩展'}
            </TButton>
          </TAside>
          <TContainer></TContainer>
        </TContainer>
        <TFooter></TFooter>
      </TContainer>
    </>
  )
}

export default App
