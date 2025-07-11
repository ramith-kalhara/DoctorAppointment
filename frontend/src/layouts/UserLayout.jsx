import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'
import { Outlet } from 'react-router-dom';
function UserLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> 
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default UserLayout;