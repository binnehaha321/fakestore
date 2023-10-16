import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { getUserFromLocalStorage } from './helpers/getUser';
import { publicRoutes, privateRoutes } from './routes';
import PrivateLayout from './layout/PrivateLayout';

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFromLocalStorage());
  }, [dispatch]);

  return (
    <Routes>
      {publicRoutes?.map((route) => {
        return (
          <Route key={route.path} index={route.index} path={route.path} element={
            <route.layout>
              <route.component />
            </route.layout>
          } />
        )
      })}
      {privateRoutes?.map((route) => {
        return (
          <Route key={route.path} path={route.path} element={<route.component />} />
        )
      })}
    </Routes>
);
}

export default App;
