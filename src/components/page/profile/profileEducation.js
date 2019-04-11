import React from 'react'
import { Link } from 'react-router-dom'

const ProfileEducation = (props) => {
  const { education, profileId } = props
  return(
    <div>
      <h4>{education.school}</h4>
      <h5>{education.degree}{education.grade && `, ${education.grade}`}</h5>
      <h5>{education.field_of_study}</h5>
      <h5>{education.start_date === education.end_date ? education.start_date : `${education.start_date} - ${education.end_date}`}</h5>
      {education.description && <p>{education.description}</p>}
      <Link to={{
        pathname: `/profile/${profileId}/education/${education.id}`,
        state: education}}>
        Edit education
      </Link>
    </div>
  )

}

export default ProfileEducation
