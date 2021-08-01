import React from 'react'



import {Route, Redirect} from 'react-router-dom'

export const ProtectedRoute = ({render: Component, ...rest}) => {

    return(

            <Route {...rest} render={

                (props) =>{
                
                    if(localStorage.getItem('loggedInStatus') === "LOGGED_IN"){

                        return <Component {...props} />;

                    } else {
                       
                        return <Redirect to={ {pathname: "/", state: { from: props.location } } }/>
                    }
                
                }
            }/>
    )
}