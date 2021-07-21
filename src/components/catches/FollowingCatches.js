import React from 'react';
import PostBox from './PostBox';
import cuid from 'cuid'



export function FollowingCatches (props){



//const renderCatches = () => {
//    
//        return(
//            <ul>
//                {props.catches.map(caught => <li key={cuid()} > <PostBox uid={caught.user_id} caught={caught} /> </li> )}
//            </ul>
//        )
// 
//}



    return(
        <div className="following-feed-catches">
            <ul>
            {props.catches.map(caught => <li key={cuid()} > <PostBox uid={caught.user_id} caught={caught} /> </li> )}
            </ul>
        </div>
    )


}

export default FollowingCatches;