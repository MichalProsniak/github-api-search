import React, { FormEvent } from 'react'

export const Form: React.FC = () => {

    function submitForm(e: FormEvent)
    {
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={submitForm} >
                <label className='standard-label'>
                    Project name:
                </label>
                <input
                    autoFocus
                    required
                    className='standard-input'
                    type='text'
                ></input>
                <label className='standard-label'>
                    Project owner:
                </label>
                <input
                    required
                    className='standard-input'
                    type='text'
                ></input>
                <label className='standard-label'>
                    Language:
                </label>
                <select name='language' className='standard-input'>
                    <option value='Java'>Java</option>
                    <option value='JavaScript'>JavaScript</option>
                    <option value='Go'>Go</option>
                </select>
                <button className='standard-button' type='submit' >Sumbit</button>
            </form>
        </div>
    );
}