import React from 'react';
import { Modal } from 'antd';
import './ModalLgots.css';
import { Button } from 'antd';
import { FaCity } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";




function ModalLgots({ isOpen, onRequestClose, data }) {
  const reg = data ? data["Регион"] : "Ничего";
  const name = data ? data["Наименование меры поддержки"] : 'Название';
  let sytb = data ? data["Суть механизма"] : 'Суть';
  sytb = sytb.replace(/&nbsp;/g, '');
  const URL = data ? data["Ссылка на форму подачи заявки"] : "URL";

  return (
    <Modal
      open={isOpen}
      onCancel={onRequestClose}
      footer={null}
      closable={false}
      width={600} // Устанавливаем ширину модального окна
      style={{ top: 20 }} // Устанавливаем отступ сверху и стили модального окна
      className="custom-modal" // Добавляем кастомный класс
    >
      <div className='TEXT_LGOTS'>
        <div className='title_Modallog'><FaCity size={30} color={'#ef0f33'} className="icon"/> {reg}</div>
        <div className='name_lgot'><MdDriveFileRenameOutline size={30} color={'#ef0f33'}/> {name}</div>
        <div><FaRegBookmark size={25} color={'#ef0f33'}/> {sytb}.</div>
        <Button 
            type="primary" 
            href={URL} 
            target="_blank" // Открывать ссылку в новом окне
            className="custom-button"
            rel="noopener noreferrer" // Рекомендуется добавить для безопасности
          >
            Перейти
          </Button>
      </div>
    </Modal>
  );
}

export default ModalLgots;
