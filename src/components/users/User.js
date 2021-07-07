
import React, { Component } from 'react';
import CatchBox from '../catches/CatchBox';
import cuid from 'cuid'

class User extends Component{

   // let name = this.props.user.username;
   renderName = () => {
    if(this.props.user.username){
        return  <h2 className="user-name">{`${this.props.user.username}`.toUpperCase()}</h2>
    }
   }


   renderCatches = () => {
    
    return (this.props.user.catches ? this.props.user.catches.map(caught => <li key={cuid()} > {CatchBox(caught)} </li>) : <h3>No Catches Logged</h3>)
    }

    render(){
        return(
            <div className="user-div">
               
                {this.renderName()}
               
            </div>
        )
    }
    
    


}

export default User;