import React from 'react'
import { Col, ButtonToolbar } from 'react-bootstrap'

import ExperienceUpdate from './experienceUpdate'
import ExperienceDelete from './experienceDelete'

const ProfileExperience = (props) => {
  const { experience, profileId, getProfileData, isOwner } = props
  return(
    <Col className="mx-4 my-2 p-4 rounded bg-white border border-dark">
      <h4>{experience.company}</h4>
      <h5>{experience.title}</h5>
      <h5>{experience.location}</h5>
      <h5>{!experience.end_date || experience.start_date === experience.end_date  ? experience.start_date : `${experience.start_date} to ${experience.end_date}`}</h5>
      {experience.description && <p>{experience.description}</p>}
      {isOwner() &&
        <ButtonToolbar>
          <ExperienceUpdate
            profileId={profileId}
            experienceId={experience.id}
            data={experience}
            endDate={experience.end_date}
            getProfileData={getProfileData}
          />
          <ExperienceDelete
            profileId={profileId}
            experienceId={experience.id}
            jobTitle={experience.title}
            company={experience.company}
            getProfileData={getProfileData}
          />
        </ButtonToolbar>
      }
    </Col>
  )

}

export default ProfileExperience
