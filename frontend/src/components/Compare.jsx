import React, { useState, useEffect } from 'react';
import { Modal, Button, Tooltip, Spin } from 'antd';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiHomeAlt2 } from "react-icons/bi";
import { FaRubleSign, FaExternalLinkAlt, FaRegHandshake, FaFireAlt } from "react-icons/fa";
import { IoWaterOutline } from "react-icons/io5";
import { FcElectricity } from "react-icons/fc";
import { TbLetterS  } from "react-icons/tb";
import { BsLightbulb } from "react-icons/bs";
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import { LuLoader } from "react-icons/lu";


function Compare ({ isOpen, onRequestClose, data1, data2, data3 })  {

    const token = sessionStorage.getItem('access_token');
    const [selectToken, setSelectToken] = useState(null);
    const [selectedObject1, setSelectedObject1] = useState(false);
  const [selectedObject2, setSelectedObject2] = useState(false);
  const [selectedObject3, setSelectedObject3] = useState(false);
    const [reportData, setReportData] = useState(null);
    const [compareData, setCompareData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
const handleTooltipToggle = () => {
  setIsTooltipVisible(!isTooltipVisible);
};

  useEffect(() => {
    if (isOpen) {
        setIsLoading(true);
      const dataToSend = {
        "data1": [data1["Название площадки"], data1["Стоимость объекта, руб. (покупки или месячной аренды)"], data1["Свободная площадь здания, сооружения, помещения, кв. м"], data1["Форма сделки"] ],
        "data2": [data2["Название площадки"], data2["Стоимость объекта, руб. (покупки или месячной аренды)"], data2["Свободная площадь здания, сооружения, помещения, кв. м"], data2["Форма сделки"] ],
        "data3": [data3["Название площадки"], data3["Стоимость объекта, руб. (покупки или месячной аренды)"], data3["Свободная площадь здания, сооружения, помещения, кв. м"], data3["Форма сделки"]]
      };

      axios.post('http://127.0.0.1:8000/api/compare', dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('Data sent successfully', response.data);
           setCompareData(response.data.message);
        })
        .catch(error => {
          console.error('There was an error!', error);
        })
        .finally(() => {
          setIsLoading(false); // Устанавливаем isLoading в false после завершения запроса
            });
    }
  }, [isOpen, data1, data2, data3]);
  useEffect(() => {
    if (token) {
      fetch('http://localhost:8000/api/user_info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setUserInfo(data))
      .catch(error => console.error('Error fetching user info:', error));
    }
  }, [token]);

        const saveReport =() =>{





            }

        const handleReportGeneration = () => {
        const selectedData = [];
        if (selectedObject1) selectedData.push(data1);
        if (selectedObject2) selectedData.push(data2);
        if (selectedObject3) selectedData.push(data3);

        if (selectedData.length > 0) {
            setIsLoading(true);

            axios.post('http://127.0.0.1:8000/api/report', selectedData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log('Report generated successfully', response.data.report_link);
                    setReportData(response.data.report_link);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    const placeName1 = data1 ? data1["Название площадки"] : "Название";
    const placeName2= data2 ? data2["Название площадки"] : "Название";
    const placeName3= data3 ? data3["Название площадки"] : "Название";
    const img1 = data1 ? data1["Фотографии объекта"]:"Фото";
    const splittedImg1 = img1.split("https://").filter(Boolean).map(url => "https://" + url);
    const img2 = data2 ? data2["Фотографии объекта"]:"Фото";
    const splittedImg2 = img2.split("https://").filter(Boolean).map(url => "https://" + url);
    const img3 = data3 ? data3["Фотографии объекта"]:"Фото";
    const splittedImg3 = img3.split("https://").filter(Boolean).map(url => "https://" + url);

    let price1 = "Цена"
    let price2 = "Цена"
    let price3 = "Цена"
    let S1 = "Площадь";
    let S2 = "Площадь";
    let S3 = "Площадь";
    const type1 = data1 ? data1["Формат площадки"] : "Формат";
    const type2 = data2 ? data2["Формат площадки"] : "Формат";
    const type3 = data3 ? data3["Формат площадки"] : "Формат";
    const typeMarket1 =data1 ? data1["Форма сделки"] : "Форма";
    const typeMarket2 = data2 ? data2["Форма сделки"] : "Форма";
    const typeMarket3 = data3 ? data3["Форма сделки"] : "Форма";
    let electricity1 = "Электричество";
    let water1 = "Вода";
    let gas1 = "Газ";
    let electricity2 = "Электричество";
    let water2 = "Вода";
    let gas2 = "Газ";
    let electricity3 = "Электричество";
    let water3 = "Вода";
    let gas3 = "Газ";

    if (typeMarket1 === 'Продажа через аукцион') {
      price1 = data1 ? data1["Порядок определения стоимости"] : "Цена";
      price1 = price1.replace("Стоимость определяется в ходе проведения торгов.", "");
    }
    if (typeMarket1 === 'Аренда') {
      price1 = data1 ? data1["Стоимость объекта, руб. (покупки или месячной аренды)"] : "Цена";
    }
    if (typeMarket1 === 'Аренда через аукцион') {
       price1 = data1 ? data1["Порядок определения стоимости"] : "Цена";
    }


   if (typeMarket2 === 'Продажа через аукцион') {
       price2 = data2 ? data2["Порядок определения стоимости"] : "Цена";
       price2 = price2.replace("Стоимость определяется в ходе проведения торгов.", "");
    }
    if (typeMarket2 === 'Аренда') {
      price2 = data2 ? data2["Стоимость объекта, руб. (покупки или месячной аренды)"] : "Цена";
    }
    if (typeMarket2 === 'Аренда через аукцион') {
      price2 = data2 ? data2["Порядок определения стоимости"] : "Цена";
    }


    if (typeMarket3 === 'Продажа через аукцион') {
        price3 = data3 ? data3["Порядок определения стоимости"] : "Цена";
        price3 = price3.replace("Стоимость определяется в ходе проведения торгов.", "");
      }
      if (typeMarket3 === 'Аренда') {
        price3 = data3 ? data3["Стоимость объекта, руб. (покупки или месячной аренды)"] : "Цена";
      }
      if (typeMarket3 === 'Аренда через аукцион') {
        price3 = data3 ? data3["Порядок определения стоимости"] : "Цена";
      }


      if (type1 === "Земельный участок") {
        S1 = data1 ? data1["Свободная площадь ЗУ, га"] : "Площадь";
        water1 = data1 ? data1["Водоснабжение Наличие (Да/Нет)"] : "Вода";
        electricity1 = data1 ? data1["Электроснабжение Наличие (Да/Нет)"] : "Электро";
        gas1 = data1 ? data1["Газоснабжение Наличие (Да/Нет)"] : "Газ";
    }
    if (type1 === "Помещение") {
        S1 = data1 ? data1["Свободная площадь здания, сооружения, помещения, кв. м"] : "Площадь";
        gas1 = data1 ? data1["Газоснабжение Наличие (Да/Нет)"] : "Газ";
        water1 = data1 ? data1["Водоснабжение Наличие (Да/Нет)"] : "Вода";
        electricity1 = data1 ? data1["Электроснабжение Наличие (Да/Нет)"] : "Электро";
    }

    if (type2 === "Земельный участок") {
      S2 = data2 ? data2["Свободная площадь ЗУ, га"] : "Площадь";
      water2 = data2 ? data2["Водоснабжение Наличие (Да/Нет)"] : "Вода";
      electricity2 = data2 ? data2["Электроснабжение Наличие (Да/Нет)"] : "Электро";
      gas2 = data2 ? data2["Газоснабжение Наличие (Да/Нет)"] : "Газ";
  }
  if (type2 === "Помещение") {
      S2 = data2 ? data2["Свободная площадь здания, сооружения, помещения, кв. м"] : "Площадь";
      gas2 = data2 ? data2["Газоснабжение Наличие (Да/Нет)"] : "Газ";
      water2 = data2 ? data2["Водоснабжение Наличие (Да/Нет)"] : "Вода";
      electricity2 = data2 ? data2["Электроснабжение Наличие (Да/Нет)"] : "Электро";
  }


  if (type3 === "Земельный участок") {
    S3 = data3 ? data3["Свободная площадь ЗУ, га"] : "Площадь";
    water3 = data3 ? data3["Водоснабжение Наличие (Да/Нет)"] : "Вода";
    electricity3 = data3 ? data3["Электроснабжение Наличие (Да/Нет)"] : "Электро";
    gas3 = data3 ? data3["Газоснабжение Наличие (Да/Нет)"] : "Газ";
}
if (type3 === "Помещение") {
    S3 = data3 ? data3["Свободная площадь здания, сооружения, помещения, кв. м"] : "Площадь";
    gas3 = data3 ? data3["Газоснабжение Наличие (Да/Нет)"] : "Газ";
    water3 = data3 ? data3["Водоснабжение Наличие (Да/Нет)"] : "Вода";
    electricity3 = data3 ? data3["Электроснабжение Наличие (Да/Нет)"] : "Электро";
}



  return (
    <>

      <Modal   visible={isOpen} onOk={onRequestClose} width={1600}  height={800}  onCancel={onRequestClose} footer={null} closeIcon={null}>
          <div className="container">

                <div className="object">
                    <div className="titleblock"> <p className="title">{placeName1}</p></div>
                     <img className="img" src={splittedImg1[0]}></img>
                     <div className="typeobject">
                    <div><BiHomeAlt2 size={20} /> Тип постройки: {type1}</div>
                    <div><FaRegHandshake size={20} /> Форма сделки: {typeMarket1}</div>
                    <div><FaRubleSign size={20} /> Цена: {price1}</div>
                    <div><TbLetterS size={20} /> Площадь: {S1}</div>
                    <div><IoWaterOutline size={20} /> Наличие водоснабжения: {water1}</div>
                    <div><FcElectricity /> Наличие электроснабжения: {electricity1}</div>
                    <div><FaFireAlt /> Наличие газоснабжения: {gas1}</div>
                    <Button
                        type={selectedObject1 ? "primary" : "default"}
                        onClick={() => setSelectedObject1(!selectedObject1)}
                    >
                        Выбрать объект
                    </Button>
                    </div>

                 </div>

                 <div className="line1"></div>

                 <div className="object">
                      <div className="titleblock"> <p className="title">{placeName2}</p></div>
                     <img className="img" src={splittedImg2[0]}></img>
                     <div className="typeobject">
                    <div><BiHomeAlt2 size={20} /> Тип постройки: {type2}</div>
                    <div><FaRegHandshake size={20} /> Форма сделки: {typeMarket2}</div>
                    <div><FaRubleSign size={20} /> Цена: {price2}</div>
                    <div><TbLetterS size={20} /> Площадь: {S2}</div>
                    <div><IoWaterOutline size={20} /> Наличие водоснабжения: {water2}</div>
                    <div><FcElectricity /> Наличие электроснабжения: {electricity2}</div>
                    <div><FaFireAlt /> Наличие газоснабжения: {gas2}</div>
                    <Button
                        type={selectedObject2 ? "primary" : "default"}
                        onClick={() => setSelectedObject2(!selectedObject2)}
                    >
                        Выбрать объект
                    </Button>
                    </div>
                </div>

                <div className="line1"></div>

                 <div className="object">
                    <div className="titleblock"> <p className="title">{placeName3}</p></div>
                    <img className="img" src={splittedImg3[0]}></img>
                    <div className="typeobject">
                    <div><BiHomeAlt2 size={20} /> Тип постройки: {type3}</div>
                    <div><FaRegHandshake size={20} /> Форма сделки: {typeMarket3}</div>
                    <div><FaRubleSign size={20} /> Цена: {price3}</div>
                    <div><TbLetterS size={20} /> Площадь: {S3}</div>
                    <div><IoWaterOutline size={20} /> Наличие водоснабжения: {water3}</div>
                    <div><FcElectricity /> Наличие электроснабжения: {electricity3}</div>
                    <div><FaFireAlt /> Наличие газоснабжения: {gas3}</div>
                    <Button
                        type={selectedObject3 ? "primary" : "default"}
                        onClick={() => setSelectedObject3(!selectedObject3)}
                    >
                        Выбрать объект
                    </Button>
                    </div>
                </div>
        </div>
               <div className='report'>

  {compareData && compareData !== '' ? (
    <Tooltip
      title={
        isLoading ? (
          <div><Spin indicator={<LoadingOutlined style={{ fontSize: 48, color:"red" }} spin />} /></div>
        ) : (
          JSON.stringify(compareData, null, 2)
        )
      }
      trigger="click"
      open={isTooltipVisible}
      onVisibleChange={handleTooltipToggle}
    >
      <Button className='REPORT_BUTTON' onClick={handleTooltipToggle}>
        {isLoading ? 'Загрузка...' : (isTooltipVisible ? 'Спрятать' : 'Рекомендация')}
      </Button>
    </Tooltip>
  ) : null}
</div>



<div>
  {!token && reportData &&(
    <div className="link">
      <a className="link_text" href={reportData}>
        Скачать
      </a>
    </div>
  )}

  {token && reportData &&(
    <div className="link" onClick={saveReport}>
      <a className="link_text" href={reportData}>
        Сохранить в ЛК
      </a>
    </div>
  )}
</div>


            <div className="report_block">
                     <div className="button_report" onClick={handleReportGeneration}style={{ backgroundColor: selectedObject1 || selectedObject2 || selectedObject3 ? '#ef0f33' : '#fff' }}>Сформировать отчёт</div>
            </div>

      </Modal>

    </>
  );
};

export default Compare;