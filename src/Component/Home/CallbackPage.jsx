import { useEffect, useState } from "react";

const CallbackPage = () => {
  const [profile, setProfile] = useState([])

  const fetchToken = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const codeVerifier = localStorage.getItem("code_verifier");

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.REACT_APP_REDIRECT_URL,
      client_id: process.env.REACT_APP_CLIENT_ID,
      code_verifier: codeVerifier
    });

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString()
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Token fetch failed:", errorText);
      return;
    }

    const data = await res.json();
    localStorage.setItem('token', data.access_token)

    const userRes = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    const userData = await userRes.json();
    setProfile(userData);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <div className="container text-white">
      <h2>Spotify Callback</h2>
      {profile ? (
        <div>
          <p><strong>Name:</strong> {profile.display_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>ID:</strong> {profile.id}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>

  )
};

export default CallbackPage;
