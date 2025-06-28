import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatTime } from '../lib/format'

function TopTrackOfArtist({ topTrack }) {
    const [hovered, setHovered] = useState(null)
    const [showAll, setShowAll] = useState(false)
    const [isAddPlaylist, SetIsAddPlaylist] = useState(false)
    return (
        <div className="p-2 mx-4">
            {(showAll ? topTrack.slice(0, 10) : topTrack.slice(0, 5)).map((track, idx) => (
                <div
                    key={track.id}
                    className={`bg-dark text-white`}
                    style={{ borderRadius: 12 }}
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <div className={`row align-items-center p-2   ${hovered === idx ? 'bg' : null}`}>
                        {/*stt */}
                        <div className="col-auto text-white-50 text-center" style={{ minWidth: 50 }}>
                            {hovered === idx ? (
                                <i className="bi bi-play-fill text-white" style={{ fontSize: 18 }}></i>
                            ) : (
                                idx + 1
                            )}
                        </div>
                        <div className="col-auto">
                            <img
                                src={track.album?.images?.[2]?.url || track.album?.images?.[0]?.url || ''}
                                alt={track.name}
                                width={45}
                                height={45}
                                className="rounded object-fit-cover"
                            />
                        </div>
                        {/* name track */}
                        <div className="col">
                            <Link to={`/track/${track.id}`} className="text-decoration-none fw-semibold text-white mb-0">
                                {track.name}
                            </Link>
                            {track.explicit && (
                                <div className=' text-dark bg-light' style={{ height: 15, width: 15 }} title='Phản cảm'>
                                    <p style={{ fontSize: 10, fontWeight: 700, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>E</p>
                                </div>
                            )}
                        </div>
                        {/* add play list */}
                        <div className='col-auto' style={{ minWidth: 50, cursor: 'pointer' }}>
                            {hovered === idx && !isAddPlaylist && (
                                <i
                                    className="bi bi-plus-circle"
                                    onClick={() => SetIsAddPlaylist(true)}
                                    title='Thêm vào Bài hát đã thích'
                                />
                            )}
                            {isAddPlaylist ? (
                                <i className="bi bi-check-circle-fill" style={{ color: '#1db954' }}></i>
                            ) : null}
                        </div>
                        {/* duration time */}
                        <div className="col-auto text-white-50" >
                            {formatTime(track.duration_ms)}
                        </div>
                        {/* more options */}
                        <div className="col-auto text-white-50" style={{ minWidth: 50 }} >
                            {hovered === idx && (
                                <i
                                    className="bi bi-three-dots text-white"
                                    style={{ fontSize: 18, cursor: 'pointer' }}
                                    title={`Các tùy chọn khác cho ${track.name}`}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ))}
            {!showAll && topTrack.length > 5 ? (
                <button
                    className="btn fw-semibold text-white-50 btn-sm mt-2"
                    onClick={() => setShowAll(true)}
                >
                    Hiện thêm
                </button>
            ) : topTrack.length > 5 ? (
                <button
                    className="btn fw-semibold text-white-50 btn-sm mt-2"
                    onClick={() => setShowAll(false)}
                >
                    Ẩn bớt
                </button>
            ) : null}
        </div>
    )
}

export default TopTrackOfArtist