import React from 'react';
import { Card, Space, Input, Button } from 'antd';


const handleClick = () => {
  alert("Эта кнопка пока не работает!");
};

const Login = () => (


<Space direction="vertical" size={16}>


    <Card
      title={
        <div style={{ fontSize: '1.7rem'}}>
        Регистрация
      </div>
      }
      align="center"
      style={{
        width: 500,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className='pool_info'>
      <Input placeholder="ФИО" />
      <Input placeholder="Эл. почта" />
      <Input placeholder="Наименование организации" />
      <Input placeholder="ИНН" />
      <Input placeholder="Веб-сайт организации" />
      <Input placeholder="Отрасль деятельности" />
      <Input placeholder="Страна" />
      <Input placeholder="Город" />
      <Input placeholder="Должность" />

      
      <Button type="primary"onClick={handleClick}>Подтвердить</Button>
      </div>
    </Card>
  </Space>
);
export default Login