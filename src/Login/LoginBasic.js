import React, {useState} from 'react';


const LoginBasic = () => {
    const[username ,setUsername] = useState("");
    // const[password ,setPassword] = useState("");

    // var event ={target:{value:"blabla"}}
    
    function usernameHandler(event) {
        setUsername(event.target.value)
    } 

    // function stam (){-
    return (
        <div>
            <h1>Login basic</h1>
            <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
        </div>
    )
}

export default LoginBasic;