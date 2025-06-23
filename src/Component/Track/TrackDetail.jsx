import React from 'react'
import { useParams } from 'react-router-dom'

function TrackDetail() {
    const { id } = useParams()
    return (
        <div className='container mt-3'>
            <p>TrackDetail {id}</p>
        </div>
    )
}

export default TrackDetail