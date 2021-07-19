
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
      console.log(user)
       this.setState({user: user, is_fetched: true})
       let auxnav = document.body.querySelector('div.aux-nav')   
       auxnav.style.display = "block";
   }

   renderEditLink = () => {
       if(this.props.uid === this.state.user.id){
           return(
               <a href={`/users/${this.props.uid}/edit`}>Edit Detials</a>
           )
       }
   }

   renderUserImage = () => {
       if(this.state.user.image){
           return (
               <img className="user-page-image" alt="ui" src={this.state.user.image.url} style={{maxWidth: 101, maxHeight: 200}}/>
           )
       }
   }

    renderUserInfo = () => {
        if(this.state.is_fetched){
            return (
                <div className="user-componenet">
                    
                    <div className="user-home-info-box" style={{textAlign: "center"}}>
                    
                         <div className="u-box-1">
                             {this.renderUserImage()}
                         </div>
                         <div className="u-box-2">
                            <h1>{this.state.user.username}</h1>
                            <hr className="solid" style={{margin: "auto"}}></hr>
                            <h3>Email: {this.state.user.email}</h3>
                            <hr className="solid" style={{margin: "auto"}}></hr>
                            {this.renderEditLink()}
                        </div>
                    </div>
                    <br />
                <UserCatches redirect={this.props.redirect}  user={this.state.user} uid = {this.state.user.id} species={this.state.user.species} catches={this.state.user.catches} style={{margin: "auto"}}  />
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