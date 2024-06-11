import React, { useState } from 'react';
import { Card, Space, Input, Button } from 'antd';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

const Reg = () => {
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
  const [isCaptchaSuccessful, setIsCaptchaSuccess] = React.useState(false)

  function onChange(value) {
    setIsCaptchaSuccess(true)
    console.log("captcha value: ", value);
  }

  const handleClick = async () => { // Добавляем async
    const data = {
      fio,
      email,
      organization,
      inn,
      website,
      industry,
      country,
      city,
      position,
      password,
    };

    try {
        console.log(data)
      const response = await axios.post('http://localhost:8000/api/register', data);
      console.log(response.data);
      alert("успешно");
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      alert("не удалось");
    }
  };

  return (
    <Space direction="vertical" size={16}>
      <Card
        title={<div style={{ fontSize: '1.7rem' }}>Регистрация</div>}
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
        <Input placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="primary" onClick={handleClick}  disabled={!isCaptchaSuccessful}>Подтвердить</Button>
          <ReCAPTCHA
            sitekey={'6LemcvQpAAAAAJQiju9djqLGa8SmBRVEm9Z1X5lL'}
            onChange={onChange}
          />
        </div>
      </Card>
    </Space>
  );
};

export default Reg;