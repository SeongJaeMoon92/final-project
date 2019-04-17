import React from 'react'
import { Container, Row, Button } from 'react-bootstrap'

const SideProfileRequired = () => {
  return(
    <Container className="d-flex flex-column justify-content-center align-items-center bg-white rounded border-light p-3 py-md-5">
      <Row className="justify-content-center text-center mt-5 mb-2">
        <h5>Please create a profile.</h5>
      </Row>
      <Row className="justify-content-center m-4">
        <Button variant="primary" href="/profile/new">Create a profile</Button>
      </Row>
    </Container>
  )
}

export default SideProfileRequired
