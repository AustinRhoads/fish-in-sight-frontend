import React, { Component } from 'react'
import Registration from '../components/auth/Registration'

class RegistrationContainer extends Component{

    state={
        registrationErrors: "",
    }

    handelSuccessfulAuth = (data) => {  
        this.props.handelLogin(data);
        this.props.history.push(`/users/${data.id}`)
    }

    setError = (error) => {
        this.setState({registrationErrors: error})
    }

    renderErrors = () =>{
         if(this.state.registrationErrors){
             return <p className="error">{this.state.registrationErrors}</p>
         }
    }


    render(){
        return(
            <div className="reg-container">
                {this.renderErrors()}
                <Registration setError={this.setError} getCSRFToken={this.props.getCSRFToken} handelSuccessfulAuth={this.handelSuccessfulAuth} userLogin={this.props.userLogin}/>
                <hr className="solid"></hr>
                <p>Already a member? Login <a href="/login">here</a>.</p>
            </div>
        )
    }
};

export default RegistrationContainer;