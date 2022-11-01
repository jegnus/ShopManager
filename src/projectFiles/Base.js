import React, { useState } from 'react'
import Order from "./pages/OrdrerHistory/Order";
import {

    Routes,
    Route,
} from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import Profile from './pages/ProfilePage/Profile';
import Account from './pages/AccountPage/Account';
import HomeBase from './pages/HomePage/HomeBase';
import HomePage from './pages/HomePage/HomePage';
function Base() {
    const [login, setlogin] = useState(true)


    return (
        <div>

            {
                login ?
                    <Login
                        setlogin={setlogin} />
                    // <Routes>
                    //     <Route path='/' element={<HomeBase />} >

                    //         <Route path='Login' element={<Login setlogin={setlogin} />} />
                    //     </Route>
                    // </Routes>
                    :
                    <Routes>
                        <Route path='/' element={<HomeBase />} >

                            <Route index element={<Order />} />
                            <Route path='register' element={<HomePage />} />
                            <Route path='profile' element={<Profile />} />
                            <Route path='account' element={<Account />} />
                        </Route>
                    </Routes>
                // <Order></Order>

            }
        </div>
    )
}

export default Base
