import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import ProfileExperience from './profileExperience'
import ProfileEducation from './profileEducation'

class Profile extends React.Component{
  constructor(){
    super()

    this.state = {}
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData() {
    axios.get(`/api/profiles/${this.props.match.params.id}`)
      .then(res => this.setState({ profile: res.data }, () => console.log(this.state)))
      .catch(err => console.log(err))
  }

  createExperience() {
    axios.post(`/api/profiles/${this.props.match.params.id}/experiences`)
  }

  updateExperience(e) {
    axios.put(`/api/profiles/${this.props.match.params.id}/experiences/${e.value}`)
  }

  deleteExperience(e) {
    axios.delete(`/api/profiles/${this.props.match.params.id}/experiences/${e.value}`)
  }

  handleExperienceCreate() {
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
          <Link to={`/profile/${this.props.match.params.id}/experience`} >Add new experience</Link>

          {profile.profile_experience.length > 0 &&
            profile.profile_experience.map(experience => (
              <div key={experience.id} className="experience-content">
                <ProfileExperience
                  experience={experience}
                  profileId={this.props.match.params.id}
                />
              </div>
            ))
          }
        </div>
        <div className="profile-education">
          <h2>Education</h2>
          <Link to={`/profile/${this.props.match.params.id}/education`} >Add new education</Link>
          {profile.profile_education.length > 0 &&
            profile.profile_education.map(education => (
              <div key={education.id} className="education-content">
                <ProfileEducation
                  education={education}
                  profileId={this.props.match.params.id}
                />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Profile
