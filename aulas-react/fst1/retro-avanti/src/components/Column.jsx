import React, { Fragment } from 'react';

export default function Column (props) {
    return (
        <Fragment>
            <div className='h-screen w-1/4 bg-white shadow-lg p-6 border border-gray-300 rounded-xl flex flex-col items-center mx-2'>
                <h2>{props.titleColumn}</h2>
                <div className='flex-1 flex flex-col'>
                    <button>+</button>
                </div>
            </div>
        </Fragment>
    );
}