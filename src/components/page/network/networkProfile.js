import React from 'react'
import { Card, Image, Button, ButtonToolbar } from 'react-bootstrap'

const NetworkProfile = (props) => {
  const { profile, ownerId, isConnection, isPendingReceived, isPendingSent, requestConnection, approveConnection } = props
  console.log('isConnection', profile.id, isConnection(profile))
  console.log('isPendingReceived', profile.id, isPendingReceived(profile))
  console.log('isPendingSent', profile.id, isPendingSent(profile))
  return(
    <Card className="text-center">
      <Card.Body>
        {<Image src={profile.image ? profile.image : '../../../assets/images/profiles/no_image.jpg'} roundedCircle />}
        <Card.Title>{profile.name}</Card.Title>
        <Card.Text>{profile.headline}</Card.Text>
        {isConnection(profile) && <Card.Text>JoinedUp</Card.Text>}
      </Card.Body>
      <Card.Footer>
        <ButtonToolbar>
          <Button
            variant="primary"
            href={`/profile/${profile.id}`}
          >
            View Profile
          </Button>
          {!isConnection(profile) &&
            !isPendingReceived(profile) &&
            !isPendingSent(profile) &&
            <Button
              variant="primary"
              value={ownerId}
              onClick={requestConnection}
            >
              Request Connection
            </Button>
          }
          {isPendingReceived(profile) &&
            <Button
              variant="primary"
              value={isPendingReceived(profile).id}
              onClick={approveConnection}
            >
              Approve Connection Request
            </Button>
          }
          {isPendingSent(profile) &&
            <p>Connection Requested</p>
          }
        </ButtonToolbar>
      </Card.Footer>
    </Card>
  )
}

export default NetworkProfile
