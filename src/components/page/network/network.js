import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class Network extends React.Component{
  constructor(){
    super()

    this.state = {}
  }

  getProfilesData() {
    axios.get(`/api/profiles/${this.props.match.params.id}`,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}}
    )
      .then(res => this.setState({ profile: res.data }, () => console.log(this.state)))
      .catch(err => console.log(err))
  }
  render(){
    return(
      <h1>Network</h1>
    )
  }
}

export default Network
