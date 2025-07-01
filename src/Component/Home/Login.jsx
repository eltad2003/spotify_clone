import React from 'react'
import { generateCodeChallenge, generateRandomString } from "../lib/SpotifyAuth";

function Login() {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL;


    const handleLogin = async () => {
        const codeVerifier = generateRandomString(128);
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        localStorage.setItem("code_verifier", codeVerifier);

        const scope = "user-read-private user-read-email user-top-read";

        const authUrl = `https://accounts.spotify.com/authorize?` +
            `client_id=${clientId}` +
            `&response_type=code` +
            `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
            `&scope=${encodeURIComponent(scope)}` +
            `&code_challenge_method=S256` +
            `&code_challenge=${codeChallenge}`;

        window.location.href = authUrl;
    }

    return (
        <div className='container mt-3 min-vh-100'>
            <div className="card-header">
                <h2>Spotify Login Demo</h2>
            </div>
            <div className="card-body">
                <button onClick={handleLogin}>Login with Spotify</button>
            </div>
        </div>
    )
}

export default Login