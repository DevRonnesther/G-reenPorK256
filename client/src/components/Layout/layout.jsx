import React from 'react'
import Router from "../../Router/Router.jsx"
// import Navbar from "../Navbar/Navbar.jsx"
// import Footer from "../Footer/Footer.jsx"
import { Outlet } from 'react-router-dom'

const layout = () => {
  return (
    <div className="h-screen">
      <div>
        {/* <Navbar /> */}
        <main>
          <Router />
        </main>
        <Outlet />
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default layout