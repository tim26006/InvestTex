import { useState } from 'react'
import { Button } from 'antd';
import logo from './img/image_1.png';





function Header() {
    const [count, setCount] = useState(0)
  
    return (
      <div className='header'>
         <Button type="primary">Регистрация</Button>
         <Button type="primary">Авторизация</Button>
         <img src={logo} alt="Your Image" />
      </div>
    )
  }
  
  export default Header