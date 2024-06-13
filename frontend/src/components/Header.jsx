import { useState, useEffect } from 'react';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const token = sessionStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      fetch('http://localhost:8000/api/user_info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => setUserInfo(data))
      .catch(error => console.error('Error fetching user info:', error));
    }
  }, [token]);

  const handleClickRegistration = () => {
    navigate('/reg');
    console.log("Переход на страницу регистарции");
  };

  const handleClicklogin = () => {
    navigate('/login');
    console.log("Переход на страницу авторизации");
  };

  if (!token) {
    return (
      <div className='header'>
        <Button type="primary" onClick={handleClicklogin}>Авторизация</Button>
        <Button type="primary" onClick={handleClickRegistration}>Регистрация</Button>
      </div>
    );
  }

  return (

<a href="/personal" className="custom-link ">
  Личный кабинет
</a>

  );
}

export default Header;