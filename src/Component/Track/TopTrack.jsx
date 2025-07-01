import React, { useEffect, useState } from 'react'
import fetchModel from '../lib/fetchModel'
import TitleSection from '../TitleSection'
import CardItem from '../CardItem'
import { Link } from 'react-router-dom'

function TopTrack() {
    const [topTracks, setTopTracks] = useState(null)
    useEffect(() => {
        fetchModel(`${process.env.REACT_APP_API}/me/top/tracks`)
            .then(data => { setTopTracks(data); console.log('top tracks: ', data) })
            .catch(err => console.log('error: ', err))
    }, [])

    return (
        <>
            {topTracks && (
                <div className='container mt-3'>
                    <TitleSection title={'Top bài hát bạn thích'} url={`/section`} />
                    <CardItem list={topTracks} typeLink={'track'} rounded={'3'}>
                        {item => (
                            <div className='d-flex flex-column mb-0 mt-2 text-start'>
                                <Link to={`/track/${item.id}`} className="text-decoration-none fw-semibold text-white mb-0">
                                    {item.name}
                                </Link>
                                {item.artists.map((artist, i) => (
                                    <span key={artist.id}>
                                        <Link to={`/artist/${artist.id}`} className="text-decoration-none text-white-50 me-1">
                                            {artist.name}
                                        </Link>
                                    </span>
                                ))}
                            </div>
                        )}
                    </CardItem>
                </div >
            )}
        </>
    )
}

export default TopTrack