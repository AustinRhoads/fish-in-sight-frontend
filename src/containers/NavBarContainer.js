import React from 'react'


function NavBarContainer(props){



  const  logout = () => {
        
       props.logout()
     //  this.history.push("/")
       // return false;
    }

  const  renderUser = () => {
        if(props.loggedInStatus === "LOGGED_IN"){
            return <><a href={`/users/${props.user.id}`} className= "nav-link user-link right-1">{props.user.username}</a>
            <a href="/" className= "nav-link user-link right-2" onClick={() => logout()}>Logout</a></>
        } else {
            return <>
            <a href = "/login" className= "nav-link right-1">Login</a>
            <a href = "/register" className="nav-link user-link right-2">Register</a>
            </>
        }
    }

   
        return(

            <div className="nav-bar-container">
            
                <a className= "nav-link home-link" href = "/">FISH IN SIGHT</a> 
                
                
                {renderUser()}
                <h1 className="nav-center">FISH IN SIGHT</h1>
            </div>
        )
   

}


export default NavBarContainer;