import React, { Component } from 'react'
//import axios from 'axios';

class Login extends Component {
    state = {
        username: "",
        password: "",
        email: "",
        loginErrors: "",
    }

    componentDidMount(){
        console.log(this.props)
    }

    

    handelOnSubmit = e => {
        e.preventDefault()
/*
        axios.post("http://localhost:3000/sessions", {
            user: {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
            },
        }, 
        { withCredentials: true }
        ).then(resp => {
            console.log("Login res", resp);
            if (resp.data.logged_in === true){
                this.props.handelSuccessfulAuth(resp.data)
            }
        }).catch(error =>{
            console.log("Login error", error)
        });
        */

        const configObject = {
            method: "POST",
            credentials: 'include',
            headers: {
                'X-CSRF-Token': this.props.getCSRFToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
            }
        })
        }
        fetch("http://localhost:3000/sessions", configObject)
        .then(resp => resp.json())
        .then(resp => {
            console.log("Login res", resp);
            if (resp.logged_in === true){
                this.props.handelSuccessfulAuth(resp)
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

export default Login;