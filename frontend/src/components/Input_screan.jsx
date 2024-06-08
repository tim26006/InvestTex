import React, { useState, useEffect } from 'react';
import { Input, Card } from "antd";
import send_img from './img/send.png';
import axios from 'axios';
import faq_img from './img/faq.png';
import Modal from 'react-modal';

function InputScreen() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
        if (!inputValue.trim()) {  // Check if inputValue is empty or contains only whitespace
            return alert("Введите сообщение"); 
        }

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
          <h2>Обучение</h2>
          <p>Просто введи текст</p>
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
                    <img className='send_img' src={send_img} alt="Send" />
                </button>
                <button className='help_button' onClick={openModal}>
                    <img className="faq_img" src={faq_img} alt="FAQ" />
                </button>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
                {modalContent}
            </Modal>
        </div>
    );
}

export default InputScreen;
