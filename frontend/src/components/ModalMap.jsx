import React, { useState } from 'react';
import Modal from 'react-modal';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Pagination, Button } from "antd";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiHomeAlt2 } from "react-icons/bi";
import { FaRubleSign, FaExternalLinkAlt, FaRegHandshake, FaFireAlt } from "react-icons/fa";
import { IoWaterOutline } from "react-icons/io5";
import { FcElectricity } from "react-icons/fc";

const MapModal = ({ isOpen, onRequestClose, mapData }) => {
    
    const feature = mapData && mapData.features[0] ? JSON.parse(mapData.features[0]) : {};
    const coordinates = feature["Координаты (точка)"] ? feature["Координаты (точка)"] : "0,0";
    let arr_coordinates = coordinates.split(',').map(coord => parseFloat(coord)).reverse();
    const type = feature["Название площадки"] ? feature["Название площадки"] : "Название";
    const typeMarket = feature["Форма сделки"] ? feature["Форма сделки"] : "Форма сделки";
    const placeName = type;
    const address = feature["Адрес объекта"] ? feature["Адрес объекта"] : "Адрес";
    const bid = feature["Ссылка на форму подачи заявки"] ? feature["Ссылка на форму подачи заявки"] : "#";
    const electricity = feature["Электроснабжение Наличие (Да/Нет)"] ? feature["Электроснабжение Наличие (Да/Нет)"] : "Нет данных";
    const water = feature["Водоснабжение Наличие (Да/Нет)"] ? feature["Водоснабжение Наличие (Да/Нет)"] : "Нет данных";
    const gas = feature["Газоснабжение Наличие (Да/Нет)"] ? feature["Газоснабжение Наличие (Да/Нет)"] : "Нет данных";
    const S = feature["Свободная площадь здания, сооружения, помещения, кв. м"] ? feature["Свободная площадь здания, сооружения, помещения, кв. м"] : "Нет данных";
    const cadastrNumber = feature["Кадастровый номер здания, сооружения, помещения"] ? feature["Кадастровый номер здания, сооружения, помещения"] : "Нет данных";
    const price = feature["Стоимость объекта, руб. (покупки или месячной аренды)"] ? feature["Стоимость объекта, руб. (покупки или месячной аренды)"] : "Нет данных";

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    console.log("Все данные из mapData:", mapData);
    let content;
    switch (currentPage) {
        case 1:
            content = (
                <>
                    <h1 className='title_map'>{placeName}</h1>
                    <YMaps>
                        <Map
                            className="custom-map"
                            defaultState={{
                                center: arr_coordinates,
                                zoom: 18,
                                controls: ["zoomControl", "fullscreenControl"],
                            }}
                            modules={["control.ZoomControl", "control.FullscreenControl"]}
                        >
                            {mapData && (
                                <Placemark
                                    geometry={arr_coordinates}
                                    properties={{
                                        balloonContent: "",
                                    }}
                                    modules={["geoObject.addon.balloon"]}
                                />
                            )}
                        </Map>
                    </YMaps>
                    <a href={`https://yandex.ru/maps/?panorama[point]=${arr_coordinates[0]},${arr_coordinates[1]}`} target="_blank" rel="noopener noreferrer">
                        <Button className='button_check_panorama' type="primary">Посмотреть панораму</Button>
                    </a>

                    <p className="descriptionMap" style={{ fontFamily: 'Arial', fontSize: '20px' }}>
                        <li className="vertical-list-item">
                            <HiOutlineLocationMarker size={25} color="#ef0f33" />
                            <div>{address}</div>
                        </li>
                        <li className="vertical-list-item">
                            <BiHomeAlt2 size={25} />
                            <div>{type}</div>
                        </li>
                        <li className="vertical-list-item">
                            <FaRegHandshake size={25} />
                            <div>{typeMarket}</div>
                        </li>
                        <li className="vertical-list-item">
                            <div>{price}</div>
                            <FaRubleSign size={20} />
                        </li>
                        <li className="vertical-list-item">
                            <a href={bid} target="_blank" rel="noopener noreferrer">
                                <FaExternalLinkAlt size={25} color='#ef0f33' />
                            </a>
                        </li>
                        <li className="vertical-list-item">
                            <div>Кадастровый номер: {cadastrNumber}</div>
                        </li>
                        <li className="vertical-list-item">
                            <div>Площадь: {S}</div>
                        </li>
                        <li className="vertical-list-item">
                            <FaFireAlt />
                            <div>{gas}</div>
                        </li>
                        <li className="vertical-list-item">
                            <IoWaterOutline size={25} />
                            <div>{water}</div>
                        </li>
                        <li className="vertical-list-item">
                            <FcElectricity />
                            <div>{electricity}</div>
                        </li>
                    </p>
                </>
            );
            break;
        case 2:
            content = <h1>Привет</h1>;
            break;
        case 3:
            content = <h1>Пока</h1>;
            break;
        default:
            content = null;
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modalMap">
            {content}
            <div className="pagination-center">
                <Pagination defaultCurrent={1} total={30} onChange={handlePageChange} />
            </div>
        </Modal>
    );
};

export default MapModal;
