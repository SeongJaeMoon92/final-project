import React from 'react'
import { Card, Image, Button } from 'react-bootstrap'

const NetworkProfile = (props) => {
  const { profile, ownerId, isConnection, isPendingReceived, isPendingSent, requestConnection, approveConnection } = props
  console.log('isConnection', profile.id, isConnection(profile))
  console.log('isPendingReceived', profile.id, isPendingReceived(profile))
  console.log('isPendingSent', profile.id, isPendingSent(profile))
  return(
    <Card className="text-center">
      <Card.Image>
        {<Image src={profile.image ? profile.image : '../../../assets/images/profiles/no_image.jpg'} rounded />}
      </Card.Image>
      <Card.Body>
        <Card.Title>{profile.name}</Card.Title>
        <Card.Text>{profile.headline}</Card.Text>
        {isConnection(profile) && <Card.Text>JoinedUp</Card.Text>}
      </Card.Body>
      <Card.Footer>
        <Button
          variant="primary"
          size="sm"
          href={`/profile/${profile.id}`}
        >
          View Profile
        </Button>
      </Card.Footer>
      {!isConnection(profile) &&
        !isPendingReceived(profile) &&
        !isPendingSent(profile) &&
        <Card.Footer>
          <Button
            variant="primary"
            size="sm"
            value={ownerId}
            onClick={requestConnection}
          >
            Request Connection
          </Button>
        </Card.Footer>
      }
      {isPendingReceived(profile) &&
        <Card.Footer>
          <Button
            variant="primary"
            size="sm"
            value={isPendingReceived(profile).id}
            onClick={approveConnection}
          >
            Approve Connection Request
          </Button>
        </Card.Footer>
      }
      {isPendingSent(profile) &&
        <Card.Footer>
          <p className="m-0"><em>Connection Requested</em></p>
        </Card.Footer>
      }


    </Card>
  )
}

export default NetworkProfile
