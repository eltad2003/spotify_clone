import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Library from '../Home/Library'
import Playlist from '../Home/MainContent'
import AudioBar from './AudioBar'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout() {

    return (
        <>
            <Navbar />
            {/* main layout */}
            <div className='container-fluid'>
                <div className="d-flex gap-1 flex-nowrap" >
                    <div className='flex-row card bg-card-1 h-100 rounded-3' style={{ minHeight: '80vh', maxHeight: '80vh', overflow: 'auto' }} >
                        <Library />
                    </div>
                    <div className='flex-column card w-100 h-100 bg-card-2 rounded-3 text-white' style={{ minHeight: '80vh', maxHeight: '80vh', overflow: 'auto' }}>
                        <Outlet />
                        <Footer />
                    </div>
                </div>
            </div>
            <AudioBar />
        </>
    )
}

export default Layout