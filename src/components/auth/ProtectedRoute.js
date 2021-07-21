import React from 'react'
import auth from './auth.js'


import {Route, Redirect} from 'react-router-dom'

export const ProtectedRoute = ({render: Component, ...rest}) => {
    return(
        <Route {...rest} render={
            (props) =>{
                console.log(localStorage.getItem('loggedInStatus'))
                if(localStorage.getItem('loggedInStatus') === "LOGGED_IN"){
                    
                    return <Component {...props} />;
                } else {
                    console.log(auth.isAuthenticated())
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
               
            }
        }/>
    )
}