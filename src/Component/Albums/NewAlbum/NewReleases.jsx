import React, { useEffect, useState } from 'react'
import fetchModel from '../../lib/fetchModel'
import { data, Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './NewReleases.css';
import Play from '../../Buttons/Play';
import { responsive } from '../../lib/responsiveCarousel';
import ShowAll from '../../Buttons/ShowAll';

function NewReleases() {
    const [newReleases, setNewReleases] = useState(null)
    const [hovered, setHovered] = useState(null)
    useEffect(() => {
        fetchModel(`${process.env.REACT_APP_API}/browse/new-releases`)
            .then(data => { setNewReleases(data.albums); console.log('new-releases: ', data.albums) })
            .catch(err => console.log('error: ', err))
    }, [])

    if (!newReleases) return (
        <div className='spinner spinner-success'></div>
    )
    return (
        <div className='container mt-3'>
            <div className='d-flex align-items-center px-3'>
                <p className='card-title fs-4 text-white fw-bold'>Album mới phát hành</p>
                <ShowAll />
            </div>
            <Carousel responsive={responsive}>
                {newReleases.items.map((item, idx) => (

                    <div key={idx} className={`text-center rounded-3 p-2 ${hovered === idx ? 'bg' : ''}`}
                        id='card_album'
                        onMouseEnter={() => setHovered(idx)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <div className={`d-flex flex-column`} >
                            <div className='position-relative'>
                                <Link to={`/album/${item.id}`}>
                                    <img src={item.images[0].url} alt="" width={180} height={200} className='rounded-3 img-fluid' />
                                </Link>
                                {hovered === idx && (
                                    <div className="position-absolute bottom-0 end-0 pe-3 pb-2 z-3 ">
                                        <Play size={28} />
                                    </div>
                                )}
                            </div>

                            <Link to={`/track/${item.id}`} className="text-decoration-none fw-semibold text-white mb-0">
                                {item.name}
                            </Link>
                            <div className="text-white-50 small">
                                {item.artists.map((artist, i) => (
                                    <span key={artist.id}>
                                        <Link to={`/artist/${artist.id}`} className="text-decoration-none text-white-50 me-1">
                                            {artist.name}
                                        </Link>
                                        {i < item.artists.length - 1 && ", "}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default NewReleases