import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './app.css'
import { Tabs } from './scripts'

const Navbar = () => {
  useEffect(() => {
    Tabs()
  }, [])
  return (
    <div className="navbar">
      <span className="title">Nutrition check</span>
      <Link key={1} className="tab-item selected" to="/">
        Customer
      </Link>
      <Link key={2} className="tab-item " to="/Receiver">
        Receiver
      </Link>
      <Link key={3} className="tab-item" to="/Inspector">
        Inspector
      </Link>
      <div className="line"></div>
    </div>
  )
}

export default Navbar
