import React, { Component } from 'react'
import Registration from '../components/auth/Registration'
import Login from '../components/auth/Login'
import { withRouter } from 'react-router-dom';


class Home extends Component {


    getCSRFToken = () => {
        return unescape(document.cookie.split('=')[1])
      }

    handelSuccessfulAuth = (data) => {
        this.props.handelLogin(data);
        this.props.history.push('/dashboard')
    }

    handelLogoutClick = () =>{
        
        fetch("http://localhost:3000/logout",{method: "DELETE", credentials: 'include', headers: {'X-CSRF-Token': this.getCSRFToken()}})
        .then(resp => resp.json)
        .then(this.props.handelLogout())
        .catch(error => console.log(error))
        this.props.handelLogout()
        this.props.history.push('/')
        window.location.reload(false);
    }

    render(){
        return(
            <div>

            <button onClick={() => this.handelLogoutClick()}>Logout</button>
            <Registration />
            
            <Login handelSuccessfulAuth={this.handelSuccessfulAuth} getCSRFToken={this.getCSRFToken}/>
            </div>
        )
    }

}

export default withRouter(Home);