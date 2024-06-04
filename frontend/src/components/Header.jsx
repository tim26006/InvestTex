import { useState } from 'react'





function Header() {
    const [count, setCount] = useState(0)
  
    return (
        <div>
        <img src="./img/log.jpg" alt="Your Image" />
        </div>
    )
  }
  
  export default Header