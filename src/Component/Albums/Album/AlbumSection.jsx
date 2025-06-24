import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import './AlbumSection.css'
import fetchModel from '../../lib/fetchModel'
function AlbumSection() {
    const [albums, setAlbums] = useState([])
    const [hovered, setHovered] = useState(null)
    useEffect(() => {
        fetchModel(`${process.env.REACT_APP_API}/albums?ids=${process.env.REACT_APP_IDS}`)
            .then(data => { setAlbums(data.albums); console.log(data.albums) })
            .catch(err => console.log('err: ', err))

    }, [])

    return (
        <div className='container mt-3'>
            <p className='card-title fs-4 text-white fw-bold'>Albums</p>
            <div className="row">
                {albums?.map((album, idx) => {
                    const isHovered = hovered === idx;
                    const cover = album.images?.[0];
                    const thumb = album.images?.[2];

                    return (
                        <div key={album.id} className="col-lg-4 col-md-6 g-2">
                            <div
                                className="position-relative card-album z-3"
                                onMouseEnter={() => setHovered(idx)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <Link to={`/album/${album.id}`}>
                                    <img
                                        src={cover?.url}
                                        alt={album.name}
                                        width={cover?.width}
                                        height={cover?.height}
                                        className="img-fluid rounded-4"
                                    />
                                </Link>

                                {isHovered && (
                                    <div className="d-flex gap-3 position-absolute top-0 start-0 px-4 py-2 bg-opacity-dark w-100  h-100 z-2 rounded-4">
                                        <Link to={`/album/${album.id}`}>
                                            <img
                                                src={thumb?.url}
                                                alt={album.name}
                                                width={130}
                                                height={130}
                                                className="img-fluid object-fit-cover rounded-3"
                                            />
                                        </Link>

                                        <div className="d-flex flex-column align-items-start">
                                            <Link
                                                to={`/album/${album.id}`}
                                                className="text-white text-decoration-none"
                                                title={album.name}
                                            >
                                                <p className="fw-bold fs-3" style={{ maxWidth: 200, minHeight: 80 }}>
                                                    {album.name}
                                                </p>
                                            </Link>

                                            <span className="text-white">
                                                {album.type} —{" "}
                                                {album.artists.map((artist) => artist.name).join(", ")}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    )
}

export default AlbumSection