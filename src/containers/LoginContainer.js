import React, { Component } from 'react'

class LoginContainer extends Component {

    state = {
        username: "",
        password: "",
        email: "",
    }


    handelOnSubmit = e => {
        e.preventDefault()
        
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
                <input type="password" name="password" placeholder="password" value = {this.state.password} onChange={e => this.handelOnChange(e)}/>
                <br/>
                <input type="submit" />
                </form>

            </div>
        )
    }

}

export default LoginContainer;