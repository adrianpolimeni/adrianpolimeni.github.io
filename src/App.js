import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import {auth} from "./config/firebase";
import { Affix, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


import {
  Itin, Home, Travel, Hotel, Event, CreateEvent, Error, Auth
} from './containers';

function App() {

  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthSet, setAuth] = useState(false);

  auth.onAuthStateChanged(function(user) {
    if (!user && location.pathname != '/login') {
      navigate('/login')
    }
    setAuth(true);
  });

  if(!isAuthSet)
  {
    return(
        <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
          <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 70 }} spin /> } />
        </div>
      );
  }

  return (
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path="/itin" element={<Itin/>} />
      <Route path="/login" element={<Auth/>} />
      <Route path="/itin/event/:id" element={<Event/>} />
      <Route path="/itin/travel/:id" element={<Travel/>} />
      <Route path="/itin/hotel/:id" element={<Hotel/>} />
      <Route path="/itin/add" element={<CreateEvent/>} />
      <Route path="*" element={<Error/>} />
    </Routes>
  );
}

export default App;
