import React, { useState } from 'react'
import { gql } from "@apollo/client";
import { client } from "../../Features/Client";
import {Modal} from "react-bootstrap";

function Login(props) {
    const [forgetpassword, setforgetpassword] = useState(false)
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const passwordChange = (e) => {
        const resetlink = gql`

            mutation{
                sendPasswordResetEmail(
                    email:"${email}"
                )
                {
                    success
                    errors
                }

            }`

        client.mutate({
            mutation: resetlink,
            fetchPolicy: 'no-cache'
        }).then(res => {
            console.log(res)
            if (res.data.sendPasswordResetEmail.success) {
                setforgetpassword(false)
                alert("Password Reset Link Sent To Your Email")

            }
            else {
                alert("Email Not Found")
            }

        }).catch(err => {
                console.log(err)
            })
        }


    async function getUser() {
        const username = localStorage.getItem('username');

        const token = localStorage.getItem('token');
        console.log("token", token)

        if (token) {
            const checkToken = gql`
                mutation{
                    verifyToken(token: "${token}")
                    {
                        success
                        errors
                    }
                }
            `
            const { data } = await client.mutate({
                mutation: checkToken
            })
            console.log(data)
            if (data.verifyToken.success) {
                props.setlogin(false)

            } else {
                console.log(data.verifyToken.errors)
            }

        }
    }

    getUser()

    const userlogin = async () => {
        console.log(username, password)


        const getusertoken = gql`
            mutation{
                tokenAuth(
                    username:"${username}",
                    password:"${password}"

                )

                {
                    success
                    token
                    refreshToken
                    user{
                        email
                        username
                    }
                }

            }

        `
        const { data } = await client.mutate({
            mutation: getusertoken
        })
        console.log(data)
        if (data.tokenAuth.success) {
            localStorage.setItem('token', data.tokenAuth.token);
            localStorage.setItem('refreshToken', data.tokenAuth.refreshToken);
            localStorage.setItem('user', data.tokenAuth.user.username);
            localStorage.setItem('email', data.tokenAuth.user.email);
            props.setlogin(false)
        }
        else {
            alert("Invalid username or password")
        }

    }


    return (
        <div
            style={{
                display: 'flex',
                // backgroundColor: '#fff1ec',
                height: '100vh',
                alignSelf: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >

            <Modal
                show={forgetpassword}
                onHide={() => setforgetpassword(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Forget Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                onChange={(e) => setemail(e.target.value)}
                                style={{ width: '300px', height: '40px', borderRadius: '5px', border: '1px solid #000', padding: '10px', marginTop: '10px' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <button
                                onClick={passwordChange}
                                style={{ width: '300px', height: '40px', borderRadius: '5px', border: '1px solid #000', padding: '10px', marginTop: '10px' }}
                            >Send Reset Link</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <div className='container' style={{}}>


                <div className='col-lg-4 p-3' style={{
                    margin: '0 auto',
                    border: '1px solid #ccc',
                    borderRadius: 10
                }}>

                    <div className='login'>
                        <div className='loginHeader'>
                            <h1>Login</h1>
                        </div>
                    </div>
                    <div>
                        <div className='mt-3' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <label>Username:</label>
                            <input

                                style={{
                                    width: '60%',
                                    borderRadius: 5,
                                    border: '1px solid #ccc',
                                    padding: 5,
                                    margin: 5,

                                }}
                                onInput={(event) => {
                                    setusername(event.target.value)
                                }}
                                type="text" placeholder={username} name="name" />
                        </div>
                        <div className='my-3' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <label>Password:</label>
                            <input
                                style={{
                                    marginLeft: '25%',
                                    width: '60%',
                                    borderRadius: 5,
                                    border: '1px solid #ccc',
                                    padding: 5,
                                    margin: 5,
                                }}
                                onInput={(event) => {
                                    setpassword(event.target.value)
                                }}

                                type="password"
                                name="password" />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                            <button
                                style={{
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    // width: '30%',
                                    borderRadius: 5,
                                    border: 'none',
                                    padding: '0.5em 3em',
                                    margin: 5,
                                    color: 'white',
                                    backgroundColor: '#fb6c3e'
                                }}
                                onClick={() => userlogin()}
                            >
                                Login
                            </button>

                            <button
                                onClick={() => {
                                    setforgetpassword(true)

                                }}

                                style={{
                                    marginBottom: 0,
                                    border : 'none',
                                    textDecoration: 'underline',
                                    cursor: 'pointer'
                                }}>Forgot password ?</button>
                        </div>
                    </div>
                    {/* <div
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            backgroundColor: 'green'

                        }}>
                        <label

                            style={{
                                width: '50%',
                                borderRadius: 5,
                                padding: 5,
                                margin: 5,
                            }}
                        >
                            Name :
                        </label>
                        <input

                            style={{
                                width: '50%',
                                borderRadius: 5,
                                border: '1px solid #ccc',
                                padding: 5,
                                margin: 5,

                            }}
                            onInput={(event) => {
                                setusername(event.target.value)
                            }}
                            type="text" placeholder={username} name="name" />

                        <label
                            style={{
                                width: '50%',
                                borderRadius: 5,
                                padding: 5,
                                margin: 5,


                            }}
                        >
                            Password :


                        </label>
                        <input
                            style={{
                                marginLeft: '25%',
                                width: '50%',
                                borderRadius: 5,
                                border: '1px solid #ccc',
                                padding: 5,
                                margin: 5,
                            }}
                            onInput={(event) => {
                                setpassword(event.target.value)
                            }}

                            type="password"
                            name="password" />
                        <button
                            style={{
                                alignSelf: 'center',
                                alignItems: 'center',
                                width: '30%',
                                borderRadius: 5,
                                border: '1px solid #ccc',
                                padding: 5,
                                margin: 5,
                            }}
                            onClick={() => userlogin()}
                        >
                            Login
                        </button>
                    </div> */}
                </div>


            </div>



        </div >
    )
}

export default Login
