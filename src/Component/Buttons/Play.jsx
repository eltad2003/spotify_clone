import React from 'react'

function Play({ size }) {
    return (
        <button className='btn rounded-pill' style={{ background: '#1db954' }}>
            <i className="bi bi-play-fill text-dark" style={{ fontSize: size }}></i>
        </button>
    )
}

export default Play