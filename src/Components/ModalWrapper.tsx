import React from 'react'
import { Modal } from './Modal'

interface ModalWrapperProps {
    isModalVisible: boolean;
    onBackdropClick: () => void;
    avatar: string;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({onBackdropClick, avatar, isModalVisible}) => {
    if (!isModalVisible)
        return null;
    return (<Modal onBackdropClick={onBackdropClick} avatar={avatar}>
        <div onClick={e => e.stopPropagation()} className='modal-container'>
            <img src={avatar}alt='Avatar'/>
        </div>
    </Modal>);
}