import React from 'react'
import { Card, Button } from 'react-bootstrap'

const NetworkProfile = (props) => {
  const { profile, ownerId, isConnection, isPendingReceived, isPendingSent, requestConnection, approveConnection } = props
  console.log('isConnection', profile.id, isConnection(profile))
  console.log('isPendingReceived', profile.id, isPendingReceived(profile))
  console.log('isPendingSent', profile.id, isPendingSent(profile))
  return(
    <Card className="text-center mb-3">
      <a className="clear-text-decoration" href={`/profile/${profile.id}`}>
        <Card.Img src={profile.image ? profile.image : './assets/images/profiles/joinedup_no_image.png'} />
        <Card.Body>
          <Card.Title>{profile.name}</Card.Title>
          <Card.Text>{profile.headline}</Card.Text>
        </Card.Body>
      </a>
      {isConnection(profile) &&
        <Card.Footer className="bg-primary">
          <p className="m-0 py-1 text-white">JoinedUp!</p>
        </Card.Footer>
      }
      {isPendingSent(profile) &&
        <Card.Footer className="bg-secondary">
          <p className="m-0 py-1 text-white font-italic">Pending</p>
        </Card.Footer>
      }
      {!isConnection(profile) &&
        !isPendingReceived(profile) &&
        !isPendingSent(profile) &&
        <Card.Footer className="bg-info">
          <Button
            variant="secondary"
            size="sm"
            value={ownerId}
            onClick={requestConnection}
          >
            Request Connection
          </Button>
        </Card.Footer>
      }
      {isPendingReceived(profile) &&
        <Card.Footer className="bg-secondary">
          <Button
            variant="warning"
            size="sm"
            value={isPendingReceived(profile).id}
            onClick={approveConnection}
          >
            Approve Request
          </Button>
        </Card.Footer>
      }
    </Card>
  )
}

export default NetworkProfile
