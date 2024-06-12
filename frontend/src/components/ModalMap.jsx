import React, { useState } from 'react';
import Modal from 'react-modal';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Pagination, Button } from "antd";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiHomeAlt2 } from "react-icons/bi";
import { FaRubleSign, FaExternalLinkAlt, FaRegHandshake, FaFireAlt } from "react-icons/fa";
import { IoWaterOutline } from "react-icons/io5";
import { FcElectricity } from "react-icons/fc";

const MapModal = ({ isOpen, onRequestClose, mapData, mapDataone, mapDatatwo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const coordinates = mapData ? mapData["Координаты (точка)"] : "Координаты";
    let arr_coordinates = coordinates.split(',');
    arr_coordinates.reverse();
    const type = mapData ? mapData["Формат площадки"] : "Формат";
    const typeMarket = mapData ? mapData["Форма сделки"] : "Форма";
    const placeName = mapData ? mapData["Название площадки"] : "Название";
    const adress = mapData ? mapData["Адрес объекта"] : "Адрес";
    const bid = mapData ? mapData["Ссылка на форму подачи заявки"] : "URL";
    const img = mapData ? mapData["Фотографии объекта"]:"Фото";
    const splittedImg = img.split("https://").filter(Boolean).map(url => "https://" + url);
    let electricity = "Электричество";
    let water = "Вода";
    let gas = "Газ";
    let S = "Площадь";
    let cadastrNumber = "Номер";
    let price = "Цена";

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (typeMarket === 'Продажа через аукцион') {
        price = mapData ? mapData["Порядок определения стоимости"] : "Цена";
    }
    if (typeMarket === 'Аренда') {
        price = mapData ? mapData["Стоимость объекта, руб. (покупки или месячной аренды)"] : "Цена";
    }
    if (typeMarket === 'Аренда через аукцион') {
        price = mapData ? mapData["Порядок определения стоимости"] : "Цена";
    }
    if (type === "Земельный участок") {
        cadastrNumber = mapData ? mapData["Кадастровый номер ЗУ"] : "Номер";
        S = mapData ? mapData["Свободная площадь ЗУ, га"] : "Площадь";
        water = mapData ? mapData["Водоснабжение Наличие (Да/Нет)"] : "Вода";
        electricity = mapData ? mapData["Электроснабжение Наличие (Да/Нет)"] : "Электро";
        gas = mapData ? mapData["Газоснабжение Наличие (Да/Нет)"] : "Газ";
    }
    if (type === "Помещение") {
        cadastrNumber = mapData ? mapData["Кадастровый номер здания, сооружения, помещения"] : "Номер";
        S = mapData ? mapData["Свободная площадь здания, сооружения, помещения, кв. м"] : "Площадь";
        gas = mapData ? mapData["Газоснабжение Наличие (Да/Нет)"] : "Газ";
        water = mapData ? mapData["Водоснабжение Наличие (Да/Нет)"] : "Вода";
        electricity = mapData ? mapData["Электроснабжение Наличие (Да/Нет)"] : "Электро";
    }


    const coordinates1 = mapDataone  ? mapDataone ["Координаты (точка)"] : "Координаты";
    let arr_coordinates1 = coordinates1.split(',');
    arr_coordinates1.reverse();
    const type1 = mapDataone  ? mapDataone["Формат площадки"] : "Формат";
    const typeMarket1 = mapDataone  ? mapDataone["Форма сделки"] : "Форма";
    const placeName1 = mapDataone  ? mapDataone["Название площадки"] : "Название";
    const adress1 = mapDataone  ? mapDataone["Адрес объекта"] : "Адрес";
    const bid1 = mapDataone  ? mapDataone["Ссылка на форму подачи заявки"] : "URL";
    let electricity1 = "Электричество";
    let water1 = "Вода";
    let gas1 = "Газ";
    let S1 = "Площадь";
    let cadastrNumber1 = "Номер";
    let price1 = "Цена";

    if (typeMarket === 'Продажа через аукцион') {
        price = mapDataone  ? mapDataone["Порядок определения стоимости"] : "Цена";
    }
    if (typeMarket === 'Аренда') {
        price = mapDataone  ? mapDataone["Стоимость объекта, руб. (покупки или месячной аренды)"] : "Цена";
    }
    if (typeMarket === 'Аренда через аукцион') {
        price = mapDataone ? mapDataone["Порядок определения стоимости"] : "Цена";
    }
    if (type === "Земельный участок") {
        cadastrNumber = mapDataone ? mapDataone["Кадастровый номер ЗУ"] : "Номер";
        S = mapDataone ? mapDataone["Свободная площадь ЗУ, га"] : "Площадь";
        water = mapDataone ? mapDataone["Водоснабжение Наличие (Да/Нет)"] : "Вода";
        electricity = mapDataone ? mapDataone["Электроснабжение Наличие (Да/Нет)"] : "Электро";
        gas = mapDataone ? mapDataone["Газоснабжение Наличие (Да/Нет)"] : "Газ";
    }
    if (type === "Помещение") {
        cadastrNumber = mapDataone ? mapDataone["Кадастровый номер здания, сооружения, помещения"] : "Номер";
        S = mapDataone ? mapDataone["Свободная площадь здания, сооружения, помещения, кв. м"] : "Площадь";
        gas = mapDataone ? mapDataone["Газоснабжение Наличие (Да/Нет)"] : "Газ";
        water = mapDataone ? mapDataone["Водоснабжение Наличие (Да/Нет)"] : "Вода";
        electricity = mapDataone ? mapDataone["Электроснабжение Наличие (Да/Нет)"] : "Электро";
    }


    const coordinates2 = mapDatatwo  ? mapDatatwo["Координаты (точка)"] : "Координаты";
    let arr_coordinates2 = coordinates2.split(',');
    arr_coordinates2.reverse();
    const type2 = mapDatatwo  ? mapDatatwo["Формат площадки"] : "Формат";
    const typeMarket2 = mapDatatwo  ? mapDatatwo["Форма сделки"] : "Форма";
    const placeName2 = mapDatatwo  ? mapDatatwo["Название площадки"] : "Название";
    const adress2 = mapDatatwo  ? mapDatatwo["Адрес объекта"] : "Адрес";
    const bid2 = mapDatatwo  ? mapDatatwo["Ссылка на форму подачи заявки"] : "URL";
    let electricity2 = "Электричество";
    let water2 = "Вода";
    let gas2 = "Газ";
    let S2 = "Площадь";
    let cadastrNumber2 = "Номер";
    let price2 = "Цена";

    if (typeMarket === 'Продажа через аукцион') {
        price = mapDatatwo  ? mapDatatwo["Порядок определения стоимости"] : "Цена";
    }
    if (typeMarket === 'Аренда') {
        price = mapDatatwo  ? mapDatatwo["Стоимость объекта, руб. (покупки или месячной аренды)"] : "Цена";
    }
    if (typeMarket === 'Аренда через аукцион') {
        price = mapDatatwo ? mapDatatwo["Порядок определения стоимости"] : "Цена";
    }
    if (type === "Земельный участок") {
        cadastrNumber = mapDatatwo ? mapDatatwo["Кадастровый номер ЗУ"] : "Номер";
        S = mapDatatwo ? mapDatatwo["Свободная площадь ЗУ, га"] : "Площадь";
        water = mapDatatwo ? mapDatatwo["Водоснабжение Наличие (Да/Нет)"] : "Вода";
        electricity = mapDatatwo ? mapDatatwo["Электроснабжение Наличие (Да/Нет)"] : "Электро";
        gas = mapDatatwo ? mapDatatwo["Газоснабжение Наличие (Да/Нет)"] : "Газ";
    }
    if (type === "Помещение") {
        cadastrNumber = mapDatatwo ? mapDatatwo["Кадастровый номер здания, сооружения, помещения"] : "Номер";
        S = mapDatatwo ? mapDatatwo["Свободная площадь здания, сооружения, помещения, кв. м"] : "Площадь";
        gas = mapDatatwo ? mapDatatwo["Газоснабжение Наличие (Да/Нет)"] : "Газ";
        water = mapDatatwo ? mapDatatwo["Водоснабжение Наличие (Да/Нет)"] : "Вода";
        electricity = mapDatatwo ? mapDatatwo["Электроснабжение Наличие (Да/Нет)"] : "Электро";
    }



    let content;
    switch (currentPage) {
        case 1:
            content = (
                <>

                    <h1 className='title_map'>{placeName}</h1>
                     <img src={splittedImg[0]}></img>
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
            content = (
                <>
                    <h1 className='title_map'>{placeName1}</h1>
                    <YMaps>
                        <Map
                            className="custom-map"
                            defaultState={{
                                center: arr_coordinates1, // Устанавливаем центр карты в координаты маркера
                                zoom: 18, // Устанавливаем желаемый уровень масштабирования
                                controls: ["zoomControl", "fullscreenControl"],
                            }}
                            modules={["control.ZoomControl", "control.FullscreenControl"]}
                        >
                            {mapData && (
                                <Placemark
                                    geometry={arr_coordinates1}
                                    properties={{
                                        balloonContent: "",
                                    }}
                                    modules={["geoObject.addon.balloon"]}
                                />
                            )}
                        </Map>
                    </YMaps>
                    <a href={`https://yandex.ru/maps/?panorama[point]=${arr_coordinates1[0]},${arr_coordinates1[1]}`} target="_blank" rel="noopener noreferrer">
                        <Button className='button_check_panorama' type="primary">Посмотреть панораму</Button>
                    </a>

                    <p className="descriptionMap" style={{ fontFamily: 'Arial', fontSize: '20px' }}>
                        <li className="vertical-list-item">
                            <HiOutlineLocationMarker size={25} color="#ef0f33" />
                            <div>{adress1}</div>
                        </li>
                        <li className="vertical-list-item">
                            <BiHomeAlt2 size={25} />
                            <div>{type1}</div>
                        </li>
                        <li className="vertical-list-item">
                            <FaRegHandshake size={25} />
                            <div>{typeMarket1}</div>
                        </li>
                        <li className="vertical-list-item">
                            <div>{price1}</div>
                            <FaRubleSign size={20} />
                        </li>
                        <li className="vertical-list-item">
                            <a href={bid1} target="_blank" rel="noopener noreferrer">
                                <FaExternalLinkAlt size={25} color='#ef0f33' />
                            </a>
                        </li>
                        <li className="vertical-list-item">
                            <div>Кадастровый номер: {cadastrNumber1}</div>
                        </li>
                        <li className="vertical-list-item">
                            <div>Площадь: {S1}</div>
                        </li>
                        <li className="vertical-list-item">
                            <FaFireAlt />
                            <div>{gas1}</div>
                        </li>
                        <li className="vertical-list-item">
                            <IoWaterOutline size={25} />
                            <div>{water1}</div>
                        </li>
                        <li className="vertical-list-item">
                            <FcElectricity />
                            <div>{electricity1}</div>
                        </li>
                    </p>

                </>
            );
            break;
        case 3:
            content = (
                <>
                    <h1 className='title_map'>{placeName2}</h1>
                    <YMaps>
                        <Map
                            className="custom-map"
                            defaultState={{
                                center: arr_coordinates2, // Устанавливаем центр карты в координаты маркера
                                zoom: 18, // Устанавливаем желаемый уровень масштабирования
                                controls: ["zoomControl", "fullscreenControl"],
                            }}
                            modules={["control.ZoomControl", "control.FullscreenControl"]}
                        >
                            {mapData && (
                                <Placemark
                                    geometry={arr_coordinates2}
                                    properties={{
                                        balloonContent: "",
                                    }}
                                    modules={["geoObject.addon.balloon"]}
                                />
                            )}
                        </Map>
                    </YMaps>
                    <a href={`https://yandex.ru/maps/?panorama[point]=${arr_coordinates2[0]},${arr_coordinates2[1]}`} target="_blank" rel="noopener noreferrer">
                        <Button className='button_check_panorama' type="primary">Посмотреть панораму</Button>
                    </a>

                    <p className="descriptionMap" style={{ fontFamily: 'Arial', fontSize: '20px' }}>
                        <li className="vertical-list-item">
                            <HiOutlineLocationMarker size={25} color="#ef0f33" />
                            <div>{adress2}</div>
                        </li>
                        <li className="vertical-list-item">
                            <BiHomeAlt2 size={25} />
                            <div>{type2}</div>
                        </li>
                        <li className="vertical-list-item">
                            <FaRegHandshake size={25} />
                            <div>{typeMarket2}</div>
                        </li>
                        <li className="vertical-list-item">
                            <div>{price2}</div>
                            <FaRubleSign size={20} />
                        </li>
                        <li className="vertical-list-item">
                            <a href={bid2} target="_blank" rel="noopener noreferrer">
                                <FaExternalLinkAlt size={25} color='#ef0f33' />
                            </a>
                        </li>
                        <li className="vertical-list-item">
                            <div>Кадастровый номер: {cadastrNumber2}</div>
                        </li>
                        <li className="vertical-list-item">
                            <div>Площадь: {S2}</div>
                        </li>
                        <li className="vertical-list-item">
                            <FaFireAlt />
                            <div>{gas2}</div>
                        </li>
                        <li className="vertical-list-item">
                            <IoWaterOutline size={25} />
                            <div>{water2}</div>
                        </li>
                        <li className="vertical-list-item">
                            <FcElectricity />
                            <div>{electricity2}</div>
                        </li>
                    </p>

                </>
            );
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
                     <div className='button_compare'>Сравнить</div>
        </Modal>
    );
};

export default MapModal;
