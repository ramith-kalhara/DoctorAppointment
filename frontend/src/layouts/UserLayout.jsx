import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'

function UserLayout({children}) {
  return (
    <>
        <Header/>
        <main>{children}</main>
        <Footer/>
        <BackToTop/>
    </>
  )
}

export default UserLayout