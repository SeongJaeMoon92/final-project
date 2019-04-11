import React from 'react'

// import compoenents

import SideProfile from  './sections/sideProfile'
import SocialPost from  './sections/socialPost'

class MainPage extends React.Component{
  constructor(){
    super()

    this.state = {}
  }

  render(){
    return (
      <main>
        <SideProfile />
        <hr />
        <SocialPost />
      </main>
    )
  }
}

export default MainPage
