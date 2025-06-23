import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CallbackPage from './Component/CallbackPage';
import Layout from './Component/Layout';
import Home from './Component/Home/Home';
import Login from './Component/Login';
import Profile from './Component/Profile';
import AlbumDetail from './Component/AlbumDetail';
import Library from './Component/Home/Library';

import TrackDetail from './Component/TrackDetail';
import ArtistDetail from './Component/ArtistDetail';
import MainContent from './Component/Home/MainContent';

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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App