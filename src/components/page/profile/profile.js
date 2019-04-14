import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

import ProfileExperience from './profileExperience'
import ProfileEducation from './profileEducation'
import ExperienceCreate from './experienceCreate'
import EducationCreate from './educationCreate'

class Profile extends React.Component{
  constructor(){
    super()

    this.state = {}
    this.getProfileData = this.getProfileData.bind(this)
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData() {
    axios.get(`/api/profiles/${this.props.match.params.id}`,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}}
    )
      .then(res => this.setState({ profile: res.data }, () => console.log('getting profile data', this.state)))
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
          <img src={profile.image ? profile.img : '../../../assets/images/profiles/no_image.jpg'} />
        </div>
        <div className="profile-experience">
          <h2>Experience</h2>
          <ExperienceCreate
            profileId={this.props.match.params.id}
            getProfileData={this.getProfileData}
          />
          {profile.profile_experience.length > 0 &&
            profile.profile_experience.sort((a, b) => {
              if (a.start_date < b.start_date) return 1
              return -1
            }).map(experience => (
              <div key={experience.id} className="experience-content">
                <ProfileExperience
                  experience={experience}
                  profileId={this.props.match.params.id}
                  getProfileData={this.getProfileData}
                />
              </div>
            ))
          }
        </div>
        <div className="profile-education">
          <h2>Education</h2>
          <EducationCreate
            profileId={this.props.match.params.id}
            getProfileData={this.getProfileData}
          />
          {profile.profile_education.length > 0 &&
            profile.profile_education.sort((a, b) => {
              if (a.start_date < b.start_date) return 1
              return -1
            }).map(education => (
              <div key={education.id} className="education-content">
                <ProfileEducation
                  education={education}
                  profileId={this.props.match.params.id}
                  getProfileData={this.getProfileData}
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
