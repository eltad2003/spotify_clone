import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import fetchModel from '../lib/fetchModel'
import Loading from '../Loading'
import { formatTime } from '../lib/format'
import Play from '../Buttons/Play'
import './TrackDetail.css'
import ArtistDetail from '../Artist/ArtistDetail'
import TopTrackOfArtist from '../Artist/TopTrackOfArtist'
import TitleSection from '../TitleSection'
import AlbumComponent from '../Albums/Album/AlbumComponent'

function TrackDetail() {
    const { id } = useParams()
    const [tracks, setTracks] = useState()
    const [currentArtist, setCurrentArtist] = useState()
    const [topTracks, setTopTracks] = useState()
    const [albums, setAlbums] = useState(null)
    const [artists, setArtists] = useState()
    const artistId = tracks?.artists[0]?.id

    useEffect(() => {
        const fetchAll = async () => {
            const [trackData, topTracksData, artistData, albumData] = await Promise.all([
                fetchModel(`${process.env.REACT_APP_API}/tracks/${id}`),
                fetchModel(`${process.env.REACT_APP_API}/artists/${artistId}/top-tracks`),
                fetchModel(`${process.env.REACT_APP_API}/artists/${artistId}`),
                fetchModel(`${process.env.REACT_APP_API}/artists/${artistId}/albums`),
            ])

            if (trackData) setTracks(trackData)
            if (topTracksData) setTopTracks(topTracksData.tracks)
            if (artistData) setCurrentArtist(artistData)
            if (albumData) setAlbums(albumData);
            console.log('track: ', trackData);

        }
        fetchAll()
    }, [id, artistId])

    useEffect(() => {
        if (!tracks) return;
        const fetchArtists = async () => {
            const results = await Promise.all(
                tracks.artists.map(a =>
                    fetchModel(`${process.env.REACT_APP_API}/artists/${a.id}`)
                )
            );
            setArtists(results);
        };
        fetchArtists();
    }, [tracks]);

    if (!tracks || !topTracks || !currentArtist || !albums || !artists) return <Loading />
    return (
        <div style={{ minHeight: '78vh', maxHeight: '78vh', overflow: 'auto' }}>
            <div className="card-header bg-secondary px-4 py-3">
                <div className="d-flex gap-3">
                    <img
                        src={tracks.album.images[0].url}
                        id='album_img'
                        alt="album img"
                        width={200}
                        height={200}
                        className="rounded-3 shadow"
                    />
                    <div className="d-flex flex-column justify-content-end">
                        <p className="fw-semibold text-white mb-0">
                            {tracks.type === 'track' && 'Bài hát'}
                        </p>
                        <h1 className="fw-bolder " style={{ fontSize: 32 }}>{tracks.name}</h1>

                        <div className="d-flex align-items-center gap-2 text-white-50">
                            <img
                                src={currentArtist.images[0].url}
                                alt="artist"
                                width={32}
                                height={32}
                                className="rounded-pill"
                            />
                            <span className="fw-semibold text-white">
                                {tracks.artists[0].name} • {tracks.album.name}
                            </span>
                            <span>• {new Date(tracks.album.release_date).getFullYear()}</span>
                            <span>• {formatTime(tracks.duration_ms)}</span>
                            <span>• bài hát</span>
                        </div>

                    </div>
                </div>
            </div>

            <div className='px-4 py-3 d-flex align-items-center gap-4'>
                <Play size={30} />
                <button className='btn btn-sm p-0'>
                    <i className="bi bi-plus-circle text-white-50" style={{ fontSize: 28 }}></i>
                </button>
                <button className='btn btn-sm p-0'>
                    <i className="bi bi-arrow-down-circle text-white-50" style={{ fontSize: 28 }}></i>
                </button>
                <button className='btn btn-sm p-0'>
                    <i className="bi bi-three-dots text-white-50" style={{ fontSize: 28 }}></i>
                </button>
            </div>
            {/* artist */}
            {artists.map(artist => (
                <div className='p-2 d-flex gap-3 mx-4 rounded-2' id='track_artist' key={artist.id}>
                    <Link to={`/artist/${artist.id}`}>
                        <img src={artist.images[0]?.url} alt={artist.name} width={80} height={80} className='rounded-circle' />
                    </Link>
                    <div className="d-flex flex-column justify-content-center">
                        <p className='fw-semibold mb-0'>{artist.type === 'artist' && 'Nghệ sĩ'}</p>
                        <Link to={`/artist/${artist.id}`} className="text-decoration-none fw-bold text-white">
                            {artist.name}
                        </Link>
                    </div>
                </div>
            ))}

            {/*Top track of artist */}
            <div className='px-4 mt-4 mb-0'>
                <small className='text-white-50 fw-semibold'>Các bản nhạc thịnh hành của</small>
                <p className='fw-bold fs-4'>{tracks.artists[0].name}</p>
            </div>
            <TopTrackOfArtist topTrack={topTracks} />


            {/* Album of artist */}
            <div className='px-4 py-3'>
                <TitleSection title={`Các bản phát thịnh hành của ${currentArtist.name}`} url={'/discography'} />
                <div className="d-flex">
                    <AlbumComponent list={{ ...albums, items: albums?.items.slice(0, 7) }}>
                        {item => (
                            <p className='text-wrap text-white-50 fw-semibold' style={{ maxWidth: 200, fontSize: 14 }} >
                                {new Date(item.release_date).getFullYear() === 2025 ? 'Bản phát hành mới nhất' : new Date(item.release_date).getFullYear()} •
                                <span className='text-capitalize'> {item.album_type}</span>
                            </p>
                        )}
                    </AlbumComponent>
                </div>

            </div>
        </div>
    )
}

export default TrackDetail