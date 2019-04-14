import React from 'react'
import { Card, Image, Button, ButtonToolbar } from 'react-bootstrap'

const NetworkProfile = (props) => {
  const { profile } = props
  return(
    <Card className="text-center">
      <Card.Body>
        {<Image src={profile.image ? profile.image : '../../../assets/images/profiles/no_image.jpg'} roundedCircle />}
        <Card.Title>{profile.name}</Card.Title>
        <Card.Text>
          {profile.headline} - {profile.location}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <ButtonToolbar>
          <Button variant="primary" href={`/profile/${profile.id}`}>View Profile</Button>
          <Button variant="primary" href={`/profile/${profile.id}`}>Request Connection</Button>
          <Button variant="primary" href={`/profile/${profile.id}`} disabled>Connection Requested</Button>
        </ButtonToolbar>
      </Card.Footer>
    </Card>
  )
}

export default NetworkProfile
