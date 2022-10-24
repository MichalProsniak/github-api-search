import React from 'react';
import { useForm } from 'react-hook-form';

interface ItemsNumberChangerProps {
    changeNumberOfItems: (values: FormInput) => void;
    itemsPerPage: number
}

interface FormInput {
    itemsPerPage: number;
}

export const ItemsNumberChanger: React.FC<ItemsNumberChangerProps> = ({ changeNumberOfItems, itemsPerPage }) => {

    const {
        register,
        handleSubmit
    } = useForm<FormInput>();

    return (<div>
        <p className='message'>Change number of items per page:</p>
        <form onSubmit={handleSubmit(changeNumberOfItems)} >
            <input  defaultValue={itemsPerPage}
                    {...register('itemsPerPage', { required: true })} 
                    className='input-number-changer' 
                    type='number' min={1} max={50}></input>
            <button className='table-button' type='submit'>Save</button>
        </form>
    </div>);
}