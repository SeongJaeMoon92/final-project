import React from 'react'
import { Container, Row, Button } from 'react-bootstrap'

const ProfileRequired = () => {
  return(
    <Container className="my-3 container-min-height">
      <div className="h-100">
        <Row className="justify-content-center text-center mt-5 mb-2">
          <h4>You need to create a profile before being able to access this page.</h4>
        </Row>
        <Row className="justify-content-center m-4">
          <Button variant="primary" href="/profile/new">Create a profile</Button>
        </Row>
      </div>
    </Container>
  )
}

export default ProfileRequired
