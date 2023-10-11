import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from './pages/Home'; 
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserFromLocalStorage } from './redux/reducers/authReducer';
import { useEffect } from 'react';

function App() {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserFromLocalStorage());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
