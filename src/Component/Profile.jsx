import React, { useEffect, useState } from 'react'

function Profile() {
    const token = localStorage.getItem('token')
    const [profile, setProfile] = useState()

    const fetchProfile = async () => {
        try {
            const res = await fetch("https://api.spotify.com/v1/me", {
                method: "GET", headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) {
                console.log('Failed to fetch');

            }
            const data = await res.json();
            console.log(data);

            setProfile(data)
        } catch (error) {
            console.log('error: ', error);

        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        <div className='container mt-3'>
            <div className='p-2 card bg-dark text-white'>
                <h1>{profile?.display_name}</h1>
            </div>
        </div>
    )
}

export default Profile