import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Library() {
    const [showLibrary, setShowLibrary] = useState(true)
    const [showSearch, setShowSearch] = useState(false)

    return (
        <div style={{ width: showLibrary ? 400 : 75, }}>

            <div className="px-2 card-header d-flex justify-content-center align-items-center gap-2">
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
                <div className='text-center p-2'>
                    <i className='bi bi-plus text-white' style={{ fontSize: 20 }}></i>
                </div>
            )}

            <div className={`p-2 d-flex justify-content-between align-items-center ${showLibrary ? 'd-block' : 'd-none'}`}>
                <div className='d-flex gap-2'>
                    <button className='btn rounded-pill text-white' onClick={() => setShowSearch(!showSearch)}>
                        <i className='bi bi-search'></i>
                    </button>
                    <input
                        className={`${showSearch ? 'd-block' : 'd-none'} rounded-3  `}
                        type="text"
                        placeholder="Search..."
                    />
                </div>
                <button className='btn p-0 mb-0 text-white'><i className='bi bi-list mb-0'></i></button>

            </div>

            <div className='card-body d-flex gap-2 p-2'>
                <Link>
                    <img src="http://dummyimage.com/100x100.png/5fa2dd/ffffff" alt="" className='rounded-pill' width={52} height={52} style={{ objectFit: 'cover' }} />
                </Link>
                <div className={`d-flex align-items-start flex-column ${showLibrary ? 'd-block' : 'd-none'}`}>
                    <span className='text-white fw-bold'>RHYDER</span>
                    <span className='text-white-50 fw-semibold'>Nghệ sĩ</span>
                </div>
            </div>
        </div >
    )
}

export default Library