import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="title">Nutrition check</span>
      <Link to="/">Customer</Link>
      <Link to="/Receiver">Receiver</Link>
      <Link to="/Inspector">Inspector</Link>
    </div>
  )
}

export default Navbar
