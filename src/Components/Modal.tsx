import React from 'react';
import ReactDOM from 'react-dom';
interface ModalProps {
    onBackdropClick: () => void;
    avatar: string;
    children?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({onBackdropClick, avatar, children}) => {
        return ReactDOM.createPortal(<div className='overlay' onClick={onBackdropClick}>
            {children}
        </div>, document.getElementById('modal-root')!);
}