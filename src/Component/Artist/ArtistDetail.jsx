import React from 'react'
import { useParams } from 'react-router-dom'

function ArtistDetail() {
    const { id } = useParams()
    return (
        <div className='container text-white'>
            <p>ArtistDetail {id} </p>
        </div>
    )
}

export default ArtistDetail