import React from 'react'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Auth from '../../lib/auth'

import ProfileUpdate from './profileUpdate'
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
    this.getPendingRequests()
  }

  getProfileData() {
    axios.get(`/api/profiles/${this.props.match.params.id}`,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}}
    )
      .then(res => this.setState({ profile: res.data }))
      .catch(err => console.log(err))
  }

  getPendingRequests() {
    axios.get(`/api/users/${Auth.getPayload().sub}`,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}}
    )
      .then(res => {
        const connectionRequests = res.data.received_friend_requests
        const pendingRequests = connectionRequests.filter(request => request.status === 'Requested')
        this.setState({ pendingRequests: pendingRequests.length })
      })
      .catch(err => console.log(err))
  }

  isOwner() {
    return Auth.isAuthenticated() && this.state.profile.owner.id === Auth.getPayload().sub
  }

  render(){
    if (!this.state.profile) return null
    const { profile, pendingRequests } = this.state
    return(
      <Container className="container-fluid my-3 container-min-height">
        {this.isOwner() && pendingRequests > 0 &&
          <Col xs={12} className=" mb-2 text-left">
            <Button href="/discover" variant="warning">
              View pending conenction requests ({pendingRequests})
            </Button>
          </Col>
        }
        <Container className="bg-white rounded border border-dark p-4">
          <Row className="align-items-center">
            {this.isOwner() &&
              <Col xs={12} className="text-right">
                <ProfileUpdate
                  data={this.state.profile}
                  profileId={this.props.match.params.id}
                  getProfileData={this.getProfileData}
                />
              </Col>
            }
            <Col xs={8} md={3} className="mx-auto">
              <img src={profile.image ? profile.image : 'https://cdn.filestackcontent.com/Dk4icouSTHqDePOMsHFR'} />
            </Col>
            <Col xs={12} md={9} className="text-center text-md-left">
              <h2 >{profile.name}</h2>
              <h3>{profile.headline}</h3>
              <h3>{profile.location}</h3>
            </Col>
          </Row>
          <Row className="m-2 text-justify">
            <p>{profile.summary}</p>
          </Row>
        </Container>
        <Row className="m-3 text-center">
          {profile.profile_experience.length === 0 &&
            <Col>
              <ExperienceCreate
                profileId={this.props.match.params.id}
                getProfileData={this.getProfileData}
                isOwner={this.isOwner}
              />
            </Col>
          }
          {profile.profile_education.length === 0 &&
            <Col>
              <EducationCreate
                profileId={this.props.match.params.id}
                getProfileData={this.getProfileData}
                isOwner={this.isOwner}
              />
            </Col>
          }
        </Row>
        {profile.profile_experience.length > 0 &&
          <Container className="my-4">
            <Row className="align-items-center my-2 py-2 bg-info text-white rounded">
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
            {profile.profile_experience.sort((a, b) => {
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
            ))}
          </Container>
        }
        {profile.profile_education.length > 0 &&
          <Container className="my-4">
            <Row className="align-items-center my-2 py-2 bg-info text-white rounded">
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

            {profile.profile_education.sort((a, b) => {
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
        }
      </Container>
    )
  }
}

export default Profile
