import React from 'react'

function Loading() {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
        >
            <div
                className="spinner-border text-success"
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loading