import React from 'react';
import Modal from 'react-modal';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Pagination } from "antd";

const MapModal = ({ isOpen, onRequestClose }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modalMap">
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
    );
};

export default MapModal;