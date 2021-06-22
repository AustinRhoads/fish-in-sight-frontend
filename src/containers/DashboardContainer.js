import React, { Component } from 'react'

class DashboardContainer extends Component {
    
    render(){
        console.log(this.props)
        return(
            <div>
                <h3>Dis be the Dashboard!</h3>
                <h2>Status: { this.props.loggedInStatus}</h2>
            </div>
        )
    }
}

export default DashboardContainer;