import React, { Component } from 'react'
import Login from '../components/auth/Login'


class LoginContainer extends Component{

    state = {
        loginErrors: "",
    }

    componentDidMount(){
        let auxnav = document.body.querySelector('div.aux-nav')
        auxnav.style.display = "none";
    }

    handelSuccessfulAuth = (data) => { 
         
        this.props.handelLogin(data);
        this.props.history.push(`/users/${data.id}`)
    }

    setError = (error) => {
        this.setState({loginErrors: error})
    }

    renderErrors = () =>{
         if(this.state.loginErrors){
             return <p className="error">{this.state.loginErrors}</p>
         }
    }

   



    render(){
        return(
            <div className="log-container">

                
               
                {this.renderErrors()}
                <Login getCSRFToken={this.props.getCSRFToken} setError={this.setError} handelSuccessfulAuth={this.handelSuccessfulAuth} userLogin={this.props.userLogin} />
                <hr className="solid"></hr>
                <p>Not a member? Sign up <a href="/register">here</a>.</p>
            </div>
        )
    }
};

export default LoginContainer;