import React from 'react'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'
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
    this.isOwner = this.isOwner.bind(this)
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

  isOwner() {
    return Auth.isAuthenticated() && this.state.profile.owner.id === Auth.getPayload().sub
  }

  render(){
    if (!this.state.profile) return null
    const { profile } = this.state
    return(
      <Container className="container-fluid my-3">
        <Container>
          <Row className="align-items-center">
            <Col xs={8} md={3} className="mx-auto">
              <img src={profile.image ? profile.img : '../../../assets/images/profiles/no_image.jpg'} />
            </Col>
            <Col xs={12} md={9} className="text-sm-center text-md-left">
              <h2 >{profile.name}</h2>
              <h3>{profile.headline}</h3>
              <h3>{profile.location}</h3>
            </Col>
            {this.isOwner() && <Col md={12} className="text-sm-right text-lg-right">
              <Button size="sm" variant="primary">
               Edit profile
              </Button>
            </Col>}
          </Row>
          <Row className="m-2 text-justify">
            <p>{profile.summary}</p>
          </Row>
        </Container>
        <Container className="my-4">
          <Row className="align-items-center my-2 py-2 border-bottom border-secondary">
            <Col className="text-left">
              <h3>Experience</h3>
            </Col>
            <Col className="text-right">
              <ExperienceCreate
                profileId={this.props.match.params.id}
                getProfileData={this.getProfileData}
                isOwner={this.isOwner}
              />
            </Col>
          </Row>
          {profile.profile_experience.length > 0 &&
            profile.profile_experience.sort((a, b) => {
              if (a.start_date < b.start_date) return 1
              return -1
            }).map(experience => (
              <Row key={experience.id}>
                <ProfileExperience
                  experience={experience}
                  profileId={this.props.match.params.id}
                  getProfileData={this.getProfileData}
                  isOwner={this.isOwner}
                />
              </Row>
            ))
          }
        </Container>
        <Container className="my-4">
          <Row className="align-items-center my-2 py-2 border-bottom border-secondary">
            <Col className="text-left">
              <h3>Education</h3>
            </Col>
            <Col className="text-right">
              <EducationCreate
                profileId={this.props.match.params.id}
                getProfileData={this.getProfileData}
                isOwner={this.isOwner}
              />
            </Col>
          </Row>
          {profile.profile_education.length > 0 &&
            profile.profile_education.sort((a, b) => {
              if (a.start_date < b.start_date) return 1
              return -1
            }).map(education => (
              <Row key={education.id}>
                <ProfileEducation
                  education={education}
                  profileId={this.props.match.params.id}
                  getProfileData={this.getProfileData}
                  isOwner={this.isOwner}
                />
              </Row>
            ))
          }
        </Container>
      </Container>
    )
  }
}

export default Profile
