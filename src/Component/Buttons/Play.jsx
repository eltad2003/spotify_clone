import React, { useState, useEffect, useRef } from 'react'

function Play({ size = 28, uri = 'spotify:track:54flyrjcdnQdco7300avMJ' }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [player, setPlayer] = useState(null)
    const [deviceId, setDeviceId] = useState(null)
    const token = localStorage.getItem('token')
    const playerRef = useRef(null)

    useEffect(() => {
        if (!window.Spotify) {
            const script = document.createElement('script')
            script.src = 'https://sdk.scdn.co/spotify-player.js'
            script.async = true
            document.body.appendChild(script)
        }

        window.onSpotifyWebPlaybackSDKReady = () => {
            const _player = new window.Spotify.Player({
                name: 'Spotify Web Player',
                getOAuthToken: cb => { cb(token) },
                volume: 0.5
            })
            playerRef.current = _player
            setPlayer(_player)

            _player.addListener('ready', ({ device_id }) => {
                setDeviceId(device_id)
            })
            _player.connect()
        }
    }, [token])

    const handlePlay = async () => {
        setIsPlaying(true)
        // Gọi API phát nhạc
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [uri] }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }

    const handlePause = () => {
        setIsPlaying(false)
        playerRef.current && playerRef.current.pause()
    }

    return (
        <>
            {isPlaying ? (
                <button className='btn rounded-pill' style={{ background: '#1db954' }} onClick={handlePause}>
                    <i className="bi bi-pause-fill text-dark" style={{ fontSize: size }} />
                </button>
            ) : (
                <button className='btn rounded-pill' style={{ background: '#1db954' }} onClick={handlePlay} >
                    <i className="bi bi-play-fill text-dark" style={{ fontSize: size }} />
                </button>
            )}
        </>
    )
}

export default Play