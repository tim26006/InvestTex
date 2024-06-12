import React, { useState } from 'react';
import { Button, Modal } from 'antd';

function Compare ({ isOpen, onRequestClose })  {
  return (
    <>
      <Modal title="Basic Modal" visible={isOpen} onOk={onRequestClose} onCancel={onRequestClose}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Compare;