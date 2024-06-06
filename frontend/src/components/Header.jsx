import { useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    
    const handleClickRegistration = () => {
        navigate('/login');
        console.log("Переход на страницу регистарции");
    };

    return (
        <div className='header'>
            <Button type="primary">Авторизация</Button>
            <Button type="primary" onClick={handleClickRegistration}>Регистрация</Button>
        </div>
    );
}

export default Header;