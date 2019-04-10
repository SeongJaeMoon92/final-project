import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component{
  constructor(){
    super()

    this.state = {}
  }

  render() {
    return (
      <div>
        <Link to='/'>Home</Link>
      </div>
    )
  }
}

export default Header
