import React from 'react'
import "./Navbar.scss"
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom'

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
          <Box >
                <Link  className="links" href="/" color="inherit">Home</Link>
          </Box>
          <Box>
                <Link className="links" href="/map" color="inherit">Map</Link>
          </Box>
          <Box>
                <Link className="links" href="/settings" color="inherit" onClick={submit}>Settings</Link>
          </Box>
          <Box>
                <Link className="links" href="/exihibtions" color="inherit">All Exihibtions</Link>
          </Box>
          </ul>
        </div>
      </div>
    </div>
    </div>
  
      
   
  )
}
