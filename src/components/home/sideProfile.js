import React from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'

import Auth from '../lib/auth'
import SideProfileRequired from '../common/sideProfileRequired'

class SideProfile extends React.Component{
  constructor(){
    super()

    this.state = { data: {} }
  }

  componentDidMount(){
    this.getProfileData()
  }

  getProfileData(){
    axios.get(`/api/users/${Auth.getPayload().sub}`,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}}
    )
      .then(res => this.setState({ data: res.data.user_profile[0] }))
  }

  render() {
    const { data } = this.state
    if (!data) return <SideProfileRequired />
    return(
      <div className="d-flex flex-column justify-content-center align-items-center bg-white rounded border-light p-3 py-md-5">
        <a href={`/profile/${data.id}`}><img className="my-2 rounded" width="100" height="100" src={data.image ? data.image : '../assets/images/profiles/joinedup_no_image.png'} /></a>
        {data.name && <p className="my-2 font-weight-bold"><a className="clear-text-decoration" href={`/profile/${data.id}`}>Welcome {data.name}</a></p>}
        <div className="d-flex flex-md-column justify-content-center align-items-center">
          <Button href={`/profile/${data.id}`} className="m-2" size="sm" variant="primary">My profile</Button>
          <Button href="/inbox" className="m-2" size="sm" variant="primary">My messages</Button>
          <Button href="/discover" className="m-2" size="sm" variant="primary">Discover Joins</Button>
        </div>
      </div>
    )
  }
}

export default SideProfile
