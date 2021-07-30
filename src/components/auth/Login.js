import React, { Component } from 'react'
import auth from './auth.js'


class Login extends Component {

    state = {
        password: "",
        email: "",
        loginErrors: "",
    }

    componentDidMount(){
        console.log(this.props)
    }
 

    

    handelOnSubmit = e => {
        e.preventDefault()
        const {
            email,
            password,
        } = this.state

        const userLoggingIn = { 
            user: {
                email: email.toLowerCase(),
                password: password,
            }
        }

        
  
       const configObject = {
        method: "POST",
        credentials: 'include',
        headers: {
            'X-CSRF-Token': unescape(document.cookie.split('=')[1]),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLoggingIn)
    }

    const functionsObject = {
        redirectPath: (id) =>  { if(auth.isAuthenticated){this.props.history.push(`/users/${id}`)}},
        login: (resp) => this.props.login(resp),
        sessionsStore: (userObject) => this.props.userLogin(userObject),
        setError: (error) => {this.props.setError(error)}
    }

    auth.login(functionsObject,   configObject)
  
    /*
    fetch("http://localhost:3000/sessions", configObject)
    .then(resp => resp.json())
    .then(resp => {
        if (resp.logged_in === true){
            console.log(resp.user)
           this.props.handelSuccessfulAuth(resp.user)
           this.props.userLogin(userLoggingIn)
        } else {
            this.props.setError(resp.error)
            console.log(resp.error)
        }
    })
    .catch(error =>{
        console.log("Login error", error)
    });  
    */
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





export default Login;