import React from 'react';
import Modal from 'react-modal';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Pagination } from "antd";

const MapModal = ({ isOpen, onRequestClose, mapData }) => {
    const coordinates = mapData ? mapData["Координаты (точка)"] : "Коррдинаты"; // Declare coordinates with const or let
    let arr_coordinates = coordinates.split(',');

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
                    defaultState={{
                        center: [55.75, 37.57],
                        zoom: 8,
                        controls: ["zoomControl", "fullscreenControl"],
                    }}
                    modules={["control.ZoomControl", "control.FullscreenControl"]}
                >
                    {mapData && (
                        <Placemark
                            geometry={arr_coordinates.reverse()}
                            properties={{
                                balloonContent: "",
                            }}
                            modules={["geoObject.addon.balloon"]}
                        />
                    )}
                </Map>
            </YMaps>
                <p className="descriptionMap">
                    <li>{adress} </li>
                    <li>{type}  </li>
                    <li>{typeMarket} </li>
                    <li>{price} </li>
                    <li>{bid}</li>
                    <li>{cadastrNumber}</li>
                    <li>{S}</li>
                    <li>{gas}</li>
                    <li>{water}</li>
                    <li>{electricity}</li>
                </p>

                <a href={`https://yandex.ru/maps/?panorama[point]=${arr_coordinates[1]},${arr_coordinates[0]}`} target="_blank" rel="noopener noreferrer">Панорама</a>


            <div className="pagination-center">
                <Pagination defaultCurrent={1} total={30} />
            </div>
        </Modal>
    );
};

export default MapModal;
