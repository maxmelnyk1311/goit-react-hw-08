import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations.js';
import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute.jsx';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute.jsx';
import { selectIsRefreshing } from '../../redux/auth/selectors.js';

import Loader from '../Loader/Loader.jsx';
import Layout from '../Layout/Layout.jsx';

const HomePage = lazy(() => import('../../pages/HomePage.jsx'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage.jsx'));
const LoginPage = lazy(() => import('../../pages/LoginPage.jsx'));
const ContactsPage = lazy(() => import('../../pages/ContactsPage.jsx'));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => 
    {
      dispatch(refreshUser());
    }, 
    [dispatch]
  );

  return (
    <Layout>
      {isRefreshing ? <Loader /> : (
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/login" element={<RestrictedRoute component={<LoginPage />}/>} />
            <Route path="/register" element={<RestrictedRoute component={<RegisterPage />}/>} />
            <Route 
              path="/contacts" 
              element={
                <PrivateRoute 
                  component={<ContactsPage />} 
                  redirectTo="/login"
                />} 
            />
          </Routes>
        </Suspense>
      )}
    </Layout>
  )
}


