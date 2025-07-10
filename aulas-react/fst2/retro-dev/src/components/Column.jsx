import React, { Fragment } from 'react';

export default function Column(props) {
    return(
        <Fragment>
            <div className='h-screen w-1/4 bg-white shadow-lg p-6 border border-gray-200 rounded-xl flex flex-col items-center mx-2'>
                <h2
                    className='text-center font-semibold text-gray-700 mb-4 w-full border-b-2 border-blue-300 pb-2'
                >{props.titleColumn}</h2>
                <div className='w-full flex-1 flex flex-col gap-2 overflow-y-auto'>
                    <button
                        className='w-full mt-2 border-0 rounded-xl bg-blue-500 text-white font-semibold py-0.5 hover:bg-blue-600 transition-colors shadow'
                    >+</button>
                </div>
            </div>
        </Fragment>
    )
}