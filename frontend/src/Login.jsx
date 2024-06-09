import React, { useState } from 'react';
import { Card, Space, Input, Button } from 'antd';
import axios from 'axios'; // добавляем библиотеку axios для выполнения HTTP-запросов

const Login = () => {
  const [fio, setFio] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [inn, setInn] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    const data = {
      fio: fio,
      email: email,
      organization: organization,
      inn: inn,
      website: website,
      industry: industry,
      country: country,
      city: city,
      position: position,
      password: password
    };

    
    axios.post('http://localhost:8000/api/register', data)
      .then(response => {
        console.log(response.data);
        alert("успешно")
      })
      .catch(error => {
        console.error('Ошибка при выполнении запроса:', error);
        alert("не удалось")
      });
  };

  return (
    <Space direction="vertical" size={16}>
      <Card
        title={
          <div style={{ fontSize: '1.7rem' }}>
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
          <Input placeholder="ФИО" value={fio} onChange={e => setFio(e.target.value)} />
          <Input placeholder="Эл. почта" value={email} onChange={e => setEmail(e.target.value)} />
          <Input placeholder="Наименование организации" value={organization} onChange={e => setOrganization(e.target.value)} />
          <Input placeholder="ИНН" value={inn} onChange={e => setInn(e.target.value)} />
          <Input placeholder="Веб-сайт организации" value={website} onChange={e => setWebsite(e.target.value)} />
          <Input placeholder="Отрасль деятельности" value={industry} onChange={e => setIndustry(e.target.value)} />
          <Input placeholder="Страна" value={country} onChange={e => setCountry(e.target.value)} />
          <Input placeholder="Город" value={city} onChange={e => setCity(e.target.value)} />
          <Input placeholder="Должность" value={position} onChange={e => setPosition(e.target.value)} />
          <Input placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="primary" onClick={handleClick}>Подтвердить</Button>
        </div>
      </Card>
    </Space>
  );
};

export default Login;
