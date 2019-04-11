import React from 'react'
import axios from 'axios'

import ProfileExperience from './profileExperience'
import ProfileEducation from './profileEducation'

class Profile extends React.Component{
  constructor(){
    super()

    this.state = {}
  }
  componentDidMount() {
    axios.get(`/api/profiles/${this.props.match.params.id}`)
      .then(res => this.setState({ profile: res.data }, () => console.log(this.state)))
      .catch(err => console.log(err))
  }

  render(){
    if (!this.state.profile) return null
    const { profile } = this.state
    return(
      <div>
        <h1>Profile page</h1>
        <div className="profile-header">
          <h2>{profile.name}</h2>
          <h3>{profile.summary}</h3>
          <h3>{profile.location}</h3>
        </div>
        <div className="profile-experience">
          <h2>Experience</h2>
          <ProfileExperience
            data={profile.profile_experience}
          />
          <p>Insert component here</p>
        </div>
        <div className="profile-education">
          <h2>Education</h2>
          {profile.profile_education.map(education => (
            <div key={education.id}>
              <ProfileEducation
                education={education}
              />
            </div>
          ))}

          <p>Insert component here</p>
        </div>
      </div>
    )
  }
}

export default Profile
