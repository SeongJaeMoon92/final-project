import React from 'react'
import { Col, ButtonToolbar } from 'react-bootstrap'

import EducationUpdate from './educationUpdate'
import EducationDelete from './educationDelete'

const ProfileEducation = (props) => {
  const { education, profileId, getProfileData, isOwner } = props
  return(
    <Col className="mx-4 my-2 p-4 rounded bg-white border border-dark">
      <h4>{education.school}</h4>
      <h5>{education.degree}{education.grade && `, ${education.grade}`}</h5>
      <h5>{education.field_of_study}</h5>
      <h5>{!education.end_date || education.start_date === education.end_date ? education.start_date : `${education.start_date} to ${education.end_date}`}</h5>
      {education.description && <p>{education.description}</p>}
      {isOwner() &&
        <ButtonToolbar>
          <EducationUpdate
            profileId={profileId}
            educationId={education.id}
            data={education}
            getProfileData={getProfileData}
          />
          <EducationDelete
            profileId={profileId}
            educationId={education.id}
            degree={education.degree}
            school={education.school}
            getProfileData={getProfileData}
          />
        </ButtonToolbar>
      }
    </Col>
  )

}

export default ProfileEducation
