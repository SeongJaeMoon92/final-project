import React from 'react'

// import compoenents

import SideProfile from  './sideProfile'
import SocialPost from  './socialPost/socialPost'
import SocialPostNew from  './socialPost/createSocialPost'

class MainPage extends React.Component{
  constructor(){
    super()

    this.state = {}
  }

  render(){
    return (
      <main>
        <SocialPostNew />
        <hr />
        <SideProfile />
        <hr />
        <SocialPost />
      </main>
    )
  }
}

export default MainPage
