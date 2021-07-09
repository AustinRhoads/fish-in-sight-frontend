import React, { Component } from 'react'

//import axios from 'axios';

class Registration extends Component {
    state = {
        username: "",
        password: "",
        password_confirmation: "",
        email: "",
        registrationErrors: "",
    }


    handelOnSubmit = e => {
        e.preventDefault()

        const {
            email,
            username,
            password,
            password_confirmation,
        } = this.state

        const newUser = {
            user: {
            email: email,
            username: username,
            password: password,
            password_confirmation: password_confirmation,
            }
        }

        const configObject = {
            method: "POST",
            credentials: 'include',
            headers: {
                'X-CSRF-Token': this.props.getCSRFToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }

        fetch("http://localhost:3000/registrations", configObject)
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp)
            if(resp.status === "created"){
                console.log(resp)
                this.props.handelSuccessfulAuth(resp.user)
              //  this.props.userLogin(resp.user)
            }
            console.log("registration res", resp);
        }).catch(error =>{
            console.log("registration error", error)
        });



        this.props.userLogin(newUser)
      ///////HHHEEERRREEE!!!!!!!!!!!!!
        
      

        this.setState({
            username: "",
            password: "",
            password_confirmation: "",
            email: "",
            registrationErrors: "",
        })

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
                    <br />
                    <input type="password" name="password_confirmation" placeholder="confirm password" value = {this.state.password_confirmation} onChange={e => this.handelOnChange(e)} required/>
                    <br/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default Registration;