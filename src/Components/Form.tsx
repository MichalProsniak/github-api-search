import React from 'react';
import { useForm } from 'react-hook-form';

interface FormInputs {
    name: string;
    owner: string;
    language: string;
}

interface Props {
    onSubmit: (values: FormInputs) => void;
}

export const Form: React.FC<Props> = ({ onSubmit }) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormInputs>();

    return (
        <div className='form-wrapper'>
            <form onSubmit={handleSubmit(onSubmit)} >
                <label className='standard-label' htmlFor='name'>
                    Project name:
                </label>
                <input
                    defaultValue=''
                    {...register('name', { required: true })}
                    className='standard-input'
                    type='text'
                ></input>
                {errors.name && <p className='error-message'>This field is required</p>}
                <label className='standard-label' htmlFor='owner'>
                    Project owner:
                </label>
                <input
                    defaultValue=''
                    {...register('owner', { required: true })}
                    className='standard-input'
                    type='text'
                ></input>
                {errors.owner && <p className='error-message'>This field is required</p>}
                <label className='standard-label' htmlFor='language'>
                    Language:
                </label>
                <select 
                className='standard-input'
                {...register('language')}>
                    <option value='Java'>Java</option>
                    <option value='JavaScript'>JavaScript</option>
                    <option value='Go'>Go</option>
                </select>
                <button className='standard-button' type='submit' >Sumbit</button>
            </form>
        </div>
    );
}