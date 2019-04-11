import React from 'react'
import { Link } from 'react-router-dom'

const ProfileExperience = (props) => {
  const { experience, profileId } = props
  return(
    <div>
      <h4>{experience.company}</h4>
      <h5>{experience.title}</h5>
      <h5>{experience.location}</h5>
      <h5>{experience.start_date === experience.end_date ? experience.start_date : `${experience.start_date} - ${experience.end_date}`}</h5>
      {experience.description && <p>{experience.description}</p>}
      <Link to={{
        pathname: `/profile/${profileId}/experience/${experience.id}`,
        state: experience}}>
        Edit experience
      </Link>
    </div>
  )

}

export default ProfileExperience
