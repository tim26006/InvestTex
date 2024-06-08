import React, { useState, useEffect } from 'react';
import { Input, Card, Space, Alert } from "antd";
import axios from 'axios';
import Modal from 'react-modal';
import { IoMdHelp } from "react-icons/io";
import { FiSend } from "react-icons/fi";

function InputScreen() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState(false); // Состояние для отображения ошибки

    useEffect(() => {
        Modal.setAppElement('#root'); // Установка корневого элемента вашего приложения
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleClick = () => {
        if (!inputValue.trim()) { 
            setError(true); // Если пустой ввод, установить состояние для отображения ошибки
            return; // Выйти из функции, не отправляя сообщение
        }

        // Очистить состояние ошибки, если ввод не пустой
        setError(false);

        const newMessage = { text: inputValue, source: "Пользователь" };
        setMessages([...messages, newMessage]);

        axios.post('http://127.0.0.1:8000/api/messages', newMessage, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data);
            const receivedMessage = { text: response.data["Hello"], source: "Бот"};
            setMessages(prevMessages => [...prevMessages, receivedMessage]);
        })
        .catch(error => {
            console.error(error);
        });

        setInputValue('');
    };

    const modalContent = (
        <>
          <h2>Заголовок модального окна</h2>
          <p>Текст модального окна</p>
          <button onClick={closeModal}>Закрыть</button>
        </>
      );

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
                        <FiSend size={20} />
                </button>
                <button className='help_button' onClick={openModal}>
                        <IoMdHelp size={24} />
                </button>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
                {modalContent}
            </Modal>

            {/* Отображение сообщения об ошибке, если есть */}
            {error && (
                <div className="centered-error">
        <Space direction="vertical" style={{ width: '100%' }}>
            <Alert  style={{ fontSize: 16 }} message="Введите сообщение" type="error" closable/>
        </Space>
                </div>
        )}

        </div>
    );
}

export default InputScreen;
