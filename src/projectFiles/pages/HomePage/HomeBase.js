import React from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom";


function HomeBase() {
    const logout = async () => {
        console.log("logout")

        localStorage.clear()
        window.location.reload(false);


    }
    return (
        <div className='container'>

            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link
                        to="/"
                    >
                        <img
                            style={{ width: '100px' }}
                            src={require('../../../assets/images/homePage/logo_1024.png')} alt="" />
                    </Link>
                </div>
                <h1 style={{ fontSize: '1.5rem', marginBottom: 0 }}>Shop Manager</h1>
                <div style={{ display: 'flex', alignItems: 'center' }}>

                    <Link to="/account" style={{ color: '#fb6c3e', display: 'block', textDecoration: 'none', height: 20, }}>Accounts</Link>
                    <Link to="/profile" style={{ color: '#fb6c3e', display: 'block', textDecoration: 'none', height: 20, marginLeft: 20 }}>Profile</Link>

                    <button style={{
                        fontSize: 16, textAlign: 'center',
                        marginTop: 2,
                        marginLeft: 10,
                        background: 'white',
                        border: 'none',
                        color: '#fb6c3e'
                    }}
                        onClick={() => {
                            logout()
                        }}
                    >Logout</button>
                </div>
            </div>
            <Outlet />
            <div style={{ marginTop: 50, backgroundColor: '#FFF7F4', padding: 10, fontWeight: '700' }}>
                <p style={{ margin: 0 }}>© 2022 Jegnus UK Ltd</p>
            </div>
        </div>
    )
}

export default HomeBase