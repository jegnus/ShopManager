import React, { useState } from 'react'
import Order from "./pages/OrdrerHistory/Order";
import {

    Routes,
    Route,
} from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import Profile from './pages/ProfilePage/Profile';
function Base() {
    const [login, setlogin] = useState(true)


    return (
        <div

        >

            {
                login ?
                    <Login
                        setlogin={setlogin} />
                    :
                    <Routes>
                        <Route path='/' element={<Order />} >
                        </Route>
                        <Route path='profile' element={<Profile />} />

                    </Routes>
                // <Order></Order>

            }
        </div>
    )
}

export default Base
