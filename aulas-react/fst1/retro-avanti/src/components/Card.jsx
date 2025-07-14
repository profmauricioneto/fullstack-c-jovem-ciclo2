import React, { Fragment } from 'react';

export default function Card({id, text, onEdit, onDelete}) {
    return(
        <Fragment>
            <div className='bg-yellow-100 border-1-4 border-yellow-500 p-4 rounded-md shadow-sm hover:shadow-sm transition-shadow'>
                <div className='flex justify-between items-center'>
                    <p className='text-gray-700 text-sm flex-1 m-2'>{text}</p>
                </div>
                <div className='flex gap-1'>
                    <button
                        onClick={() => onEdit(id)}
                        title='edit'
                        className='text-blue-500 hover:text-blue-700 text-xs font-medium'
                        >Edit</button>
                    <button
                        onClick={() => onDelete(id)}
                        title='delete'
                        className='text-blue-500 hover:text-blue-700 text-xs font-medium'
                        >Delete</button>
                </div>
            </div>
        </Fragment>
    )
}