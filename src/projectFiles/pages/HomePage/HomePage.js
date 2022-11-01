import React from 'react'

function HomePage() {
    return (
        <div className='container '>
            <section>
                <div style={{ display: 'flex', marginTop: 80, marginBottom: 80 }}>

                    <div style={{ width: '60%' }}>
                        <h1

                            style={{ fontSize: 64, lineHeight: 0.9, fontWeight: '200' }}>
                            Deliver Your fresh food at <span style={{ fontWeight: '400' }}>Customer's doorstep</span>
                        </h1>
                        <p style={{ width: '60%', marginTop: 20, color: '#565656', fontWeight: '400' }}>Grow your <span style={{ fontWeight: '700' }}>Restaurant</span>  business by using our services, which provide fast, safe and trackable way to deliver food.<br /> Join us today!</p>
                        <div style={{ marginTop: 50 }}>

                            <a
                                href='#registerForm'
                                style={{

                                    backgroundColor: 'black',
                                    color: 'white',
                                    padding: '1em 2em', textDecoration: 'none',
                                    marginTop: 20,
                                    fontWeight: '700'
                                }}
                            >Apply Now</a>
                        </div>
                    </div>
                    <div>
                        <img
                            style={{ width: 500 }}
                            src={require('../../../assets/images/register/take-away.png')}
                        >
                        </img>
                    </div>
                </div >
            </section >

            <section style={{ marginTop: '100px' }}>
                <div className='row'>
                    <div className='col-lg-5'>
                        <h2 style={{ margin: 0 }}>Onboarding</h2>
                        <p>You can get onboard in just few easy steps</p>
                        <div className='mt-5' style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <p>Step1:</p>
                            <div
                                style={{ width: '80%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                            >
                                <img
                                    style={{ width: '40px' }}
                                    src={require('../../../assets/images/register/form_logo.png')}
                                ></img>
                                <p className='my-3' style={{ textAlign: 'center' }}>Fill the simple application form</p>
                            </div>
                        </div>
                        <div className='mt-5' style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <p>Step2:</p>
                            <div
                                style={{ width: '80%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                            >
                                <img
                                    style={{ width: '40px' }}
                                    src={require('../../../assets/images/register/details_logo.png')}
                                ></img>
                                <p className='my-3' style={{ textAlign: 'center' }}>Our team will verify the details</p>
                            </div>
                        </div>
                        <div className='mt-5' style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <p>Step3:</p>
                            <div
                                style={{ width: '80%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                            >
                                <img
                                    style={{ width: '40px' }}
                                    src={require('../../../assets/images/register/confirmation_logo.png')}
                                ></img>
                                <p className='my-3' style={{ textAlign: 'center' }}>Once verified by our team, you can start using our delivery services</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-7'>
                        <div
                            id='registerForm'
                            className='col-lg-6' style={{
                                padding: '1em 1.5em',
                                borderRadius: 10,
                                margin: '0 auto',
                                boxShadow: "0px -1px 15px 3px rgba(0,0,0,0.15)"
                            }}>
                            <h3 style={{ textAlign: 'center' }}>Restaurant Registration</h3>
                            <div className='my-4'>
                                <label htmlFor='exampleFormControlInput1' className='form-label'>Restaurant Name</label>
                                <input type={'text'} name='name' className='form-control' id='exampleFormControlInput1' required placeholder='Your Resturant Name'></input>
                            </div>
                            <div className='my-4'>
                                <label htmlFor='exampleFormControlInput1' className='form-label'>Username</label>
                                <input type={'email'} name='email' className='form-control' id='exampleFormControlInput1' required placeholder='username'></input>
                            </div>
                            <div className='my-4'>
                                <label htmlFor='exampleFormControlInput1' className='form-label'>Email</label>
                                <input type={'email'} name='email' className='form-control' id='exampleFormControlInput1' required placeholder='email'></input>
                            </div>
                            {/* <div className='my-4'>
                                <label htmlFor='exampleFormControlInput1' className='form-label'>Phone Number</label>
                                <input type={'tel'} name='mobile' className='form-control' id='exampleFormControlInput1' required placeholder='+44'></input>
                            </div> */}
                            <button

                                style={{
                                    margin: '0 auto',
                                    display: 'block',
                                    border: 'none',
                                    backgroundColor: 'black',
                                    color: 'white',
                                    padding: '0.5em 1em',
                                    borderRadius: 5
                                }}
                            >
                                Register
                            </button>
                        </div>

                    </div>
                </div>
            </section>

        </div >

    )
}

export default HomePage