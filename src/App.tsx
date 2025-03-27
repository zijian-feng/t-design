import './App.scss'
import THeader from '@/components/Header'
import TFooter from '@/components/Footer'
import TAside from '@/components/Aside'
import TContainer from '@/components/Container'

const App = () => {
  return (
    <>
      <TContainer>
        <THeader></THeader>
        <TContainer>
          <TAside></TAside>
          <TContainer></TContainer>
        </TContainer>
        <TFooter></TFooter>
      </TContainer>
    </>
  )
}

export default App
