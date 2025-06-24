import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Library() {
    const [showLibrary, setShowLibrary] = useState(true)
    const [showSearch, setShowSearch] = useState(false)

    return (
        <div className='card bg-dark h-100 rounded-3' style={{
            minHeight: '78vh',
            maxHeight: '78vh',
            width: showLibrary ? 410 : 70,
            transition: 'width .1s ease'
        }}>
            <div className="px-2 card-header d-flex justify-content-center align-items-center gap-2 flex-wrap">
                <div className='d-flex align-items-center gap-3'>
                    <button className='btn btn-sm text-white text-center' onClick={() => setShowLibrary(!showLibrary)}>
                        {showLibrary ? <i className="bi bi-arrow-bar-left" style={{ fontSize: 20 }} /> : <i className="bi bi-arrow-bar-right" style={{ fontSize: 20 }} />}
                    </button>
                    {showLibrary && (
                        <p className="fw-bold text-white mb-0 text-nowrap" >Thư viện</p>
                    )}
                </div>
                {showLibrary && (
                    <button className="ms-auto btn btn-outline-secondary text-white rounded-pill px-4 m-0 btn-sm">
                        <i className='bi bi-plus'></i> Tạo
                    </button>
                )}
            </div>

            {!showLibrary && (
                <div className='text-center'>
                    <button className="btn rounded-pill text-white">
                        <i className='bi bi-plus' style={{ fontSize: 20 }}></i>
                    </button>
                </div>
            )}

            <div className={`px-3 p-2 d-flex justify-content-between align-items-center ${showLibrary ? 'd-block' : 'd-none'}`}>
                <div className='d-flex gap-2'>
                    <button className='btn rounded-pill text-white' onClick={() => setShowSearch(!showSearch)}><i className='bi bi-search'></i></button>
                    <input
                        className={`${showSearch ? 'd-block' : 'd-none'} rounded-3  `}
                        type="text"
                        placeholder="Search..."
                    />
                </div>
                <button className='btn mb-0 text-white'>Gần đây <i className='bi bi-list mb-0'></i></button>
            </div>

            <div className='px-2 d-flex justify-content-start'>
                <Link className='text-decoration-none me-3 text-center'>
                    <img src="http://dummyimage.com/100x100.png/5fa2dd/ffffff" alt="" className='rounded-pill' width={52} height={52} style={{ objectFit: 'cover' }} />
                </Link>
                <div className={`d-flex align-items-center flex-column ${showLibrary ? 'd-block' : 'd-none'}`}>
                    <span className='text-white fw-bold'>RHYDER</span>
                    <span className='text-white-50 fw-semibold'>Nghệ sĩ</span>
                </div>
            </div>
        </div >
    )
}

export default Library