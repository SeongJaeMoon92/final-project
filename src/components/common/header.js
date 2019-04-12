import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../lib/auth'
import axios from 'axios'

class Header extends React.Component{
  constructor(){
    super()

    this.state = {}
  }

  componentDidMount() {
    axios.get(`/api/users/${Auth.getPayload().sub}`)
      .then(res => console.log(res.data))
  }

  render() {
    return (
      <div>
        <Link to='/'>Home</Link>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
        <Link to={`/profile/${Auth.getPayload().sub}`}>My profile</Link>
      </div>
    )
  }
}

export default Header
