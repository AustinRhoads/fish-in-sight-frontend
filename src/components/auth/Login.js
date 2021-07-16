//     import React, { Component } from 'react'
//     //import GoogleLogin from 'react-google-login'
//     
//     
//     
//     class Login extends Component {
//     
//         state = {
//             password: "",
//             email: "",
//             loginErrors: "",
//         }
//      
//     
//         
//     
//         handelOnSubmit = e => {
//             e.preventDefault()
//             const {
//                 email,
//                 password,
//             } = this.state
//     
//             const userLoggingIn = { 
//                 user: {
//                     email: email.toLowerCase(),
//                     password: password,
//                 }
//             }
//       
//            const configObject = {
//             method: "POST",
//             credentials: 'include',
//             headers: {
//                 'X-CSRF-Token': unescape(document.cookie.split('=')[1]),
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userLoggingIn)
//         }
//       
//         fetch("http://localhost:3000/sessions", configObject)
//         .then(resp => resp.json())
//         .then(resp => {
//             if (resp.logged_in === true){
//                 console.log(resp.user)
//                this.props.handelSuccessfulAuth(resp.user)
//                this.props.userLogin(userLoggingIn)
//             } else {
//                 this.props.setError(resp.error)
//                 console.log(resp.error)
//             }
//         })
//         .catch(error =>{
//             console.log("Login error", error)
//         });  
//         }
//     
//     
//     
//         //googleAuth = (obj) =>{
//         //    console.log(obj)
//         //    const type = "google_oauth2"
//         //   const userName =  obj.Ys.Ve;
//         //   const email = obj.Ys.It;
//         //   const password = obj.Ys.xS;
//         //   const password_confirmation = obj.Ys.xS;
//     //
//         //   const userAuth = {
//         //       type,
//         //       userName,
//         //       email,
//         //       password,
//         //       password_confirmation
//         //   }
//         //      
//         //   const configObject = {
//         //    method: "POST",
//         //    credentials: 'include',
//         //    headers: {
//         //        'X-CSRF-Token': unescape(document.cookie.split('=')[1]),
//         //        'Content-Type': 'application/json',
//         //    },
//         //    body: JSON.stringify(userAuth)
//         //}
//       //
//         //fetch("http://localhost:3000/sessions", configObject)
//         //.then(resp => resp.json())
//         //.then(resp => {
//         //    console.log(resp)
//         //    /*
//         //    if (resp.logged_in === true){
//         //        console.log(resp.user)
//         //       this.props.handelSuccessfulAuth(resp.user)
//         //       this.props.userLogin()
//         //    } else {
//         //        this.props.setError(resp.error)
//         //        console.log(resp.error)
//         //    }
//         //    */
//         //})
//         //.catch(error =>{
//         //    console.log("Login error", error)
//         //});  
//         //
//         //}
//     
//     
//     
//     
//         handelOnChange = (e) => {
//             this.setState({
//                 [e.target.name]: e.target.value
//             })
//             
//         }
//     
//     
//         render(){
//             return(
//                 <div>
//                                     {/* <GoogleLogin
//         clientId="688372368793-lpn96cgddoi3p5rpoa74av72lncrg66d.apps.googleusercontent.com"
//         buttonText="Login With Google"
//         onSuccess={(obj) => this.googleAuth(obj)}
//         //onFailure={}
//         cookiePolicy={'single_host_origin'}
//       /> 
//       <hr className="solid"></hr>
//       */}  
//        
//                     <form onSubmit={e => this.handelOnSubmit(e)}>
//     
//                         <input type="text" name="email" value={this.state.email} placeholder="email" onChange={e => this.handelOnChange(e)} required />
//                         <br />
//                         <input type="password" name="password" placeholder="password" value = {this.state.password} onChange={e => this.handelOnChange(e)} required/>
//                         <br/>
//                         <input type="submit" value = "Login"/>
//                     </form>
//                 </div>
//             )
//         }
//     }
//     
//     
//     
//     export default Login;


import React, { Component } from 'react'
//import GoogleLogin from 'react-google-login'



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