import { useState } from 'react'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();


    const handleClickRegistration = () => {
        navigate('/reg');
        console.log("Переход на страницу регистарции");
    };
    const handleClicklogin = () => {
        navigate('/login');
        console.log("Переход на страницу авторизации");
    };


    return (
        <div className='header'>
            <Button type="primary" onClick={handleClicklogin}>Авторизация</Button>
            <Button type="primary" onClick={handleClickRegistration}>Регистрация</Button>
        </div>
    );
}

export default Header;