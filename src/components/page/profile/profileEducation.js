import React from 'react'

import EducationUpdate from './educationUpdate'
import EducationDelete from './educationDelete'

const ProfileEducation = (props) => {
  const { education, profileId, getProfileData } = props
  return(
    <div>
      <h4>{education.school}</h4>
      <h5>{education.degree}{education.grade && `, ${education.grade}`}</h5>
      <h5>{education.field_of_study}</h5>
      <h5>{education.start_date === education.end_date ? education.start_date : `${education.start_date} to ${education.end_date}`}</h5>
      {education.description && <p>{education.description}</p>}
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
    </div>
  )

}

export default ProfileEducation
