import React, { Component } from 'react'
import Registration from '../components/auth/Registration'
import Login from '../components/auth/Login'
//import AuthContainer from './AuthContainer'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'



class Home extends Component {


    getCSRFToken = () => {
        return unescape(document.cookie.split('=')[1])
      }
      componentDidMount(){
        let auxnav = document.body.querySelector('div.aux-nav')
        auxnav.style.display = "none";
      }

    handelSuccessfulAuth = (data) => {  
        this.props.handelLogin(data);
        this.props.history.push('/dashboard')
    }


    renderAuth = () => {
        return(
            <div className="auth-div">
                <p>LOGIN</p>
                <Login userLogin={this.props.userLogin}  getCSRFToken={this.props.getCSRFToken} handelSuccessfulAuth={this.handelSuccessfulAuth} />
                <hr className="solid"></hr>
                <p>Not a member? Sign up.</p>
                <Registration userLogin={this.props.userLogin}  getCSRFToken={this.props.getCSRFToken} handelSuccessfulAuth={this.handelSuccessfulAuth} />
            </div>
        )
    }

    renderAppropriatePage = () => {
        console.log(this.props)
        if(this.props.loggedInStatus === "NOT_LOGGED_IN"){
           // return <AuthContainer handelSuccessfulAuth={this.handelSuccessfulAuth} getCSRFToken={this.getCSRFToken} userLogin={this.props.userLogin}/>
            return this.renderAuth()
        } else {
            return <h2>Hows it hanging?</h2>
        }
    }



    render(){
        return(
            <div id="home-page">

           {/*this.renderAppropriatePage()*/}
           
            </div>
        )
    }

}

const mapStateToProps = state => {
    console.log(state)
    return{
     // loggedInStatus: state.userStatus.loggedInStatus,
     // user: state.userStatus.user,
    }
    
  }
  
export default connect(mapStateToProps) (withRouter(Home));