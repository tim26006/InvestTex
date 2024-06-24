import React from 'react';
import { Modal } from 'antd';
import ThreeDModelViewer from './MODEL'; // Ensure correct path to ThreeDModelViewer

const Dmodal = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            visible={isOpen}
            onCancel={onRequestClose}
            footer={null}
            closeIcon={null}
            width={800} // Adjust width as needed
            height={600} // Adjust height as needed
        >
            <ThreeDModelViewer />
        </Modal>
    );
};

export default Dmodal;
