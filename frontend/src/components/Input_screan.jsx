import React, { useState, useEffect } from 'react';
import { Input, Card, Space, Alert } from "antd";
import axios from 'axios';
import Modal from 'react-modal';
import { IoMdHelp } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import MapModal from './ModalMap';

function InputScreen() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [error, setError] = useState(false);
    const [mapData, setMapData] = useState(null);

    useEffect(() => {
        Modal.setAppElement('#root');
    }, []);

    const openHelpModal = () => {
        setIsHelpModalOpen(true);
    };

    const closeHelpModal = () => {
        setIsHelpModalOpen(false);
    };

    const openMapModal = () => {
        setIsMapModalOpen(true);
    };

    const closeMapModal = () => {
        setIsMapModalOpen(false);
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
        const delayMessage = { text: "Вас понял! Ищу площадки......", source: "Бот" };
        setMessages(prevMessages => [...prevMessages, delayMessage]);

        axios.post('http://127.0.0.1:8000/api/messages', newMessage, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            // Парсинг JSON-ответа
            const data = JSON.parse(response.data.response);

            // Сохранение данных для карты
            setMapData(data);

            // Создание сообщения с использованием значения "Название площадки"
            const botMessage = { text: data["Название площадки"], source: "Бот" };
            
            // Добавление нового сообщения в массив сообщений
            setMessages(prevMessages => [...prevMessages, botMessage]);
        })
        .catch(error => {
            console.error(error);
        });

        setInputValue('');
    };

    return (
        <div className='input'>
            <div className="messages">
                <div className='map'>
                    <button onClick={openMapModal}>Карта</button>
                </div>
                {messages.length === 0 ? (
                    <div className="welcome-message">Здравствуйте! Начните чат, введя сообщение ниже.</div>
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
                    placeholder="Что Вас интересует?"
                    style={{ fontWeight: 'bold' }}
                    value={inputValue}
                    onChange={handleChange}
                />
                <button className='send_btn' onClick={handleClick}>
                    <FiSend size={20} color="#3390ec" />
                </button>
                <button className='help_button' onClick={openHelpModal}>
                    <IoMdHelp size={24} color="#3390ec"/>
                </button>
            </div>

            <Modal isOpen={isHelpModalOpen} onRequestClose={closeHelpModal} className="modal">
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
            </Modal>

            <MapModal isOpen={isMapModalOpen} onRequestClose={closeMapModal} mapData={mapData} />

            {error && (
                <div className="centered-error">
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Alert style={{ fontSize: 16 }} message="Введите сообщение" type="error" closable/>
                    </Space>
                </div>
            )}
        </div>
    );
}

export default InputScreen;
