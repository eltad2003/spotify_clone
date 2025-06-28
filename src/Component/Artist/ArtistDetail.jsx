import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import fetchModel from '../lib/fetchModel'
import Play from '../Buttons/Play'
import { formatNum, formatTime } from '../lib/format'
import TitleSection from '../TitleSection'
import CardItem from '../CardItem'
import AlbumComponent from '../Albums/Album/AlbumComponent'
import Loading from '../Loading'

function ArtistDetail() {
    const { id } = useParams()
    const [artist, setArtist] = useState(null)
    const [albums, setAlbums] = useState(null)
    const [topTrack, setTopTrack] = useState(null)
    const [hovered, setHovered] = useState(null)
    const [showAll, setShowAll] = useState(false)
    const [isAddPlaylist, SetIsAddPlaylist] = useState(false)
    const [isFollow, SetIsFollow] = useState(false)

    useEffect(() => {
        fetchModel(`${process.env.REACT_APP_API}/artists/${id}`)
            .then(data => {
                setArtist(data); console.log(data);
            })
            .catch(err => console.log('error: ', err))
    }, [id])
    useEffect(() => {
        fetchModel(`${process.env.REACT_APP_API}/artists/${id}/top-tracks`)
            .then(data => {
                setTopTrack(data.tracks); console.log('top track: ', data.tracks);
            })
            .catch(err => console.log('error: ', err))
    }, [id])

    useEffect(() => {
        fetchModel(`${process.env.REACT_APP_API}/artists/${id}/albums`)
            .then(data => {
                setAlbums(data); console.log('album of artist: ', data);
            })
            .catch(err => console.log('error: ', err))
    }, [id])

    if (!artist || !topTrack || !albums) {
        return (
            <Loading />
        )
    }

    return (
        <div style={{ minHeight: '75vh', maxHeight: '75vh', overflow: 'auto' }}>
            <div className="card-header bg-secondary rounded-top-3"
                style={{
                    position: 'relative',
                    minHeight: 300,
                    backgroundImage: artist.images && artist.images.length > 0 ? `url(${artist.images[0].url})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',

                }} >

                <div className="d-flex flex-column position-absolute start-0 bottom-0 px-4">
                    <p className='fw-semibold mb-0'>
                        <i className="bi bi-patch-check-fill fs-5 mb-0" title='Verified account' />
                        <span> {artist.type === 'artist' && 'Nghệ sĩ'} </span>
                        được xác minh
                    </p>
                    <p className='fw-bolder display-1'>{artist.name} </p>
                    <p className='fw-semibold'> {formatNum(artist.followers.total)} người theo dõi </p>
                </div>
            </div>

            {/* CONTROL */}
            <div className='px-4 py-3 d-flex align-items-center gap-4'>
                <Play size={30} />
                <img src={artist.images[2].url} alt=""
                    className='p-1 border-secondary border rounded-3 img-fluid'
                    style={{
                        width: 40, height: 50,
                    }}
                />
                <button className='btn btn-sm p-0'>
                    <i className="bi bi-shuffle text-white-50" style={{ fontSize: 28 }}></i>
                </button>
                <button className='btn btn-sm rounded-pill text-white active fw-bold' onClick={() => SetIsFollow(true)}>
                    {isFollow ? 'Đang theo dõi' : 'Theo dõi'}
                </button>
                <button className='btn btn-sm p-0'>
                    <i className="bi bi-three-dots text-white-50" style={{ fontSize: 28 }}></i>
                </button>
            </div>

            {/* top track */}
            <div className="px-4 py-3">
                <p className='fw-bold fs-4'>Phổ biến</p>
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
                            <div className="col-auto" style={{ minWidth: 50 }}>
                                {hovered === idx ? (
                                    <button className="btn btn-sm p-0 p-0 m-0">
                                        <i className="bi bi-play-fill text-white" style={{ fontSize: 20 }}></i>
                                    </button>
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
                                    <div className=' text-dark bg-secondary' style={{ height: 15, width: 20 }} title='Phản cảm'>
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
            {/* Album of artist */}

            <div className='px-4 py-3'>
                <TitleSection title={'Danh sách đĩa nhạc'} />
                <div className="d-flex">
                    <AlbumComponent list={{ ...albums, items: albums.items.slice(0, 7) }}>
                        {item => (
                            <p className='text-wrap text-white-50 fw-semibold' style={{ maxWidth: 200, fontSize: 14 }} >
                                {new Date(item.release_date).getFullYear() === 2025 ? 'Bản phát hành mới nhất' : new Date(item.release_date).getFullYear()} • {item.album_type}
                            </p>
                        )}
                    </AlbumComponent>
                </div>

            </div>
        </div>

    )
}

export default ArtistDetail