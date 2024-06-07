import React, { useState } from 'react';
import { Input, Card } from "antd";
import send_img from './img/send.png';
import axios from 'axios';

function Input_screan() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    const handleChange = (e) => {
        setInputValue(e.target.value); // хук на ввод сообщения
    };

    const handleClick = () => { // хук на нажатие кнопки
        const newMessage = { text: inputValue, source: "Пользователь" }; // устанавливаем source как 
        setMessages([...messages, newMessage]); 

        //Отправка запроса в бек (сообщение)
        axios.post('http://127.0.0.1:8000/api/messages', newMessage, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data);
            // Отобразить сообщение из ответа в чате
            const receivedMessage = { text: response.data["Hello"], source: "Бот"}; // устанавливаем source как "bot"
            setMessages(prevMessages => [...prevMessages, receivedMessage]);
        })
        .catch(error => {
            console.error(error);
        });

        setInputValue('');
    };

    return (
        <div className='input'>
            <div className="messages">
                {messages.length === 0 ? (
                    <div className="welcome-message">Добро пожаловать! Начните чат, введя сообщение ниже.</div>
                ) : (
                    messages.map((message, index) => ( 
                        <Card key={index} style={{ marginBottom: 10 }}>
                            <p className='message-label'>{message.source}</p>
                            <p style={{ fontSize: 18 }}>
                                {message.text}
                            </p>
                        </Card>
                    ))
                )}
            </div>
            
            <div className="input-wrapper">
                <Input
                    placeholder="Например: Я хочу инвестировать в автосервис...."
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
