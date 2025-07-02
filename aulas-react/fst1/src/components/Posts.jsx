import React from "react";

export default function Posts(props) {
    return (
        <div className='border-1 bg-gray-300 rounded-lg p-5 hover:bg-gray-500'>
            {props.userId} - {props.body}
        </div>
    );
}