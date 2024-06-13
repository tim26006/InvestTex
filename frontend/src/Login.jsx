import React, { useState } from 'react';
import { Input, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate function
import { Navigate } from 'react-router-dom'; // Import Navigate component
import './Login.css';
import { Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function Login() {
  const navigate = useNavigate(); // Use the useNavigate function to redirect users
  const antIcon = <LoadingOutlined style={{ fontSize: 100, color: 'red' }} spin />;
  const [isLoading, setIsLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null); // State for error alert



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize isAuthenticated

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      const { access_token } = response.data; // Extract access_token from response
      sessionStorage.setItem('access_token', access_token); // Store access_token in localStorage
      setIsAuthenticated(true);
      navigate('/personal');
    } catch (error) {
      console.error('Error while making the request:', error);
      if (error.response && error.response.status === 400) {
        setErrorAlert('Введены неверные данные');
      } else {
        setErrorAlert('Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.'); // Set error message
      }
      // Handle login error
    } finally {
    setIsLoading(false); // Установите isLoading в false после завершения авторизации
  }
};

  // If isAuthenticated is true, redirect the user to PersonalArea
  if (isAuthenticated) {
    return <Navigate to="/personal" />;
  }

  return (
    <div className='Window_login'>
      {errorAlert && <Alert message={errorAlert} type="error"/>}
      <h1>Вход</h1>
      <div>
      <div className='text'>
        <p>Возможность для зарегистрированных пользователей:</p>
        <li>Сохранять историю запросов</li>
        <li className='double_li'>Скачивать полные отчеты</li>
      </div>
        <Input placeholder="Логин" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <Input  type="password"  placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
      <Button type="primary" onClick={handleLogin}>
          {isLoading ? <Spin indicator={antIcon} /> : 'Вход'} 
        </Button>
      <div className='url'><a href='/reg'>Еще не регистрировались?</a></div>
      </div>
    </div>
  );
}

export default Login;
