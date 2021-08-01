import React from 'react'


class Users extends Component{

    state = {
        users: [],
    }

    async componentDidMount(){
        
        const users = await fetch("http://localhost:3000/api/v1/users").then(resp => resp.json())
        this.setState({users: users})
    }

    render(){
        return(
            <div></div>
        )
    }
}

export default Users;