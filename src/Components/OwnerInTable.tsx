import React, { useState } from 'react';
import { ModalWrapper } from './ModalWrapper'


interface OwnerInTableProps {
    ownerName: string,
    avatar: string
}

export const OwnerInTable: React.FC<OwnerInTableProps> = ({ownerName, avatar}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const changeModalState = () => {
        setIsModalVisible(prevState => !prevState)
    }

    return (
        <div>
            <p>{ownerName}</p>
            <button className='table-button' onClick={changeModalState} >Avatar</button>
            <ModalWrapper avatar={avatar} onBackdropClick={changeModalState} isModalVisible={isModalVisible} />
        </div>
    );
}   