import React, { useEffect, useState } from 'react'
import TitleSection from '../TitleSection'
import Loading from '../Loading'
import fetchModel from '../lib/fetchModel'


function TopPlaylist() {
    const [topPlaylists, setTopPlaylists] = useState()
    const ids = '37i9dQZEVXbLdGSmz6xilI'
    useEffect(() => {
        fetchModel(`https://api.spotify.com/v1/playlists/37i9dQZEVXbLiRSasKsNU9`)
            .then(data => { setTopPlaylists(data); console.log('top playlists: ', data) })
            .catch(err => console.log('error: ', err))
    }, [])

    if (!topPlaylists) return (
        <Loading />
    )
    return (
        <div className='container my-3'>
            <TitleSection title={'Bảng xếp hạng Nổi bật'} url={'section'} />

        </div>
    )
}

export default TopPlaylist