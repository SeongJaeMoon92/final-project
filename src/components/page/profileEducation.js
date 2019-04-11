import React from 'react'

const ProfileEducation = (props) => {
  const { education } = props
  return(
    <div>
      <h4>{education.school}</h4>
      <h5>{education.degree}</h5>
    </div>
  )

}

export default ProfileEducation
