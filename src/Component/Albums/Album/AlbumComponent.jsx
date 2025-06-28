import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Play from '../../Buttons/Play'
import './AlbumComponent.css'

function AlbumComponent({ list, children }) {
    const [hovered, setHovered] = useState(null)
    return (

        <>
            {
                list.items.map((item, idx) => (

                    <div key={idx} className={`rounded-3 p-3 ${hovered === idx ? 'bg' : ''} text-decoration-none `}
                        id='list_album'
                        onMouseEnter={() => setHovered(idx)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <div className={`d-flex flex-column`} >
                            <div className='position-relative'>
                                <Link to={`/album/${item.id}`}>
                                    <img src={item.images[0].url} alt={item.name} width={160} height={160} className='rounded-3 w-100 img-fluid' />
                                </Link>
                                {hovered === idx && (
                                    <div className="position-absolute bottom-0 end-0 pe-1 pb-1 z-3 ">
                                        <Play size={28} />
                                    </div>
                                )}
                            </div>

                            <Link to={`/track/${item.id}`} className="text-decoration-none fw-semibold text-white mb-0 text-start">
                                {item.name}
                            </Link>
                            {children && children(item)}
                        </div>

                    </div>
                ))
            }
        </>

    )
}

export default AlbumComponent