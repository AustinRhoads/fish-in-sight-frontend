
import React, { Component } from 'react';
import { connect } from "react-redux";
import UserCatches from '../catches/UserCatches';


class User extends Component{
    state = {
        user_id: this.props.match.params.id,
        is_fetched: false,
        user: {},
    }
   

  async componentDidMount(){
     
       const user = await fetch(`http://localhost:3000/api/v1/users/${this.state.user_id}`).then(resp => resp.json())
       this.setState({user: user, is_fetched: true})
       let auxnav = document.body.querySelector('div.aux-nav')   
       auxnav.style.display = "block";
   }


    renderUserInfo = () => {
        if(this.state.is_fetched){
            return (
                <div>
                    <div>
                        <h1>{this.state.user.username}</h1>
                        <h3>Email: {this.state.user.email}</h3>
                    </div>
                <UserCatches redirect={this.props.redirect}  user={this.state.user} uid = {this.state.user.id} species={this.state.user.species} catches={this.state.user.catches}  />
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