import React, { Component } from 'react';
import CatchBox from './CatchBox';
import cuid from 'cuid'

class Catches extends Component{

    renderList = () => {
        
            if(this.props.catches && this.props.catches.length > 0){
                return  this.props.catches.map(caught => <li key={cuid()} > <CatchBox caught={caught} /> </li>)
            } else {
               return <h3>No Catches Logged yet</h3>
            }
        

    }


    render(){
        return(
            <div className="catches-list">
                <h2>Catches list</h2>
                <ul>
                {this.renderList()}
                </ul>
               
                </div>
        )
    }
}

export default Catches;