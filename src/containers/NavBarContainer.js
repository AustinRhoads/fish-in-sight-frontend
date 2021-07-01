import React, { Component } from 'react'
import { connect } from 'react-redux'
//import {NavLink} from 'react-router-dom';

class NavBarContainer extends Component {

    componentDidMount(){
       // console.log(this.props)
    }

    logout = () => {
        
       this.props.userLogout()
        return false;
    }

    renderUser = () => {
        if(this.props.loggedInStatus === "LOGGED_IN"){
            return <><a href="/dashboard" className= "nav-link user-link right">{this.props.user.username}</a>
            <a href="/" className= "nav-link user-link right" onClick={() => this.logout()}>Logout</a></>
        } else {
            return <><a href = "/" className= "nav-link">Login</a></>
        }
    }

    render(){
        return(
            <div className="nav-bar-container">
              
                <a className= "nav-link" href = "/">FISH IN SIGHT</a> 
                
                {this.renderUser()}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        user: state.userStatus.user,
        loggedInStatus: state.userStatus.loggedInStatus,
    }
}

export default connect(mapStateToProps) (NavBarContainer);