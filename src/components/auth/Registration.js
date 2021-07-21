import React, { Component } from 'react'

class Registration extends Component {
    state = {
        username: "",
        password: "",
        password_confirmation: "",
        email: "",
        registrationErrors: "",
        image: <img alt="test" src= "/home/austin/projects/fish-in-sight/fish-in-sight-frontend/src/wavyblankuserimg.png" />,
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
            } else if(resp.status === 500) {
                this.props.setError(resp.error)
            }
            console.log("registration res", resp);
        }).catch(error =>{
            console.log("registration error", error);
            this.props.setError(error);
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

    passwordConfirmMatch = () => {
        if(this.state.password !== this.state.password_confirmation){
            document.getElementById("pw_confirm").style.border = "solid red 1px";
            return(
                <p style={{color: "red", fontSize: "10px"}}>passwords do not match.</p>
            )
        } else {
           if( document.getElementById("pw_confirm")){
            document.getElementById("pw_confirm").style.border = "solid lightgreen 3px";
           }
        }

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
                    <input type="password" id="pw_confirm" name="password_confirmation" placeholder="confirm password" value = {this.state.password_confirmation} onChange={e => this.handelOnChange(e)} required/>
                    {this.passwordConfirmMatch()}
                    <br/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default Registration;