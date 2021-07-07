import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';


class Login extends Component {

    state = {
        username: "",
        password: "",
        email: "",
        loginErrors: "",
    }
 

    

    handelOnSubmit = e => {
        e.preventDefault()
        const {
            email,
            username,
            password,
        } = this.state

        const userLoggingIn = { 
            user: {
                email: email,
                username: username,
                password: password,
            }
        }
  

       // this.props.userLogin(userLoggingIn)
       // this.props.history.push('/dashboard')
       const configObject = {
        method: "POST",
        credentials: 'include',
        headers: {
            'X-CSRF-Token': unescape(document.cookie.split('=')[1]),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLoggingIn)
    }
  
    fetch("http://localhost:3000/sessions", configObject)
    .then(resp => resp.json())
    .then(resp => {
        if (resp.logged_in === true){
            console.log(resp.user)
           this.props.handelSuccessfulAuth(resp.user)
           this.props.userLogin(userLoggingIn)
        }
    })
    .catch(error =>{
        console.log("Login error", error)
    });  
    }

    handelOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }


    render(){
        return(
            <div>
                <form onSubmit={e => this.handelOnSubmit(e)}>
                    <input type="text" name="username" value={this.state.username} placeholder="username" onChange={e => this.handelOnChange(e)} />
                    <br />
                    <input type="text" name="email" value={this.state.email} placeholder="email" onChange={e => this.handelOnChange(e)} required />
                    <br />
                    <input type="password" name="password" placeholder="password" value = {this.state.password} onChange={e => this.handelOnChange(e)} required/>
                    <br/>
                    <input type="submit" value = "Login"/>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
       
    }
}

export default connect(null, mapDispatchToProps) (withRouter(Login));