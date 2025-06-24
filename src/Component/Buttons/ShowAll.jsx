import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function ShowAll({ to }) {
    const [isHover, setIsHover] = useState(false)
    return (
        <Link className={`ms-auto text-white-50 fw-semibold ${isHover ? 'text-decoration-underline' : 'text-decoration-none'}`} to={to}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            Hiện tất cả
        </Link>
    )
}

export default ShowAll