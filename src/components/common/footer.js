import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

const Footer = () => {

  return(

    <Navbar collapseOnSelect sticky="bottom" expand="lg" bg="primary" variant="dark" className="justify-content-center">
      <Nav>
        <Nav.Link href="/">
          &copy;
          <img
            src="../../assets/images/link-512.png"
            width="30"
            height="30"
          />
          Joined Up
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Footer
