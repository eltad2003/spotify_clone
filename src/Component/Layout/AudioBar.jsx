import React, { useEffect, useRef, useState } from 'react'
import audioTest from '../Có duyên không nợ- DEZIN X TUKI.mp3'
import { Link } from 'react-router-dom';

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
        <div className='bg align-items-center justify-content-between w-100 d-flex px-3 fixed-bottom d-xs-none'>
            <div className="d-flex align-items-center gap-3" style={{ width: '25%' }}>
                <img src="http://dummyimage.com/100x100.png/5fa2dd/ffffff" alt="thumbnail" width={50} height={50} className="rounded" />
                <div className="d-flex flex-column justify-content-center">
                    <Link className="text-decoration-none text-white fw-semibold text-truncate" style={{ maxWidth: 180 }}>
                        Tên bài hát
                    </Link>
                    <Link className="text-decoration-none text-white-50 text-truncate" style={{ maxWidth: 180 }}>
                        Tên nghệ sĩ
                    </Link>
                </div>
                <i className='bi bi-plus-circle text-white-50 fs-6' />
            </div>

            {/* Các nút chức năng */}
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ width: '50%' }} >
                <div className="d-flex justify-content-center align-items-center gap-3 mb-1  mt-2">
                    {/* trộn bài */}
                    <button className='btn text-white-50 m-0 p-0'>
                        <i className="bi bi-shuffle" style={{ fontSize: 20 }}></i>
                    </button>
                    <button className='btn text-white-50 m-0 p-0'>
                        <i className="bi bi-skip-backward-fill" style={{ fontSize: 20 }}></i>
                    </button>
                    {/* Pause/play */}
                    <button className="btn rounded-pill btn-light text-black fw-bolder" onClick={togglePlayPause}>
                        {isPlaying ? <i className="bi bi-pause" style={{ fontSize: 16 }} /> : <i className="bi bi-play" style={{ fontSize: 16 }}></i>}
                    </button>
                    <button className='btn text-white-50 m-0 p-0'>
                        <i className="bi bi-skip-forward-fill" style={{ fontSize: 20 }}></i>
                    </button>
                    {/* Lặp lại bài */}
                    <button
                        className={`btn ${repeat ? 'text-success' : 'text-white-50'} p-0`}
                        title={repeat ? 'Tắt chế độ lặp' : 'Bật chế độ lặp'}
                        onClick={() => setRepeat(!repeat)}
                    >
                        <i className="bi bi-arrow-clockwise" style={{ fontSize: 20 }}></i>
                    </button>
                    <audio
                        src={audioTest}
                        ref={audioRef}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                    />
                </div>

                {/* Thêm hiển thị thời gian */}
                <div className="d-flex align-items-center gap-2 w-100 mb-1">
                    <span style={{ fontSize: '0.8rem', color: 'white' }}>{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        className="w-100"
                        style={{
                            height: '4px',
                            accentColor: '#1DB954',
                            background: '#4d4d4d',
                            borderRadius: '4px',
                            outline: 'none',
                            transition: 'background .2s'
                        }}
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleSeek}
                    />
                    <span style={{ fontSize: '0.8rem', color: 'white' }}>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="d-flex align-items-center justify-content-end gap-2 " style={{ width: '25%' }}>
                <button className="btn btn-sm text-white"><i className="bi bi-menu-button-wide" /></button>
                {volume === 0 ? (
                    <button className="btn btn-sm text-white" onClick={() => { audioRef.current.volume = prevVolume / 100; setVolume(prevVolume) }}>
                        <i className="bi bi-volume-mute" />
                    </button>
                ) : (
                    <button className="btn btn-sm text-white" onClick={() => { audioRef.current.volume = 0; setPrevVolume(volume); setVolume(0) }}>
                        <i className="bi bi-volume-up" />
                    </button>
                )}
                <input
                    type="range"
                    className=""
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolume}
                    style={{
                        width: '80px',
                        accentColor: '#1DB954',
                        height: '4px',
                        background: '#4d4d4d',
                        borderRadius: '4px',
                        outline: 'none',
                        transition: 'background .2s'
                    }}
                />
                <button className="btn btn-sm text-white"><i className="bi bi-fullscreen" /></button>
            </div>
        </div >

    )
}

export default AudioBar