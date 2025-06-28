import React, { useEffect, useState } from 'react'
import TitleSection from '../TitleSection'
import fetchModel from '../lib/fetchModel'
import CardItem from '../CardItem'

function Playlists() {
    const [playlists, setPlaylists] = useState(null)


    useEffect(() => {
        fetchModel(`${process.env.REACT_APP_API}/me/playlists`)
            .then(data => { setPlaylists(data); console.log('Playlists: ', data) })
            .catch(err => console.log('error: ', err))
    }, [])
    return (
        <>
            {playlists?.length > 0 && (
                <div className='container mt-3' >
                    <TitleSection title={'Tuyển tập nhạc hay nhất của các nghệ sĩ'} />
                    <CardItem list={playlists} rounded={'3'} typeLink={'playlists'} />
                </div>
            )}
        </>
    )
}

export default Playlists