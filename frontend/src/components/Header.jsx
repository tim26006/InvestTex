import { useState } from 'react'
import logo from './img/logo.jpg';




function Header() {
    const [count, setCount] = useState(0)
  
    return (
        <div className="logo_promt">
          <img src={logo} alt="Your Image"/>
        </div>
    )
  }
  
  export default Header