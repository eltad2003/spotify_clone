import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import './AlbumDetail.css'
import Play from '../../Buttons/Play'
import fetchModel from '../../lib/fetchModel'
import { formatTime } from '../../lib/format'
import TitleSection from '../../TitleSection'
import AlbumComponent from '../Album/AlbumComponent'
import Loading from '../../Loading'
import { formatTotalTime } from '../../lib/formatTotalTime'

function AlbumDetail() {
    const { id } = useParams()
    const [currentAlbum, setCurrentAlbum] = useState(null)
    const [artistAlbum, setArtistAlbum] = useState(null)
    const [hovered, setHovered] = useState(null)
    const artistId = currentAlbum?.artists[0]?.id;
    const totalDuration = currentAlbum?.tracks?.items.reduce((a, b) => (a + b.duration_ms), 0)



    useEffect(() => {
        fetchModel(`${process.env.REACT_APP_API}/albums/${id}`)
            .then(data => {
                setCurrentAlbum(data); console.log(data);
            })
            .catch(err => console.log('error: ', err))
    }, [id])

    useEffect(() => {
        fetchModel(`${process.env.REACT_APP_API}/artists/${artistId}/albums`)
            .then(data => {
                setArtistAlbum(data); console.log('album of artist: ', data);
            })
            .catch(err => console.log('error: ', err))
    }, [artistId])

    if (!currentAlbum || !artistAlbum) {
        return (
            <Loading />
        )
    }

    return (

        <div>
            {/* HEADER */}
            <div className="card-header bg-header rounded-top-3 p-4 d-flex gap-4">
                <img
                    src={currentAlbum.images[0].url}
                    id='album_img'
                    alt="album img"
                    width={200}
                    height={200}
                    className="rounded-3 shadow"
                />
                <div className="d-flex flex-column justify-content-end">
                    <p className="text-uppercase fw-semibold text-white mb-1">
                        {currentAlbum.album_type}
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
                        <span className="fw-bold text-white">
                            {currentAlbum.artists.map((a) => a.name)}
                        </span>
                        <span>• {new Date(currentAlbum.release_date).getFullYear()}</span>
                        <span>• {currentAlbum.total_tracks} bài hát, {formatTotalTime(totalDuration)}</span>
                    </div>

                </div>
            </div>

            {/* <div className='px-4 z-2 d-flex align-items-center bg-header py-2 gap-2 position-sticky rounded-top-4 d-none'
                style={{
                    top: 40
                }}>
                <Play />
                <h1 className="fw-bold mb-0">{currentAlbum.name}</h1>
            </div> */}
            {/* CONTROL */}
            <div className='px-4 py-3 d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center justify-content-center gap-3'>
                    <Play size={28} />
                    <img src={currentAlbum.images[0].url} alt=""
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
            <div className="px-4 py-3">
                <table className="w-100  align-middle "  >
                    <thead className="text-white position-sticky top-0 z-2">
                        <tr >
                            <th className='text-center' >#</th>
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
                                    <Link to={`/track/${item.id}`} className="text-decoration-none fw-semibold text-white me-1 mb-0">
                                        {item.name}
                                    </Link>

                                    <div className="d-flex align-items-center gap-2 text-white-50 small">
                                        {item.explicit && (
                                            <div className=' text-dark bg-secondary rounded-1' style={{ height: 15, width: 20 }} title='Phản cảm'>
                                                <p style={{ fontSize: 10, fontWeight: 700, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>E</p>
                                            </div>
                                        )}
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
            <div className='px-4 pb-3 text-white-50 small'>
                {currentAlbum.copyrights.map((a, i) => (
                    <p style={{ fontSize: 10 }} key={i}>{a.text}</p>
                ))}
            </div>

            <div className='px-4 py-3'>
                <TitleSection title={`Album khác của ${currentAlbum.artists.map((a) => a.name)}`} />
                <div className="d-flex">
                    <AlbumComponent list={{ ...artistAlbum, items: artistAlbum?.items.slice(0, 7) }}>
                        {item => (
                            <span className='text-white-50 fw-semibold' style={{ maxWidth: 200, fontSize: 14 }} >
                                {new Date(item.release_date).getFullYear()} • <span className='text-capitalize'>{item.album_type}</span>
                            </span>
                        )}
                    </AlbumComponent>
                </div>
            </div>


        </div >

    )
}

export default AlbumDetail