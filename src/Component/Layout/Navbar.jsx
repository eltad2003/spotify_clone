import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const [isDropdown, setIsDropdown] = useState(false)
    return (
        <>
            {/* navbar */}
            <nav className="navbar navbar-expand-sm navbar-light bg">
                <div className="container-fluid d-flex justify-content-between align-items-center" >
                    <a href="/" className='px-3 mb-0' ><i className="bi bi-spotify fs-1" style={{ color: '#1db954' }}></i></a>
                    <div className="d-flex mb-0 my-lg-0">
                        <a className="me-2" href="/" >
                            <i className="bi bi-house-door-fill text-white fs-2" ></i>
                        </a>
                        <input
                            className="form-control w-100 rounded-5"
                            type="text"
                            placeholder="Search..."
                            style={{ minWidth: '550px' }}
                        />
                    </div>
                    <div className='d-flex align-items-center mb-0 gap-2'>
                        <button className='btn'><i className="bi bi-bell-fill text-white " style={{ fontSize: 20 }}></i></button>
                        <button className="btn text-white" onClick={() => setIsDropdown(!isDropdown)}>
                            <i className="bi bi-person-fill" style={{ fontSize: 20 }}></i>
                        </button>
                    </div>
                </div>
                {isDropdown && (
                    <div className='dropdown-menu show shadow bg-dark border-0 end-0'
                        style={{
                            top: '75px',
                            marginRight: '12px',
                            width: '200px',
                            zIndex: '10001'
                        }}
                    >

                        <Link to={'/login'} className='py-2 dropdown-item text-decoration-none text-white' onClick={() => setIsDropdown(false)}>Đăng Nhập</Link>
                        <Link className='py-2 dropdown-item text-decoration-none text-white d-flex align-items-center' onClick={() => setIsDropdown(false)}>
                            <p className='mb-0'>Tài khoản</p>
                            <i className="ms-auto bi bi-box-arrow-up-right text-white"></i>
                        </Link>

                        <Link to={'/profile'} className='py-2 dropdown-item text-decoration-none text-white' onClick={() => setIsDropdown(false)}>Hồ Sơ</Link>
                        <Link className='py-2 dropdown-item text-decoration-none text-white d-flex align-items-center' onClick={() => setIsDropdown(false)}>
                            <p className='mb-0'>Nâng cấp</p>
                            <i className="ms-auto bi bi-box-arrow-up-right text-white"></i>
                        </Link>
                        <Link className='py-2 dropdown-item text-decoration-none text-white d-flex align-items-center' onClick={() => setIsDropdown(false)}>
                            <p className='mb-0'>Hỗ trợ</p>
                            <i className="ms-auto bi bi-box-arrow-up-right text-white"></i>
                        </Link>
                        <Link className='py-2 dropdown-item text-decoration-none text-white d-flex align-items-center' onClick={() => setIsDropdown(false)}>
                            <p className='mb-0'>Tải xuống</p>
                            <i className="ms-auto bi bi-box-arrow-up-right text-white"></i>
                        </Link>
                        <div className="dropdown-divider m-0"></div>
                        <Link className='py-2 dropdown-item text-decoration-none text-white' onClick={() => setIsDropdown(false)}>Đăng xuất</Link>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Navbar