import React, { Component } from 'react';
import './StatsBox.css'

class StatsBox extends Component {
    state = {
        speciesCount: "...Loading",
        catchesCount: "...Loading",
    }

    componentDidMount(){
       // console.log(this.props.user.catches.length)


    }

    updateAll = () => {
        if(this.props.catchesCount){
           return(<>
            <div className="stat-box">CATCHES: {this.props.catchesCount} </div>
            <div className="stat-box">SPECIES: {this.props.speciesCount} </div>
            </>
           )
        } else {
            console.log("tofu")
        }
    }
    render(){
        
        return(
            
            <div className="stats-box">
             
             {this.updateAll()}

    
            </div>
    
        )
    }

}

export default StatsBox;

//<div className="stat-box">CATCHES: {props.catchesCount}</div>
//<div className="stat-box">SPECIES: {props.speciesCount}</div>



///<div className="stat-box">BAIT TYPES: {baitsCount}</div>