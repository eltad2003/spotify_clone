import React from 'react'
import Album from '../Album'
import Playlists from '../Playlists'
import Artist from '../Artist'

function MainContent() {
    return (
        <div style={{ minHeight: '75vh', maxHeight: '75vh', overflow: 'auto' }}>
            <div className="card-header d-flex algin-items-center bg-dark gap-2 position-sticky top-0 p-2">
                <button className='btn btn-outline-secondary text-white rounded-pill px-4 active'>Tất cả</button>
                <button className='btn btn-outline-secondary text-white rounded-pill px-4'>Âm nhạc</button>
                <button className='btn btn-outline-secondary text-white rounded-pill px-4'>Podcast</button>
            </div>
            <div className='card-body'>
                <Artist />
                <Album />
                <Playlists />
            </div>
        </div>
    )
}

export default MainContent