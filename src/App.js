import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Component/Layout/Layout';
import MainContent from './Component/Home/MainContent';
import Login from './Component/Home/Login';
import Profile from './Component/Home/Profile';
import AlbumDetail from './Component/Albums/Detail/AlbumDetail';
import TrackDetail from './Component/Track/TrackDetail';
import ArtistDetail from './Component/Artist/ArtistDetail';
import CallbackPage from './Component/Home/CallbackPage';
import PlaylistDetail from './Component/Playlists/Detail/PlaylistDetail';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/callback' element={<CallbackPage />} />
        <Route path='/' element={<Layout />} >
          <Route index path='/' element={<MainContent />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/album/:id' element={<AlbumDetail />} />
          <Route path='/track/:id' element={<TrackDetail />} />
          <Route path='/artist/:id' element={<ArtistDetail />} />
          <Route path='/playlist/:id' element={<PlaylistDetail />} />
          <Route path='/section'>

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App