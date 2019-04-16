import React from 'react'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Auth from '../../lib/auth'

import ProfileUpdate from './profileUpdate'
import ProfileExperience from './profileExperience'
import ProfileEducation from './profileEducation'
import ExperienceCreate from './experienceCreate'
import EducationCreate from './educationCreate'

import MessageModal from '../../home/message/messageModal'
import MessageProfileModal from '../message'

class Profile extends React.Component{
  constructor(){
    super()

    this.state = { data: {}}
    this.getProfileData = this.getProfileData.bind(this)
    this.isOwner = this.isOwner.bind(this)
    this.handleChangeMessage = this.handleChangeMessage.bind(this)
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this)
  }

  handleChangeMessage({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSubmitMessage(e){
    e.preventDefault()
    const data = {...this.state.data, receiver_id: this.state.profile.owner.id}
    this.setState({data},
      () =>  {
        axios.post('/api/messages', this.state.data,
          { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
          .then((res) => this.setState({data: ''},() => console.log(res.data)))
          .catch(err => this.setState({errors: err.response.data}))
      }
    )
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
        const pendingReceived = res.data.received_friend_requests.filter(request => request.status === 'Requested')
        const pendingSent = res.data.sent_friend_requests.filter(request => request.status === 'Requested')
        this.setState({ pendingReceived: pendingReceived.length, pendingSent: pendingSent.length })
      })
      .catch(err => console.log(err))
  }

  isOwner() {
    return Auth.isAuthenticated() && this.state.profile.owner.id === Auth.getPayload().sub
  }

  render(){
    if (!this.state.profile) return null
    const { profile, pendingReceived, pendingSent } = this.state
    return(
      <Container className="container-fluid my-3 container-min-height">
        <Container className="bg-white rounded border border-dark p-4">
          <Row className="align-items-center">
            {this.isOwner() &&
              <Col xs={12} className="text-right">
                {pendingReceived > 0 &&
                  <Button className="mx-2" href="/discover" size="sm" variant="warning">
                    {pendingReceived} requests waiting
                  </Button>
                }
                {pendingSent > 0 &&
                  <Button className="mx-2" href="/discover" size="sm" variant="primary">
                    {pendingSent} requests sent
                  </Button>
                }
              </Col>
            }
            {!this.isOwner() &&
              <Col xs={12} className="text-right">
                <MessageProfileModal
                  dataMessage={this.state.data}
                  handleChange={this.handleChangeMessage}
                  handleSubmit={this.handleSubmitMessage}
                  data ={profile.name}
                />
              </Col>
            }
            <Col xs={8} md={3} className="mx-auto">
              <img className="rounded" src={profile.image ? profile.image : '../assets/images/profiles/joinedup_no_image.png'} />
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
          <Col xs={12} className="text-right">
            {this.isOwner() &&
              <ProfileUpdate
                data={this.state.profile}
                profileId={this.props.match.params.id}
                getProfileData={this.getProfileData}
              />
            }
          </Col>
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
