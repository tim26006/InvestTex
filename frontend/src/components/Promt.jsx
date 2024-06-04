import { useState } from 'react'
import { Card, Input, Button  } from 'antd';




function Promt() {
    const [count, setCount] = useState(0)
  
    return (
        <div className='card_promt'>
        <Card
      title="Введите данные"
      style={{
        width: 300,
        textAlign: 'center',
      }}
    >
      <Input placeholder="Данные"/>
      <Input placeholder="Данные"/>
      <Input placeholder="Данные"/>
      <Button type="primary" size="large">
         Генерация
      </Button>
    </Card>
    </div>
    )
  }
  
  export default Promt