import React from 'react'

// import compoenents

import SideProfile from  './sections/sideProfile'

class MainPage extends React.Component{
  constructor(){
    super()

    this.state = {}
  }

  render(){
    return (
      <main>
        <SideProfile />
      </main>
    )
  }
}

export default MainPage
