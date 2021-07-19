import React from 'react';
import CatchBox from './CatchBox';
import cuid from 'cuid'



export function Catches (props){



const renderCatches = () => {
    
        return(
            <ul>
                {props.catches.map(caught => <li key={cuid()} > <CatchBox uid={caught.user_id} caught={caught} /> </li> )}
            </ul>
        )
 
}



    return(
        <div className="global-feed-catches">
            {renderCatches()}

        </div>
    )


}

export default Catches;