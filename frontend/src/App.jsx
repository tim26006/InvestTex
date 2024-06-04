import { useState } from 'react'
import Promt from './components/Promt'
import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Header />
    <Promt />
  </div>
  )
}

export default App
