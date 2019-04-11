import React from 'react'
import axios from 'axios'

import Auth from '../../lib/auth'

class SideProfile extends React.Component{
  constructor(){
    super()

    this.state = { data: {} }
  }

  componentDidMount(){
    this.getProfileData()
  }

  getProfileData(){
    axios.get('/api/profiles/1')
      .then(res => this.setState({ data: res.data }))
  }
  
  // getProfileData(){
  //   axios.get(`/api/profiles/${Auth.getPayload().sub}`)
  //     .then(res => this.setState({ data: res.data }))
  // }

  render() {
    const {data} = this.state
    return(
      <div className="sideProfile">
        {data.image && <img src={data.image} />}
        {data.name && <span>Welcome {data.name}</span> }
      </div>
    )
  }
}

export default SideProfile
