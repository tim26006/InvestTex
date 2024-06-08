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
            setError(true); 
            return; 
        }
        setError(false);

        const newMessage = { text: inputValue, source: "Пользователь" };
        setMessages([...messages, newMessage]);
         const delay = { text: "Вас понял! Ищу площадку......", source: "Бот"};
          setMessages(prevMessages => [...prevMessages, delay]);


        axios.post('http://127.0.0.1:8000/api/messages', newMessage, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data);
            const resp = { text: response.data["response"], source: "Бот"};
            setMessages(prevMessages => [...prevMessages, resp]);

        })
        .catch(error => {
            console.error(error);
        });

        setInputValue('');
    };

    const modalContent = (
        <>
          <h2 className="modal-title">Как написать классный промт?</h2>
          <ul className="modal-list">
            <li className="modal-item">Опишите контекст задачи</li>
            <li className="modal-item">Задайте вопрос или опишите задачу</li>
            <li className="modal-item">Будьте конкретными</li>
          </ul>
          <p className="modal-title">Пример промпта:</p>
          <p className="modal-text">
            Разработайте комплексную стратегию инвестиций в недвижимое имущество, фокусируясь на преимуществах и рисках инвестирования 
            в жилые и коммерческие объекты. Внимательно изучите факторы, такие как рыночные тренды, управление имуществом и налоговые последствия. 
            Дайте детальное анализа потенциальных доходов от инвестиций и оптимального распределения 
            средств между различными классами активов.
          </p>
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
                            <p className={`message-label ${message.source === "Бот" ? 'bot' : ''}`}>{message.source}</p>
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
                        <FiSend size={20} color="#3390ec" />
                </button>
                <button className='help_button' onClick={openModal}>
                        <IoMdHelp size={24} color="#3390ec"/>
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
