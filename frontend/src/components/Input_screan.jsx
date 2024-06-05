import { useState } from 'react'
import { Input, Button  } from "antd";




function Input_screan() {
    const [count, setCount] = useState(0)
  
    return (
      <div className='input'>
         <Input placeholder="Опишите, что вам нужно...." style={{
        fontWeight: 'bold'
        }} />
         <Button>Отправить</Button>
      </div>
    )
  }
  
  export default Input_screan