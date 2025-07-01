import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import fetchModel from '../../lib/fetchModel'
import Loading from '../../Loading'
import { formatTotalTime } from '../../lib/formatTotalTime'
import Play from '../../Buttons/Play'
import { formatTime } from '../../lib/format'

function PlaylistDetail() {
    const { id } = useParams()
    const [playlists, setPlaylists] = useState()
    const [hovered, setHovered] = useState(null)
    const totalDuration = playlists?.tracks?.items.reduce((a, b) => (a + b.track.duration_ms), 0)

    useEffect(() => {
        fetchModel(`${process.env.REACT_APP_API}/playlists/${id}`)
            .then(data => { setPlaylists(data); console.log('Playlists: ', data) })
            .catch(err => console.log('error: ', err))
    }, [id])
    if (!playlists) return <Loading />

    return (
        <div>
            {/* HEADER */}
            <div className="card-header bg-header rounded-top-3 p-4 d-flex gap-4">
                <img
                    src={playlists.images[0].url}
                    id='album_img'
                    alt="album img"
                    width={200}
                    height={200}
                    className="rounded-3 shadow"
                />
                <div className="d-flex flex-column justify-content-end">

                    <p className="fw-semibold text-white mb-0">{playlists.public && 'Danh sách phát công khai'}</p>
                    <h1 className="fw-bolder mb-3 display-1">{playlists.name}</h1>
                    <div className="d-flex align-items-center gap-2 text-white-50">
                        <span className="fw-semibold text-white ">{playlists.owner.display_name}</span>
                        <span > • {playlists.tracks.total} bài hát, khoảng {formatTotalTime(totalDuration)}</span>
                    </div>
                </div>
            </div>
            {/* CONTROL */}
            <div className='px-4 py-3 d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center justify-content-center gap-3'>
                    <Play size={28} />
                    <img src={playlists.images[0].url} alt=""
                        className='p-1 border-secondary border rounded-3 img-fluid'
                        style={{
                            width: 40, height: 50,
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
            <div className="px-5 py-3">
                <table className="w-100 align-middle"  >
                    <thead className="text-white-50 position-sticky top-0 z-2">
                        <tr >
                            <td className='text-center' >#</td>
                            <td>Tiêu đề</td>
                            <td>Album</td>
                            <td>Ngày thêm</td>
                            <td className="text-end">
                                <i className="bi bi-clock"></i>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {playlists.tracks.items.map((item, idx) => (
                            <tr key={item.track.id} >
                                <td
                                    onMouseEnter={() => setHovered(idx)}
                                    onMouseLeave={() => setHovered(null)}
                                    style={{ width: 50, textAlign: 'center' }}
                                    className='text-white-50'
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
                                    <Link to={`/track/${item.track.id}`} className="text-decoration-none fw-semibold text-white me-1 mb-0">
                                        {item.track.name}
                                    </Link>

                                    <div className="d-flex align-items-center gap-2 text-white-50 small">
                                        {item.track.explicit && (
                                            <div className=' text-dark bg-secondary rounded-1' style={{ height: 15, width: 20 }} title='Phản cảm'>
                                                <p style={{ fontSize: 10, fontWeight: 700, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>E</p>
                                            </div>
                                        )}
                                        {item.track.artists.map((artist, i) => (
                                            <span key={artist.id}>
                                                <Link to={`/artist/${artist.id}`} className="text-decoration-none text-white-50 me-1">
                                                    {artist.name}
                                                </Link>
                                                {i < item.track.artists.length - 1 && ", "}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                {/* name album */}
                                <td>
                                    <Link to={`/album/${item.track.album.id}`} className='text-decoration-none text-white-50'>
                                        {item.track.album.name}
                                    </Link>
                                </td>
                                {/* date add */}
                                <td className='text-white-50'>
                                    {new Date(item.added_at).toLocaleString('vi-VN', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' })}
                                </td>
                                {/*time duration (ms) */}
                                <td className="text-end text-white-50">
                                    {formatTime(item.track.duration_ms)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PlaylistDetail