import React, { useEffect, useState } from 'react'
import fetchModel from '../lib/fetchModel';

import TitleSection from '../TitleSection';
import CardItem from '../CardItem';

function TopArtist() {
    const [artists, setArtists] = useState(null)
    useEffect(() => {
        fetchModel(`https://api.spotify.com/v1/me/top/artists`)
            .then(data => { setArtists(data); console.log('top artist: ', data) })
            .catch(err => console.log('error: ', err))
    }, [])

    return (
        <div className='container mt-3'>
            <TitleSection title={'Top Nghệ sĩ'} url={`/section/topArtist`} />
            <CardItem list={artists} typeLink={'artist'} rounded={'3'} >
                {item => (
                    <div className='text-start'>
                        <p className='fw-semibold mt-2 mb-0'>{item.name}</p>
                        <p className='fw-semibold small text-white-50'>{item.type === 'artist' && 'Nghệ sĩ'}</p>
                    </div>
                )}
            </CardItem>
        </div>
    )
}

export default TopArtist