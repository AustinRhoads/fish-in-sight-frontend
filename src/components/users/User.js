
import React, { Component } from 'react';
import { connect } from "react-redux";
import Catches from '../catches/Catches';
//import StatsBox from './StatsBox';
//import CatchBox from '../catches/CatchBox';
//import cuid from 'cuid'

class User extends Component{
    state = {
        user_id: this.props.match.params.id,
        is_fetched: false,
        user: {},
    }
   

  async componentDidMount(){
     
       const user = await fetch(`http://localhost:3000/api/v1/users/${this.state.user_id}`).then(resp => resp.json())
       this.setState({user: user, is_fetched: true})
   }


    renderUserInfo = () => {
     //  const user = this.find_user()
        if(this.state.is_fetched){
            return (
                <div>
                <h1>{this.state.user.username}</h1>
               
                <Catches redirect={this.props.redirect}  user={this.state.user} uid = {this.state.user.id} species={this.state.user.species} catches={this.state.user.catches}  />
                </div>

    
            )
        } else {
            <h2>...Loading</h2>
        }

    }
    
    render(){
       
        return(
            
            <div className="user-div">
             
             {this.renderUserInfo()}
               
               
            </div>
        )
    }
    
    


}


const mapStateToProps = (state) => {
    return{
        allUsers: state.userStatus.allUsers,
    }
}

export default connect(mapStateToProps)(User);