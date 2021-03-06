import React from 'react'
import './container.css'

function AuxNavBar(props){


    return(
        <div className="aux-nav">
           
            <a href="/catches">FEED</a>
            <a href="/spots">MAPS</a>
            <a href={`/users/${props.user.id}`}>HOME</a>
            <a href="/spots/new">NEW SPOT</a>
            <a href="/catches/new">NEW CATCH</a>
            
            
        </div>
    )
}

export default AuxNavBar;