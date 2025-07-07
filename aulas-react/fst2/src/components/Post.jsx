import React, { Fragment } from 'react';

export default function Post(props) {
    return(
        <Fragment>
            <div className='border rounded-lg p-2 hover:bg-gray-300'>
                <h4 className='text-center font-bold font-mono text-lg'>UserId: {props.userId}</h4>
                {props.title} - {props.post}
            </div>
        </Fragment>
    )
}