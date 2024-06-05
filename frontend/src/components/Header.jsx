import { useState } from 'react'
import { Button } from 'antd';
import logo from './img/image_1.png';





function Header() {
    const [count, setCount] = useState(0)
  
    return (
      <div className='header'>
            <img  src={logo} alt="Your Image" />
          <Button type="primary">Авторизация</Button>
         <Button type="primary">Регистрация</Button>
      </div>
    )
  }
  
  export default Header