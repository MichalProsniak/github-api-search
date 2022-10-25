import React from 'react';
import { useForm } from 'react-hook-form';

interface FormInputs {
    phrase: string;
    owner: string;
    language: string;
}

interface Props {
    onSubmit: (values: FormInputs) => void;
    phrase: string;
    owner: string;
    language: string;
}

export const Form: React.FC<Props> = ({ onSubmit, phrase, owner, language }) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormInputs>();

    return (
        <div className='form-wrapper'>
            <form onSubmit={handleSubmit(onSubmit)} >
                <label className='standard-label' htmlFor='name'>
                    Searched phrase:
                </label>
                <input
                    defaultValue={phrase}
                    {...register('phrase', { required: true })}
                    className='standard-input'
                    type='text'
                ></input>
                {errors.phrase && <p className='error-message'>This field is required</p>}
                <label className='standard-label' htmlFor='owner'>
                    Project owner:
                </label>
                <input
                    defaultValue={owner}
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
                defaultValue={language}
                {...register('language')}>
                    <option value='null'>Don't specify</option>
                    <option value='Java'>Java</option>
                    <option value='js'>JavaScript</option>
                    <option value='Go'>Go</option>
                </select>
                <button className='standard-button' type='submit' >Sumbit</button>
            </form>
        </div>
    );
}