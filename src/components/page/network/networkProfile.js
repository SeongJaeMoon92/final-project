import React from 'react'
import { Link } from 'react-router-dom'

const NetworkProfile = (props) => {
  const { profile } = props
  return(
    <div>
      {profile.image && <img src={profile.image} />}
      <h2>{profile.name}</h2>
      <h3>{profile.location}</h3>
      <Link to={`/profile/${profile.id}`}>View Profile</Link>
    </div>
  )
}

export default NetworkProfile
