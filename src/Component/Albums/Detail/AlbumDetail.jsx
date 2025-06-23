import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import './AlbumDetail.css'
import Play from '../../Buttons/Play'
import fetchModel from '../../lib/fetchModel'

function AlbumDetail() {
    const { id } = useParams()
    const [currentAlbum, setCurrentAlbum] = useState(null)
    const [hovered, setHovered] = useState(null)
    const formatTime = (sec) => {
        const minutes = Math.floor(sec / 60000);
        const seconds = Math.floor(sec % 60000 / 1000);
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    useEffect(() => {
        fetchModel(`${process.env.REACT_APP_API}/albums/${id}`)
            .then(data => {
                setCurrentAlbum(data); console.log(data);
            })
            .catch(err => console.log('error: ', err))
    }, [id])

    if (!currentAlbum) {
        return (
            <div className='spinner spinner-success'></div>
        )
    }

    return (

        <div style={{ minHeight: '75vh', maxHeight: '75vh', overflow: 'auto' }}>
            {/* HEADER */}
            <div className="card-header bg-secondary rounded-top-4 p-4 d-flex gap-4">
                <img
                    src={currentAlbum.images[0].url}
                    id='album_img'
                    alt="album img"
                    width={200}
                    height={200}
                    className="rounded-3 shadow"
                />
                <div className="d-flex flex-column justify-content-end">
                    <p className="text-uppercase fw-bold text-white mb-1">
                        {currentAlbum.type}
                    </p>
                    <h1 className="fw-bold mb-3">{currentAlbum.name}</h1>
                    <div className="d-flex align-items-center gap-2 text-white-50">
                        <img
                            src={currentAlbum.images[2].url}
                            alt="artist"
                            width={32}
                            height={32}
                            className="rounded-pill"
                        />
                        <span className="fw-semibold text-white">
                            {currentAlbum.artists.map((a) => a.name)}
                        </span>
                        <span>• {currentAlbum.release_date}</span>
                        <span>• {currentAlbum.total_tracks} bài hát</span>
                    </div>

                </div>
            </div>
            <div className='px-4 card-header z-2 d-flex align-items-center position-sticky bg-secondary rounded-top-4 d-none'
                style={{
                    top: 0
                }}>
                <Play />
                <h1 className="fw-bold mb-0">{currentAlbum.name}</h1>
            </div>
            {/* CONTROL */}
            <div className='px-4 py-3 d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center justify-content-center gap-3'>
                    <Play />
                    <img src={currentAlbum.images[2].url} alt=""
                        className='p-1 border-secondary border rounded-3 img-fluid'
                        style={{
                            width: 50, height: 70,
                        }}
                    />
                    <button className='btn btn-sm'>
                        <i className="bi bi-plus-circle text-white" style={{ fontSize: 32 }}></i>
                    </button>
                    <button className='btn btn-sm'>
                        <i className="bi bi-arrow-down-circle text-white" style={{ fontSize: 32 }}></i>
                    </button>
                    <button className='btn btn-sm'>
                        <i className="bi bi-three-dots text-white" style={{ fontSize: 32 }}></i>
                    </button>
                </div>
                <button className="btn btn-sm text-white fw-semibold">
                    Danh sách <i className="bi bi-list"></i>
                </button>


            </div>

            {/* TRACK LIST */}
            <div className="px-4">
                <table className="table table-borderless table-hover table-dark align-middle">
                    <thead className="text-white position-sticky top-0 z-2">
                        <tr>
                            <th >#</th>
                            <th>Tiêu đề</th>
                            <th className="text-end">
                                <i className="bi bi-clock"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAlbum.tracks.items.map((item, idx) => (
                            <tr key={item.id} >
                                <td
                                    onMouseEnter={() => setHovered(idx)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    {hovered === idx ? (
                                        <button className="btn p-0 m-0">
                                            <i className="bi bi-play-fill text-white" style={{ fontSize: 20 }}></i>
                                        </button>
                                    ) : (
                                        idx + 1
                                    )}
                                </td>
                                {/* track name, artist name */}
                                <td>
                                    <Link to={`/track/${item.id}`} className="text-decoration-none fw-semibold text-white me-1 mb-0">
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
                                </td>
                                {/*time duration (ms) */}
                                <td className="text-end text-white-50">
                                    {formatTime(item.duration_ms)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* copyrights */}
            <div className='px-3 text-white-50 small mt-3'>
                {currentAlbum.copyrights.map((a, i) => (
                    <p style={{ fontSize: 10 }}>{a.text}</p>
                ))}
            </div>

        </div>

    )
}

export default AlbumDetail