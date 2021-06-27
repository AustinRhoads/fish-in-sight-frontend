import React, { Component } from 'react'
//import Registration from '../components/auth/Registration'
//import Login from '../components/auth/Login'
import AuthContainer from './AuthContainer'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'



class Home extends Component {


    getCSRFToken = () => {
        return unescape(document.cookie.split('=')[1])
      }
      componentDidMount(){
          console.log(this.props.loggedInStatus)
      }

    handelSuccessfulAuth = (data) => {
        //this.props.handelLogin(data);
       // this.props.history.push('/dashboard')
    }

    renderAuth = () => {
        console.log(this.props)
        if(this.props.loggedInStatus === "NOT_LOGGED_IN"){
            return <AuthContainer getCSRFToken={this.getCSRFToken} userLogin={this.props.userLogin}/>
        } else {
            return <h2>Hows it hanging?</h2>
        }
    }



    render(){
        return(
            <div>

           {this.renderAuth()}
            </div>
        )
    }

}

const mapStateToProps = state => {
    console.log(state)
    return{
      loggedInStatus: state.userStatus.loggedInStatus,
      user: state.userStatus.user,
    }
    
  }
  
export default connect(mapStateToProps) (withRouter(Home));