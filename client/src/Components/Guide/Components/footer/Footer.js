import React from 'react'
import "./footer.scss"

export default function Footer() {
 
    let currentYear=new Date().getFullYear()
  
  return (
    <div className="Footer-div">
      <footer>
        <p>Lorem ipsum dolor sit.</p>
      <p> © Turtle App @ {currentYear} </p>

      </footer>
      
    </div>
  )
}
