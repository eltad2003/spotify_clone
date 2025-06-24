import React from 'react'
import ShowAll from './Buttons/ShowAll'

function TitleSection({ title, url }) {
    return (
        <div className='px-3 d-flex align-items-center'>
            <p className='card-title fs-4 text-white fw-bold'>{title}</p>
            <ShowAll to={url} />
        </div>
    )
}

export default TitleSection