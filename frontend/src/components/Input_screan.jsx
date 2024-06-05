import { useState } from 'react'
import { Input, Button  } from "antd";

import send_img from './img/send.png';


function Input_screan() {
    const [count, setCount] = useState(0)
  
    return (
      <div className='input'>
         <Input placeholder="Опишите, что вам необходимо...." style={{
        fontWeight: 'bold'
        }} />
         <button className='send_btn'>  <img className='send_img' src={send_img} alt="Your Image" /></button>
      </div>
    )
  }
  
  export default Input_screan