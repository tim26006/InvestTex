import { useState } from 'react'
import { Button } from 'antd';






function Header() {
    const [count, setCount] = useState(0)
  
    return (
      <div className='header'>
          <Button type="primary">Авторизация</Button>
         <Button type="primary">Регистрация</Button>
      </div>
    )
  }
  
  export default Header