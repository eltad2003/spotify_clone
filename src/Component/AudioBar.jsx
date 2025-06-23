import React, { useEffect, useRef, useState } from 'react'
import audioTest from './Có duyên không nợ- DEZIN X TUKI.mp3'

function AudioBar({ audio }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(50)
    const [prevVolume, setPrevVolume] = useState(50)
    const [repeat, setRepeat] = useState(false)
    const audioRef = useRef(null)

    const formatTime = (sec) => {
        if (isNaN(sec)) return "00:00";
        const minutes = Math.floor(sec / 60);
        const seconds = Math.floor(sec % 60);
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const audio = audioRef.current;
        const seekTime = (e.target.value / 100) * audio.duration;
        audio.currentTime = seekTime;
        setProgress(e.target.value);
    };

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        setCurrentTime(audio.currentTime)
        setProgress((audio.currentTime / audio.duration) * 100);
    };
    const handleLoadedMetadata = () => {
        const audio = audioRef.current;
        setDuration(audio.duration);
    };

    const handleVolume = (e) => {
        const audio = audioRef.current
        const ChangeVolume = e.target.value
        setVolume(ChangeVolume)
        audio.volume = ChangeVolume / 100
    }

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = repeat
        }
    }, [repeat])

    return (
        <div className=' bg align-items-center d-flex justify-content-between text-white fixed-bottom p-3'>
            <audio
                src={audioTest}
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
            <div>

            </div>

            {/* Các nút chức năng */}
            <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                <div className="d-flex gap-2">
                    {/* trộn bài */}
                    <button className='btn btn-outline-dark text-white btm-sm'>
                        <i className="bi bi-shuffle" style={{ fontSize: 20 }}></i>
                    </button>
                    <button className='btn btn-outline-dark text-white btm-sm'>
                        <i className="bi bi-skip-backward-fill" style={{ fontSize: 20 }}></i>
                    </button>
                    {/* Pause/play */}
                    <button className="btn rounded-pill btn-light text-black fw-bolder" onClick={togglePlayPause}>
                        {isPlaying ? <i className="bi bi-pause" style={{ fontSize: 20 }} /> : <i className="bi bi-play" style={{ fontSize: 20 }}></i>}
                    </button>
                    <button className='btn btn-outline-dark text-white btm-sm'>
                        <i className="bi bi-skip-forward-fill" style={{ fontSize: 20 }}></i>
                    </button>
                    {/* Lặp lại bài */}
                    <button
                        className={`btn btn-outline-dark btm-sm ${repeat ? 'text-success' : 'text-white'}`}
                        title={repeat ? 'Tắt chế độ lặp' : 'Bật chế độ lặp'}
                        onClick={() => setRepeat(!repeat)}
                    >
                        <i className="bi bi-arrow-clockwise" style={{ fontSize: 20 }}></i>
                    </button>
                </div>

                {/* Thêm hiển thị thời gian */}
                <div className='d-flex gap-2'>
                    <span >{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        className='progress-bar'
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleSeek}
                        style={{
                            cursor: 'pointer',
                            width: '350px',
                        }}
                    />
                    <span >{formatTime(duration)}</span>
                </div>
            </div>


            <div className="d-flex align-items-center">
                <button className='btn btn-outline-dark text-white btm-sm'>
                    <i className="bi bi-menu-button-wide" style={{ fontSize: 20 }}></i>
                </button>
                {/* Điều chỉnh âm lượng */}
                {volume === 0 ?
                    <button className='btn btn-outline-dark text-white btm-sm' onClick={() => { audioRef.current.volume = prevVolume / 100; setVolume(prevVolume) }}>
                        <i className="bi bi-volume-mute" style={{ fontSize: 20 }} />
                    </button> :
                    <button className='btn btn-outline-dark text-white btm-sm' onClick={() => { audioRef.current.volume = 0; setPrevVolume(volume); setVolume(0) }}>
                        <i className="bi bi-volume-up" style={{ fontSize: 20 }} />
                    </button>
                }
                <input type="range" className="volume-bar" min="0" max="100" value={volume} onChange={handleVolume} title={volume} />
                <button className='btn btn-outline-dark text-white btm-sm'>
                    <i className="bi bi-fullscreen" style={{ fontSize: 20 }}></i>
                </button>
            </div>
        </div >

    )
}

export default AudioBar