import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export function PostBox(props) {


//console.log(timeAgo.format(new Date(props.caught.created_at)))
const renderImage = () => {
    
    if(props.caught.image){
        return(
            <div style={{position: 'relative'}}>
            <a href={`/catches/${props.caught.id}`}><img className="post-image" style={{maxHeight: 290, maxWidth: 290}} src={props.caught.image.url} alt="caught pic"></img></a>
           
            </div>
        )
    } else if(props.caught.species) {
        return(
            <h3 className="" style={{height: 80, width: 80}} >{props.caught.species.name}, <i>{`${props.caught.species.scientific_name}`}</i></h3>
           
            
        )
     
    }
}

const user = props.caught.user;

const renderUserBanner = () =>{
    if(user.image){
        return(    
            <div className="user-banner-1">
                <a href={`/users/${user.id}`}><img alt="user-thumb" className="user-thumb" src={props.caught.user.image.url} style={{MaxWidth: 100, maxHeight: 55}} /></a>
                <p style={{marginLeft: 100}}><a href={`/users/${user.id}`}>{props.caught.user.username}</a></p>
                <p style={{marginLeft: 100, top: 30}}>posted: {timeAgo.format(new Date(props.caught.created_at))}</p>
            </div>
            )
    } else {
        return (
            <div className="user-banner-1">
            
            <p style={{marginLeft: 100}}><a href={`/users/${user.id}`}>{props.caught.user.username}</a></p>
            <p style={{marginLeft: 100, top: 30}}>posted: {timeAgo.format(new Date(props.caught.created_at))}</p>
        </div>
        )
    }


}


    return(
        
        <div className="post-box" style={{ "width": '100%'}}>
            <div className="pb-div-1" >
                
                        {renderUserBanner()}
                

              {renderImage()}

                <div className="" style={{textAlign: 'center'}}>
                {props.caught.species.name}
                <br />
                {props.caught.notes}
                </div>
                <a style={{marginLeft: 12}} href={`/catches/${props.caught.id}`}>Details</a>
            </div>
            
        </div>
    )



}

export default PostBox;