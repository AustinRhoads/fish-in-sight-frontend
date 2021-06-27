import React, { Component } from 'react';
import Login from '../components/auth/Login'
import Registration from '../components/auth/Registration'
import { connect } from 'react-redux'

class AuthContainer extends Component {
    render(){
        return(
            <div className="auth-div">
                <p>LOGIN</p>
                <Login userLogin={this.props.userLogin}  getCSRFToken={this.props.getCSRFToken} />
                <hr className="solid"></hr>
                <p>Not a member? Sign up.</p>
                <Registration  getCSRFToken={this.props.getCSRFToken} />
            </div>
        )
    }
}

export default connect() (AuthContainer);