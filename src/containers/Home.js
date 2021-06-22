import React, { Component } from 'react'
import Registration from '../components/auth/Registration'
import Login from '../components/auth/Login'
import { withRouter } from 'react-router-dom';

class Home extends Component {



    handelSuccessfulAuth = (data) => {
        this.props.handelLogin(data);
        this.props.history.push('/dashboard')
    }

    render(){
        return(
            <div>

            <Registration />
            <Login handelSuccessfulAuth={this.handelSuccessfulAuth} getCSRFToken={this.props.getCSRFToken()}/>
            </div>
        )
    }

}

export default withRouter(Home);