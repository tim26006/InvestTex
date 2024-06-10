import React from 'react';
import Modal from 'react-modal';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Pagination, Button } from "antd";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiHomeAlt2 } from "react-icons/bi";
import { FaRubleSign, FaExternalLinkAlt, FaRegHandshake, FaFireAlt } from "react-icons/fa";
import { IoWaterOutline } from "react-icons/io5";
import { FcElectricity } from "react-icons/fc";





const MapModal = ({ isOpen, onRequestClose, mapData }) => {
    const coordinates = mapData ? mapData["Координаты (точка)"] : "Коррдинаты";
    let arr_coordinates = coordinates.split(',');
    arr_coordinates.reverse()
    const type = mapData ? mapData["Формат площадки"] : "Формат";
    const typeMarket = mapData ? mapData["Форма сделки"] : "Форма";
    const placeName = mapData ? mapData["Название площадки"] : "Название";
    const adress = mapData ? mapData["Адрес объекта"] : "Адрес";
    const bid = mapData ? mapData["Ссылка на форму подачи заявки"] : "URL";
    let electricity = "Электричество"
    let water = "Вода"
    let gas = "Газ";
    let S = "Площадь"; 
    let cadastrNumber = "Номер"; 
    let price = "Цена"; 

    if (typeMarket === 'Продажа через аукцион'){
        price = mapData ? mapData["Порядок определения стоимости"] : "Цена";
    }
    if (typeMarket === 'Аренда'){
        price = mapData ? mapData["Стоимость объекта, руб. (покупки или месячной аренды)"] : "Цена";
    }
    if (typeMarket === 'Аренда через аукцион'){
        price = mapData ? mapData["Порядок определения стоимости"] : "Цена";
    }
    if (type === "Земельный участок"){
        cadastrNumber = mapData ? mapData["Кадастровый номер ЗУ"] : "Номер";
        S = mapData ? mapData["Свободная площадь ЗУ, га"] : "Площадь";
        water = mapData ? mapData["Водоснабжение Наличие (Да/Нет)"] : "Вода";
        electricity = mapData ? mapData["Электроснабжение Наличие (Да/Нет)"] : "Электро";
        gas = mapData ? mapData["Газоснабжение Наличие (Да/Нет)"] : "Газ";
    }
    if (type === "Помещение"){
        cadastrNumber = mapData ? mapData["Кадастровый номер здания, сооружения, помещения"] : "Номер";
        S = mapData ? mapData["Свободная площадь здания, сооружения, помещения, кв. м"] : "Площадь";
        gas = mapData ? mapData["Газоснабжение Наличие (Да/Нет)"] : "Газ";
        water = mapData ? mapData["Водоснабжение Наличие (Да/Нет)"] : "Вода";
        electricity = mapData ? mapData["Электроснабжение Наличие (Да/Нет)"] : "Электро";   
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modalMap">
            <h1 className='title_map'>{placeName}</h1>
            <YMaps>
                <Map
                    className="custom-map"
                    defaultState={{
                        center: arr_coordinates, // Устанавливаем центр карты в координаты маркера
                        zoom: 18, // Устанавливаем желаемый уровень масштабирования
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
        <div>{adress}</div>
    </li>
    <li className="vertical-list-item">
        <BiHomeAlt2 size={25} />
        <div>{type}</div>
    </li>
    <li className="vertical-list-item">
        <FaRegHandshake  size={25}/>
        <div>{typeMarket}</div>
    </li>
    <li className="vertical-list-item">
        <div>{price}</div>  
        <FaRubleSign size={20} />
    </li>
    <li className="vertical-list-item"> Подать заявку
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

            <div className="pagination-center">
                <Pagination defaultCurrent={1} total={30} />
            </div>
        </Modal>
    );
};

export default MapModal;
