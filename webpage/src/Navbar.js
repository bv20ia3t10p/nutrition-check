import React from 'react'
import { Link } from 'react-router-dom'
import './app.css'
import {Tabs} from './scripts'

const Navbar = () => {
  return (
    <div className="navbar" onClick = {Tabs}>
      <span className="title">Nutrition check</span>
      <Link className = "tab-item selected" to="/">Customer</Link>
      <Link className = "tab-item " to="/Receiver">Receiver</Link>
      <Link className = "tab-item" to="/Inspector">Inspector</Link>
      <div className = "line"></div>
    </div>
  )
}

export default Navbar
