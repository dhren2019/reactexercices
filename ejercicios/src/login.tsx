import React from 'react'
import { Link, useHistory } from "react-router-dom"

export const LoginPage: React.FC = () => {
    const history = useHistory();

    const handleLogin = () => {
        history.push("/list");
    }
    return (
        <>
           <h2>Hello from login page</h2> 
           <button onClick={handleLogin}>Login</button>
        </>
    )
}
