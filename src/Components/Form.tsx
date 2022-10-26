import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

const schema = yup.object().shape({
    phrase: yup.string().required(),
    owner: yup.string().required(),
});

export const Form: React.FC<Props> = ({ onSubmit, phrase, owner, language }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormInputs>({
        resolver: yupResolver(schema),
    });

    if (!language)
    {
        language = 'null'
    }
    setValue('language', language)

    return (
        <div className='form-wrapper'>
            <form onSubmit={handleSubmit(onSubmit)} >
                <label className='standard-label' htmlFor='name'>
                    Searched phrase:
                </label>
                <input
                    defaultValue={phrase}
                    {...register('phrase')}
                    className='standard-input'
                    type='text'
                ></input>
                {errors.phrase && <p className='error-message'>{errors.phrase.message}</p>}
                

                <label className='standard-label' htmlFor='owner'>
                    Project owner:
                </label>
                <input
                    defaultValue={owner}
                    {...register('owner')}
                    className='standard-input'
                    type='text'
                ></input>
                {errors.owner && <p className='error-message'>{errors.owner.message}</p>}
                <label className='standard-label' htmlFor='language'>
                    Language:
                </label>
                <select 
                className='standard-input'
                {...register('language')}>
                    <option value='null'>Don't specify</option>
                    <option value='Java'>Java</option>
                    <option value='JavaScript'>JavaScript</option>
                    <option value='Go'>Go</option>
                </select>
                <button className='standard-button' type='submit' >Sumbit</button>
            </form>
        </div>
    );
}