import React from 'react'
import NewReleases from '../Albums/NewAlbum/NewReleases'

import Artist from '../Artist/TopArtist'
import Playlists from '../Playlists/Playlists'
import AlbumSection from '../Albums/Album/AlbumSection'
import CategoriesSection from '../Categories/Section/CategoriesSection'
import TopTrack from '../Track/TopTrack'
import TopPlaylist from '../Playlists/TopPlaylist'
import Footer from '../Layout/Footer'




function MainContent() {
    return (
        <div style={{ minHeight: '78h', maxHeight: '78vh', overflow: 'auto' }}>
            <div className="card-header d-flex algin-items-center bg-dark gap-2 position-sticky top-0 p-2 z-3">
                <button className='btn btn-outline-secondary text-white rounded-pill px-4 active'>Tất cả</button>
                <button className='btn btn-outline-secondary text-white rounded-pill px-4'>Âm nhạc</button>
                <button className='btn btn-outline-secondary text-white rounded-pill px-4'>Podcast</button>
            </div>
            <div className='card-body'>
                <NewReleases />
                <CategoriesSection />
                {/* <TopPlaylist /> */}

                {/* me */}
                <Artist />
                <TopTrack />
                <Playlists />
                <AlbumSection />

            </div>
        </div>
    )
}

export default MainContent