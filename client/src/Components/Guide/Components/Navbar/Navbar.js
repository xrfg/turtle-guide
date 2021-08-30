import React from 'react'
import "./Navbar.scss"

export default function Navbar() {
  function submit(){
    
  }
  return (
    
    <div className="menu-wrap">
    <input type="checkbox" className="toggler"/>
    <div className="hamburger"><div></div></div>
    <div className="menu">
      <div>
        <div>
          <ul>
            <li><a href="#" onClick={submit}>Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
           
          </ul>
        </div>
      </div>
    </div>
    </div>
  
      
   
  )
}
