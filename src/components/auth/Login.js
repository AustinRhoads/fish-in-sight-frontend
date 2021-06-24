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
  

        this.props.userLogin(userLoggingIn)
        this.props.history.push('/dashboard')
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