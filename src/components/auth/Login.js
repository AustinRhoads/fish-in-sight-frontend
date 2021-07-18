import React, { Component } from 'react'


class Login extends Component {

    state = {
        password: "",
        email: "",
        loginErrors: "",
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
    }

    handelOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }


    render(){
        return(
            <div>
               
       <hr className="solid"></hr>
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