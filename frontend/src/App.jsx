import { useState } from 'react'
import Header from './components/Header';
import Input_screan from './components/Input_screan'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Input_screan />
    </div>
  );
}

export default App
