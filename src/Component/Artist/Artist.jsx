import React, { useEffect, useState } from 'react'
import fetchModel from '../lib/fetchModel';

function Artist() {
    const [artists, setArtists] = useState(null)
    useEffect(() => {
        fetchModel(`https://api.spotify.com/v1/browse/categories`)
            .then(data => { setArtists(data); console.log('related-artists: ', data) })
            .catch(err => console.log('error: ', err))
    }, [])
    return (
        <div className='container mt-3'>
            <p className='card-title fs-4 text-white fw-bold'>Artist</p>
        </div>
    )
}

export default Artist