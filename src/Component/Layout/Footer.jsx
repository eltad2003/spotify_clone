import React from 'react'

function Footer() {
    return (
        <footer className="bg-dark text-white-50 pt-4 pb-2 mt-5 border-top ">
            <div className="container">
                <div className="row gy-3">
                    <div className="col-md-4">
                        <h5 className="text-white fw-bold mb-3">Spotify</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white-50 text-decoration-none">Giới thiệu</a></li>
                            <li><a href="/" className="text-white-50 text-decoration-none">Việc làm</a></li>
                            <li><a href="/" className="text-white-50 text-decoration-none">For the Record</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h6 className="text-uppercase text-white fw-bold mb-3">Cộng đồng</h6>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white-50 text-decoration-none">Dành cho Nghệ sĩ</a></li>
                            <li><a href="/" className="text-white-50 text-decoration-none">Nhà phát triển</a></li>
                            <li><a href="/" className="text-white-50 text-decoration-none">Quảng cáo</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h6 className="text-uppercase text-white fw-bold mb-3">Liên hệ</h6>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white-50 text-decoration-none">Facebook</a></li>
                            <li><a href="/" className="text-white-50 text-decoration-none">Instagram</a></li>
                            <li><a href="/" className="text-white-50 text-decoration-none">Twitter</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-4 small">
                    © {new Date().getFullYear()} Spotify Clone. Copyright by Lê Hoàng Đạt.
                </div>
            </div>
        </footer>
    )
}

export default Footer