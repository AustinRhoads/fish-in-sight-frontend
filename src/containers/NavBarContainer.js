import React from 'react'


function NavBarContainer(props){



  const  logout = () => {
        
       props.userLogout()
        return false;
    }

  const  renderUser = () => {
        if(props.loggedInStatus === "LOGGED_IN"){
            return <><a href="/dashboard" className= "nav-link user-link right-1">{props.user.username}</a>
            <a href="/" className= "nav-link user-link right-2" onClick={() => logout()}>Logout</a></>
        } else {
            return <><a href = "/" className= "nav-link right-2">Login</a></>
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