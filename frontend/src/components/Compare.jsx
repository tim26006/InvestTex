import React, { useState } from 'react';
import { Button, Modal } from 'antd';

function Compare ({ isOpen, onRequestClose, data1, data2, data3 })  {

    const placeName1 = data1 ? data1["Название площадки"] : "Название";
    const placeName2= data2 ? data2["Название площадки"] : "Название";
    const placeName3= data3 ? data3["Название площадки"] : "Название";
    const img1 = data1 ? data1["Фотографии объекта"]:"Фото";
    const splittedImg1 = img1.split("https://").filter(Boolean).map(url => "https://" + url);
    const img2 = data2 ? data2["Фотографии объекта"]:"Фото";
    const splittedImg2 = img2.split("https://").filter(Boolean).map(url => "https://" + url);
    const img3 = data3 ? data3["Фотографии объекта"]:"Фото";
    const splittedImg3 = img3.split("https://").filter(Boolean).map(url => "https://" + url);

    let S1 = "Площадь";
    let S2 = "Площадь";
    let S3 = "Площадь";
    let cadastrNumber = "Номер";
    const type1 = data1 ? data1["Формат площадки"] : "Формат";
    const type2 = data2 ? data2["Формат площадки"] : "Формат";
    const type3 = data3 ? data3["Формат площадки"] : "Формат";
    const typeMarket1 =data1 ? data1["Форма сделки"] : "Форма";
    const typeMarket2 = data2 ? data2["Форма сделки"] : "Форма";
    const typeMarket3 = data3 ? data3["Форма сделки"] : "Форма";

    if (typeMarket1 === 'Продажа через аукцион') {
        price1 = data1 ? data1["Порядок определения стоимости"] : "Цена";
    }
    if (typeMarket1 === 'Аренда') {
      price1 = data1 ? data1["Стоимость объекта, руб. (покупки или месячной аренды)"] : "Цена";
    }
    if (typeMarket1 === 'Аренда через аукцион') {
       price1 = data1 ? data1["Порядок определения стоимости"] : "Цена";
    }


   if (typeMarket2 === 'Продажа через аукцион') {
       price2 = data2 ? data2["Порядок определения стоимости"] : "Цена";
    }
    if (typeMarket2 === 'Аренда') {
      price2 = data2 ? data2["Стоимость объекта, руб. (покупки или месячной аренды)"] : "Цена";
    }
    if (typeMarket2 === 'Аренда через аукцион') {
      price2 = data2 ? data2["Порядок определения стоимости"] : "Цена";
    }

if (typeMarket3 === 'Продажа через аукцион') {
       price3 = data3 ? data3["Порядок определения стоимости"] : "Цена";
    }
    if (typeMarket3 === 'Аренда') {
       price3 = data3 ? data3["Стоимость объекта, руб. (покупки или месячной аренды)"] : "Цена";
    }
    if (typeMarket3 === 'Аренда через аукцион') {
       price3 = data3 ? data3["Порядок определения стоимости"] : "Цена";
    }


  return (
    <>

      <Modal   visible={isOpen} onOk={onRequestClose} width={1700}  height={800} onCancel={onRequestClose} className="compare_block">
          <div className="container">
                <div className="object">
                    <div className="titleblock"> <p className="title">{placeName1}</p></div>
                     <img className="img" src={splittedImg1[0]}></img>
                     <div className="typemarket">{type1}</div>
                     <div className="typemarket">{typeMarket1}</div>
                     <p className="price">{price1}</p>

                 </div>

                 <div className="line1"></div>

                 <div className="object">
                      <div className="titleblock"> <p className="title">{placeName2}</p></div>
                     <img className="img" src={splittedImg2[0]}></img>
                     <div className="typemarket">{type2}</div>
                     <div className="typemarket">{typeMarket2}</div>
                     <p className="price">{price2}</p>
                </div>

                <div className="line1"></div>

                 <div className="object">
                     <div className="titleblock"> <p className="title">{placeName3}</p></div>
                     <img className="img" src={splittedImg3[0]}></img>
                     <div className="typemarket">{type3}</div>
                    <div className="typemarket">{typeMarket3}</div>
                     <p className="price">{price3}</p>
                </div>

        </div>
      </Modal>

    </>
  );
};

export default Compare;