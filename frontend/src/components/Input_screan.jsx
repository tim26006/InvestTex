import React, { useState, useEffect, useRef } from 'react';
import { Input, Card, Space, Alert, Pagination  } from "antd";
import axios from 'axios';
import Modal from 'react-modal';
import { IoMdHelp } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';




function InputScreen() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [error, setError] = useState(false);

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
        const delayMessage = { text: "Вас понял! Ищу площадку......", source: "Бот" };
        setMessages(prevMessages => [...prevMessages, delayMessage]);

        axios.post('http://127.0.0.1:8000/api/messages', newMessage, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const botMessage = { text: response.data.response, source: "Бот" };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        })
        .catch(error => {
            console.error(error);
        });

        setInputValue('');
    };


    const PannellumViewer = ({ imageUrl }) => {
        const pannellumContainer = useRef(null);
      
        useEffect(() => {
          pannellum.viewer(pannellumContainer.current, {
            type: 'equirectangular',
            panorama: imageUrl,
            autoLoad: true,
          });
        }, [imageUrl]);
      
        return <div ref={pannellumContainer} style={{ width: '100%', height: '500px' }} />;
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
                    placeholder="Например: Я хочу инвестировать в автосервис...."
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

                        <Modal isOpen={isMapModalOpen} onRequestClose={closeMapModal} className="modalMap">
                <h1 className='title_map'>Название</h1>
                <div className="description-block">
                    <p className="descriptionMap">Характеристики</p>
                </div>
                <YMaps>
                    <Map
                        defaultState={{
                            center: [55.75, 37.57],
                            zoom: 9,
                            controls: ["zoomControl", "fullscreenControl"],
                        }}
                        modules={["control.ZoomControl", "control.FullscreenControl"]}
                    >
                        <Placemark
                            modules={["geoObject.addon.balloon"]}
                            defaultGeometry={[55.75, 37.57]}
                        />
                    </Map>
                </YMaps>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <a href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}>Москва</a>
                    <a href="https://yandex.ru/maps/213/moscow/geo/krasnaya_ploshchad/1520633025/?indoorLevel=1&ll=37.620941%2C55.753575&panorama%5Bdirection%5D=326.893977%2C1.000000&panorama%5Bfull%5D=true&panorama%5Bid%5D=1298161349_673227531_23_1443042000&panorama%5Bpoint%5D=37.621255%2C55.753498&panorama%5Bspan%5D=117.022349%2C60.000000&tab=panorama&utm_medium=mapframe&utm_source=maps&z=17" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}>Красная площадь в городе Москва — Яндекс Карты</a>
                    <iframe src="https://yandex.ru/map-widget/v1/?indoorLevel=1&ll=37.620941%2C55.753575&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNTIwNjMzMDI1EjnQoNC-0YHRgdC40Y8sINCc0L7RgdC60LLQsCwg0JrRgNCw0YHQvdCw0Y8g0L_Qu9C-0YnQsNC00YwiCg0dfBZCFaIDX0I%2C&panorama%5Bdirection%5D=326.893977%2C1.000000&panorama%5Bfull%5D=true&panorama%5Bid%5D=1298161349_673227531_23_1443042000&panorama%5Bpoint%5D=37.621255%2C55.753498&panorama%5Bspan%5D=117.022349%2C60.000000&tab=panorama&z=17" width="560" height="400" frameBorder="1" allowFullScreen="true" style={{ position: 'relative' }}></iframe>
                </div>
                <div className="pagination-center">
                    <Pagination defaultCurrent={1} total={30} />
                </div>
            </Modal>

                
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
