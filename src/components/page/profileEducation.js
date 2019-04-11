import React from 'react'

const ProfileEducation = (props) => {
  const { education } = props
  return(
    <div>
      <h4>{education.school}</h4>
      <h5>{education.degree}{education.grade && `, ${education.grade}`}</h5>
      <h5>{education.field_of_study}</h5>
      <h5>{education.date_from === education.date_to ? education.date_from : `${education.date_from} - ${education.date_to}`}</h5>
      {education.description && <p>{education.description}</p>}
    </div>
  )

}

export default ProfileEducation
