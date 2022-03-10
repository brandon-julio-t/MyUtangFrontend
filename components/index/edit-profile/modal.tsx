import Modal, { ModalProps } from '../../common/modal';
import EditPassword from './edit-password';
import EditUsername from './edit-username';
import React, { ComponentType } from 'react';

const EditProfileModal: ComponentType<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal title='Edit Profile' isOpen={isOpen} onClose={onClose}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <EditUsername />
        </div>
        <div>
          <EditPassword />
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
