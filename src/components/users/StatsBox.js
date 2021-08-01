import React from 'react';
import './StatsBox.css'

function StatsBox (props){


 

   const updateAll = () => {
        if(props.catchesCount){
           return(<>
            <div className="stat-box">CATCHES: {props.catchesCount} </div>
            <div className="stat-box">SPECIES: {props.speciesCount} </div>
            </>
           )
        } 
    }
    
        
        return(
            
            <div className="stats-box">
             
             {updateAll()}

    
            </div>
    
        )
    

}

export default StatsBox;
