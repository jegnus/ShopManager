import React, {useState} from 'react'
import Order from "./pages/OrdrerHistory/Order";
import {

    Routes,
    Route,
} from "react-router-dom";
import Login from "./pages/LoginPage/Login";

function Base() {
    const [login, setlogin] = useState(true)


    return (
        <div

        >

            {
                login ?
                    <Login
                        setlogin={setlogin}/>
                    :
                    <Order></Order>

            }
        </div>
    )
}

export default Base
