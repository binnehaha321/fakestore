import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUserFromLocalStorage } from './helpers/getUser';
import { publicRoutes, privateRoutes } from './routes';

import Login from './pages/Login';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() =>{
    dispatch(getUserFromLocalStorage());
  },[dispatch])

  const {user}  = useSelector((state) => state.auth);

  return (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path} 
          element={
            user ? (
              <route.layout>
                <route.subLayout>
                  <route.component/>
                </route.subLayout>
              </route.layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      ))}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          index={route.index}
          path={route.path}
          element={
            <route.layout>
              <route.component />
            </route.layout>
          }
        />
      ))}
      <Route path='/login' element={user? (<Navigate to="/"/>): <Login/>}></Route>
    </Routes>
  );
}

export default App;
