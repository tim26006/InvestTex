import React, { useState } from 'react';
import { Input, Card } from "antd";
import send_img from './img/send.png';
import axios from 'axios'

function Input_screan() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleClick = () => {
        // Добавляем новое сообщение к списку сообщений
        const newMessage = { text: inputValue, id: Date.now() };
        setMessages([...messages, newMessage]);
        // Очищаем поле ввода после отправки

        // Отправляем сообщение на бэкенд
        axios.post('/api/messages', newMessage)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));

        setInputValue('');
    };

    return (
        <div className='input'>
            <div className="messages">
                {messages.map(message => (
                    <Card key={message.id} style={{ marginBottom: 10 }}>
                        <p>{message.text}</p>
                    </Card>
                ))}
            </div>
            <div className="input-wrapper">
                <Input
                    placeholder="Опишите, что вам необходимо...."
                    style={{ fontWeight: 'bold' }}
                    value={inputValue}
                    onChange={handleChange}
                />
                <button className='send_btn' onClick={handleClick}>
                    <img className='send_img' src={send_img} alt="Send" />
                </button>
            </div>
        </div>
    );
}

export default Input_screan;
