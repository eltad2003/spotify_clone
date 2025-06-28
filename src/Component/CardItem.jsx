import React, { useState } from 'react'
import Carousel from 'react-multi-carousel'
import { responsive } from './lib/responsiveCarousel'
import './CardItem.css'
import { Link } from 'react-router-dom'
import Loading from './Loading'
function getImageUrl(item) {
    // Ưu tiên các trường phổ biến của Spotify API
    if (item.album && item.album.images && item.album.images.length > 0) return item.album.images[0].url
    if (item.images && item.images.length > 0) return item.images[0].url
    if (item.icons && item.icons.length > 0) return item.icons[0].url
    return '' // fallback nếu không có ảnh
}

function CardItem({ list, children, typeLink, rounded }) {
    const [hovered, setHovered] = useState(null)

    if (!list) return (
        <Loading />
    )
    return (
        <Carousel responsive={responsive}>
            {list.items.map((item, idx) => (
                <div
                    key={item.id || idx}
                    className={`text-center rounded-3 p-3 ${hovered === idx ? 'bg' : ''}`}
                    id='list_card'
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <Link to={`${typeLink}/${item.id}`}>
                        <img
                            src={getImageUrl(item)}
                            alt={item.name}
                            width={180}
                            height={160}
                            className={`rounded-${rounded} w-100`}
                            style={{ objectFit: 'cover' }}
                        />
                    </Link>
                    {children && children(item)}
                </div>
            ))}
        </Carousel>
    )
}

export default CardItem