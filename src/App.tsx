import './App.scss'
import TLayout from '@/components/Layout'
import THeader from '@/components/Header'
import TFooter from '@/components/Footer'
import TAside from '@/components/Aside'
import TContainer from '@/components/Container'

const App = () => {
  return (
    <>
      <TLayout>
        <THeader></THeader>
        <TContainer>
          <TAside></TAside>
          <TContainer></TContainer>
        </TContainer>
        <TFooter></TFooter>
      </TLayout>
    </>
  )
}

export default App
