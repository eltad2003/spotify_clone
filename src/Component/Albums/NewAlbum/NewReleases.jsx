import React, { useEffect, useState } from 'react'
import fetchModel from '../../lib/fetchModel'
import { data, Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../../lib/responsiveCarousel';
import TitleSection from '../../TitleSection';
import AlbumComponent from '../Album/AlbumComponent';
import Loading from '../../Loading';

function NewReleases() {
    const [newReleases, setNewReleases] = useState(null)

    useEffect(() => {
        fetchModel(`${process.env.REACT_APP_API}/browse/new-releases`)
            .then(data => { setNewReleases(data.albums); console.log('new-releases: ', data.albums) })
            .catch(err => console.log('error: ', err))
    }, [])

    if (!newReleases) return (
        <Loading />
    )
    return (
        <div className='container mt-3'>
            <TitleSection title={'Album mới phát hành'} url={'section'} />
            <Carousel responsive={responsive}>

                {newReleases.items.map(album => (
                    <div key={album.id}>
                        <AlbumComponent list={{ ...newReleases, items: [album] }}>
                            {item => (
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
                            )}
                        </AlbumComponent>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default NewReleases