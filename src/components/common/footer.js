import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

const Footer = () => {

  return(

    <Navbar collapseOnSelect sticky="bottom" expand="lg" bg="primary" variant="dark" className="justify-content-center">
      <Nav>
        <Nav.Link href="/">
          <img
            alt="JoinedUp"
            src="../../assets/images/joinedup/joinedup_logo_white_small.png"
            height="30"
            className="d-inline-block align-top"
          />
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Footer
