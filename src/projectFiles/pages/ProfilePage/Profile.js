import React, { useEffect, useState } from 'react'
import ImageCropModal from './ImageCropModal'
// import { menuActions } from "../../store/menuSlice";
// import Form from 'react-bootstrap/Form';

import axios from "axios"
import { gql } from "@apollo/client";
import { client } from "../../Features/Client";

const baseAPI = axios.create({
    //baseURL: 'http://127.0.0.1:8000/',
    baseURL: 'https://jegnus.com/',


    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
function Profile() {


    const [descriptionValue, setDescriptionValue] = useState('Located at London. We offer a wide array of fresh food green pork plate, hamburger, barbacoa plate, pizza, salads, bbq with rice and beans and more.')
    const [phoneValue, setPhoneValue] = useState('+44 9999213122')
    const [openingTimeValue, setOpeningTimeValue] = useState('10:05')
    const [closingTimeValue, setClosingTimeValue] = useState('20:05')
    const [minimumOrderAmount, setMinimumOrderAmount] = useState(0)
    const [editDescription, setEditDescription] = useState(false)
    const [editPhone, setEditPhone] = useState(false)
    const [editOpeningTime, setEditOpeningTime] = useState(true)
    const [editClosingTime, setEditClosingTime] = useState(false)
    const [editMinimumOrder, setEditMinimumOrder] = useState(false)
    const [profileImageData, setProfileImageData] = useState('https://dummyimage.com/16:9x1080/')
    const [logoImageData, setLogoImageData] = useState('https://dummyimage.com/300')
    const [showCropModal, setShowCropModal] = useState(false)
    const [imgSrc, setImgSrc] = useState('')
    const [currentImageName, setCurrentImageName] = useState('')
    const [imgAspect, setImgAspect] = useState(1 / 1)
    const [username, setusername] = useState(localStorage.getItem('user'))
    const [loading, setloading] = useState(true)
    const [restaurantID, setRestaurantID] = useState(-1)
    const [profileLoading, setProfileLoading] = useState(true)
    const [timingsData, setTimingsData] = useState([
        {
            id: 1,
            dayName: 'Monday',
            openOnThisDay: true,
            openingTime1: '10:05',
            closingTime1: '12:05',
            openingTime2: '14:10',
            closingTime2: '20:05',
        },
        {
            id: 2,
            dayName: 'Tuesday',
            openOnThisDay: true,
            openingTime1: '10:05',
            closingTime1: '12:05',
            openingTime2: '14:10',
            closingTime2: '20:05',
        },
        {
            id: 3,
            dayName: 'Wednesday',
            openOnThisDay: true,
            openingTime1: '10:05',
            closingTime1: '12:05',
            openingTime2: '14:10',
            closingTime2: '20:05',
        },
        {
            id: 4,
            dayName: 'Thursday',
            openOnThisDay: true,
            openingTime1: '10:05',
            closingTime1: '12:05',
            openingTime2: '14:10',
            closingTime2: '20:05',
        },
        {
            id: 5,
            dayName: 'Friday',
            openOnThisDay: true,
            openingTime1: '10:05',
            closingTime1: '12:05',
            openingTime2: '14:10',
            closingTime2: '20:05',
        },
        {
            id: 6,
            dayName: 'Saturday',
            openOnThisDay: true,
            openingTime1: '10:05',
            closingTime1: '12:05',
            openingTime2: '14:10',
            closingTime2: '20:05',
        },
        {
            id: 7,
            dayName: 'Sunday',
            openOnThisDay: true,
            openingTime1: '10:05',
            closingTime1: '12:05',
            openingTime2: '14:10',
            closingTime2: '20:05',
        },
    ])


    const handleTimingsChange = (dayID, tCode, value) => {
        console.log(dayID, tCode, value)
        let tempTimingList
        tempTimingList = timingsData.map((item) => {
            if (item.id === dayID) {
                if (tCode === 'ot1') {
                    return (
                        {
                            ...item,
                            openingTime1: value
                        }
                    )
                }
                else if (tCode === 'ct1') {
                    return (
                        {
                            ...item,
                            closingTime1: value
                        }
                    )
                }
                else if (tCode === 'ot2') {
                    return (
                        {
                            ...item,
                            openingTime2: value
                        }
                    )
                }
                else if (tCode === 'ct2') {
                    return (
                        {
                            ...item,
                            closingTime2: value
                        }
                    )
                }
                else if (tCode === 'OOTD') {
                    return (
                        {
                            ...item,
                            openOnThisDay: value
                        }
                    )
                }

            }
            return item
        })
        // console.log(timingsData)
        setTimingsData([...tempTimingList])
    }

    const Get_Restaurant_data = gql`
    query{
      Restaurant(username:\"${username}\"){
        id
        username
        restaurantImg
        restaurantLogo



      }


    }`;
    useEffect(() => {

        client.query({
            query: Get_Restaurant_data,
            fetchPolicy: 'no-cache'
        }).then(res => {
            setLogoImageData(res.data.Restaurant.restaurantLogo)
            setProfileImageData(res.data.Restaurant.restaurantImg)
            setRestaurantID(res.data.Restaurant.id)
            setloading(false)
            setProfileLoading(false)
        }).catch(err => {
            console.log(err)
        }
        )
    }, [])



    const onSelectFile = (e) => {

        if (e.target.files && e.target.files.length > 0) {

            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
            console.log("image file", reader)
            setShowCropModal(true)

        }
    }

    const handleCroppedImage = (val, newCroppedImg) => {

        setShowCropModal(false)
        if (currentImageName === 'profile') {
            setProfileImageData(val)
            setProfileLoading(true)
            UploadImage(newCroppedImg, restaurantID, 'profile')

        }
        else if (currentImageName === 'logo') {
            setloading(true)
            setLogoImageData(val, newCroppedImg)
            UploadImage(newCroppedImg, restaurantID, 'logo')

        }
    }

    const UploadImage = async (img, id, imagetype) => {

        let form = new FormData()
        console.log('image details', img)
        console.log('res id', id)
        console.log('imagetype', imagetype)
        if (imagetype === 'profile') {
            form.append('image_type', "restaurant_profile")
            form.append('id', id)
            form.append('img', img, id + '_profile.png')
        }
        else if (imagetype === 'logo') {
            form.append('image_type', "restaurant_logo")
            form.append('id', id)
            form.append('img', img, id + '_logo.png')
        }

        let rersponse = await baseAPI.post('UploadImage/', form, {
            headers: {
                Authorization: 'JWT '
            }
        })
            .then(response => {
                console.log(response.data)


            })
            .catch(error => {
                console.log(error)
            }
            )
    }

    return (

        <div className='container ' style={{ textAlign: 'left' }} >
            {
                showCropModal ?
                    <ImageCropModal
                        imageAspect={imgAspect}
                        sub={(val, newCroppedFile) => handleCroppedImage(val, newCroppedFile)}
                        imgSource={imgSrc}
                        show={showCropModal}
                        onHide={() => setShowCropModal(false)}
                    />
                    : null
            }

            <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', right: 10, top: 10, }}>
                    <input type="file" name="restaurant_profile" id="restaurant_profile" onChange={(e) => {
                        onSelectFile(e)
                        setImgAspect(16 / 9)
                        setCurrentImageName('profile')
                    }} hidden />
                    <label htmlFor="restaurant_profile">


                        <span
                            onClick={() => {

                            }}
                            className="material-symbols-outlined"
                            style={{
                                fontSize: '1.2em',
                                backgroundColor: 'white',
                                padding: 5,
                                borderRadius: '50%',
                                color: '#fb5c3e'
                            }}>
                            edit
                        </span>
                    </label>
                </div>
                <div style={{
                    position: 'absolute',
                    bottom: -40,
                    left: 50,

                }}>
                    <div style={{ position: 'relative' }}>
                        <input type="file" name="restaurant_logo" id="restaurant_logo" onChange={(e) => {
                            onSelectFile(e)
                            setImgAspect(1 / 1)
                            setCurrentImageName('logo')
                        }} hidden />
                        <label htmlFor="restaurant_logo">

                            <span style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                background: 'white',
                                color: '#fb5c3e',
                                borderRadius: '50%',
                                padding: 5,
                                border: '1px solid grey'
                            }} className="material-symbols-outlined">
                                photo_camera
                            </span>
                        </label>
                        {
                            loading ?
                                <img

                                    style={{ width: 100, height: 100, borderRadius: 50, objectFit: 'cover', border: '2px solid white', backgroundColor: 'white' }}
                                    src={logoImageData}
                                ></img>
                                :
                                <img

                                    style={{ width: 100, height: 100, borderRadius: 50, objectFit: 'cover', border: '2px solid white', backgroundColor: 'white' }}
                                    src={"https://storage.googleapis.com/locus_image_store/" + logoImageData}
                                ></img>


                        }

                    </div>

                </div>
                {profileLoading ?
                    <img
                        // className='img-fluid'
                        style={{ height: '350px', width: '100%', objectFit: 'cover' }}
                        src={profileImageData}></img>

                    :
                    <img
                        // className='img-fluid'
                        style={{ height: '350px', width: '100%', objectFit: 'cover' }}
                        src={"https://storage.googleapis.com/locus_image_store/" + profileImageData} ></img>}
            </div>

            <div className='mt-5'>
                <h2 style={{ fontWeight: '300' }}> Welcome Domino's Pizza</h2>



                <div className='row col-lg-8 mt-4' style={{ margin: '0 auto' }}>
                    <div className='col-lg-4'>
                        <p style={{ fontWeight: '700', }}>Description</p>
                    </div>
                    <div className='col-lg-8'>
                        <textarea
                            disabled={!editDescription}
                            rows={5}
                            placeholder={'Your Restaurant Description...'}
                            onChange={(e) => {
                                setDescriptionValue(e.target.value)
                            }}
                            style={{
                                width: '100%',
                                backgroundColor: 'white',
                                border: 'none',
                                height: 'fit-content',
                                resize: 'none'
                            }}
                            type={'text'}
                            value={descriptionValue}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                            <button
                                onClick={() => {
                                    setEditDescription(true)
                                }}
                                style={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    color: '#fb6c3e',
                                    display: 'flex',
                                    justifySelf: 'end'
                                }}
                            ><span className="material-symbols-outlined">
                                    edit_note
                                </span></button>
                        </div>
                    </div>
                </div>

                <div className='row col-lg-8 mt-4' style={{ margin: '0 auto' }}>
                    <div className='col-lg-4'>
                        <p style={{ fontWeight: '700', }}>Phone </p>
                    </div>
                    <div className='col-lg-8 d-flex align-items-center'>
                        <input
                            disabled={!editPhone}
                            onChange={(e) => {
                                setPhoneValue(e.target.value)
                            }}
                            style={{
                                width: '100%',
                                backgroundColor: 'white',
                                border: 'none',
                                height: 'fit-content',
                                resize: 'none'
                            }}
                            type={'text'}
                            value={phoneValue}
                        />
                        <button
                            onClick={() => {
                                setEditPhone(true)
                            }}
                            style={{
                                backgroundColor: 'white',
                                border: 'none',
                                color: '#fb6c3e',
                                display: 'inline',
                                paddingTop: '10px'

                            }}
                        ><span className="material-symbols-outlined" style={{ fontSize: '1.2em' }}>
                                edit
                            </span>
                        </button>

                    </div>
                </div>

                <div className='row col-lg-8 my-5' style={{ margin: '0 auto' }}>
                    <div className='col-lg-4'>
                        <p style={{ fontWeight: '700', }}>Timings</p>
                    </div>
                    <div className='col-lg-8 '>
                        {/* <div className='row'>
              <div className='col-lg-4'>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label
                    style={{ fontWeight: '700' }}

                    className="form-check-label" for="flexCheckDefault">
                    Monday
                  </label>
                </div>
              </div>
              <div className='col-lg-8'>

                <div className='row col-lg-12 '>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div>-</div>
                  </div>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                </div>
                <div className='row col-lg-12 mt-3 '>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div>-</div>
                  </div>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                </div>
              </div>
            </div> */}
                        {
                            timingsData.length > 0 ?
                                timingsData.map((dayData) => {
                                    return (
                                        <div

                                            key={dayData.id}
                                            className='row mt-5'>
                                            <div className='col-lg-4'>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={dayData.openOnThisDay}
                                                        onChange={(e) => {
                                                            // console.log(e.target.checked)
                                                            handleTimingsChange(dayData.id, 'OOTD', e.target.checked)
                                                        }}
                                                        value='checked' id="flexCheckDefault" />
                                                    <label
                                                        style={{ fontWeight: '700' }}
                                                        className="form-check-label" htmlFor="flexCheckDefault">
                                                        {dayData.dayName}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='col-lg-8'>

                                                <div className='row col-lg-12 '>
                                                    <div className='col-lg-5'>

                                                        <input
                                                            name='ot1'
                                                            disabled={!editOpeningTime}
                                                            onChange={(e) => {
                                                                // setOpeningTimeValue(e.target.value)
                                                                handleTimingsChange(dayData.id, 'ot1', e.target.value)
                                                            }}
                                                            style={{
                                                                width: '100%',
                                                                backgroundColor: 'white',
                                                                border: 'none',
                                                                height: 'fit-content',

                                                            }}
                                                            type={'time'}
                                                            value={dayData.openingTime1}
                                                        />
                                                    </div>
                                                    <div className='col-lg-2'>
                                                        <div>-</div>
                                                    </div>
                                                    <div className='col-lg-5'>

                                                        <input
                                                            name='ct1'
                                                            disabled={!editOpeningTime}
                                                            onChange={(e) => {
                                                                // setOpeningTimeValue(e.target.value)
                                                                handleTimingsChange(dayData.id, 'ct1', e.target.value)
                                                            }}
                                                            style={{
                                                                width: '100%',
                                                                backgroundColor: 'white',
                                                                border: 'none',
                                                                height: 'fit-content',

                                                            }}
                                                            type={'time'}
                                                            value={dayData.closingTime1}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row col-lg-12 mt-3 '>
                                                    <div className='col-lg-5'>

                                                        <input disabled={!editOpeningTime}
                                                            onChange={(e) => {
                                                                // setOpeningTimeValue(e.target.value)
                                                                handleTimingsChange(dayData.id, 'ot2', e.target.value)
                                                            }}
                                                            style={{
                                                                width: '100%',
                                                                backgroundColor: 'white',
                                                                border: 'none',
                                                                height: 'fit-content',

                                                            }}
                                                            type={'time'}
                                                            value={dayData.openingTime2}
                                                        />
                                                    </div>
                                                    <div className='col-lg-2'>
                                                        <div>-</div>
                                                    </div>
                                                    <div className='col-lg-5'>

                                                        <input disabled={!editOpeningTime}
                                                            onChange={(e) => {
                                                                // setOpeningTimeValue(e.target.value)
                                                                handleTimingsChange(dayData.id, 'ct2', e.target.value)
                                                            }}
                                                            style={{
                                                                width: '100%',
                                                                backgroundColor: 'white',
                                                                border: 'none',
                                                                height: 'fit-content',

                                                            }}
                                                            type={'time'}
                                                            value={dayData.closingTime2}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })

                                : null
                        }
                        {/* <div className='row mt-5'>
              <div className='col-lg-4'>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label
                    style={{ fontWeight: '700' }}
                    className="form-check-label" for="flexCheckDefault">
                    Tuesday
                  </label>
                </div>
              </div>
              <div className='col-lg-8'>

                <div className='row col-lg-12 '>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div>-</div>
                  </div>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                </div>
                <div className='row col-lg-12 mt-3 '>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div>-</div>
                  </div>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                </div>
              </div>
            </div> */}
                        {/* <div className='row mt-5'>
              <div className='col-lg-4'>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label
                    style={{ fontWeight: '700' }}
                    className="form-check-label" for="flexCheckDefault">
                    Wednesday
                  </label>
                </div>
              </div>
              <div className='col-lg-8'>

                <div className='row col-lg-12 '>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div>-</div>
                  </div>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                </div>
                <div className='row col-lg-12 mt-3 '>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div>-</div>
                  </div>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-lg-4'>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label
                    style={{ fontWeight: '700' }}
                    className="form-check-label" for="flexCheckDefault">
                    Thursday
                  </label>
                </div>
              </div>
              <div className='col-lg-8'>

                <div className='row col-lg-12 '>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div>-</div>
                  </div>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                </div>
                <div className='row col-lg-12 mt-3 '>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div>-</div>
                  </div>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-lg-4'>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label
                    style={{ fontWeight: '700' }}
                    className="form-check-label" for="flexCheckDefault">
                    Friday
                  </label>
                </div>
              </div>
              <div className='col-lg-8'>

                <div className='row col-lg-12 '>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div>-</div>
                  </div>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                </div>
                <div className='row col-lg-12 mt-3 '>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div>-</div>
                  </div>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-lg-4'>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label
                    style={{ fontWeight: '700' }}
                    className="form-check-label" for="flexCheckDefault">
                    Saturday
                  </label>
                </div>
              </div>
              <div className='col-lg-8'>

                <div className='row col-lg-12 '>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div>-</div>
                  </div>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                </div>
                <div className='row col-lg-12 mt-3 '>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div>-</div>
                  </div>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-lg-4'>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label
                    style={{ fontWeight: '700' }}
                    className="form-check-label" for="flexCheckDefault">
                    Sunday
                  </label>
                </div>
              </div>
              <div className='col-lg-8'>

                <div className='row col-lg-12 '>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}

                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        // border: 'none',
                        border: '1px solid #d2d2d2',
                        padding: '10px',
                        height: 'fit-content',
                        color: 'grey'

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div>-</div>
                  </div>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                </div>
                <div className='row col-lg-12 mt-3 '>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div>-</div>
                  </div>
                  <div className='col-lg-5'>

                    <input disabled={!editOpeningTime}
                      onChange={(e) => {
                        setOpeningTimeValue(e.target.value)
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: 'none',
                        height: 'fit-content',

                      }}
                      type={'time'}
                      value={openingTimeValue}
                    />
                  </div>
                </div>
              </div>
            </div> */}
                        {/* <input disabled={!editOpeningTime}
              onChange={(e) => {
                setOpeningTimeValue(e.target.value)
              }}
              style={{
                width: '100%',
                backgroundColor: 'white',
                border: 'none',
                height: 'fit-content',

              }}
              type={'time'}
              value={openingTimeValue}
            /> */}
                        {/* <button
              onClick={() => {
                setEditOpeningTime(true)
              }}
              style={{
                backgroundColor: 'white',
                border: 'none',
                color: '#fb6c3e',
                display: 'inline',
                paddingTop: '10px'

              }}
            ><span className="material-symbols-outlined" style={{ fontSize: '1.2em' }}>
                edit
              </span>
            </button> */}

                    </div>
                </div>
                {/* <div className='row col-lg-8 mt-2' style={{ margin: '0 auto' }}>
          <div className='col-lg-4'>
            <p style={{ fontWeight: '700', }}>Closing Time </p>
          </div>
          <div className='col-lg-8 d-flex align-items-center'>
            <input
              disabled={!editClosingTime}
              onChange={(e) => {
                setClosingTimeValue(e.target.value)
              }}
              style={{
                width: '100%',
                backgroundColor: 'white',
                border: 'none',
                height: 'fit-content',

              }}
              type={'time'}
              value={closingTimeValue}
            />
            <button
              onClick={() => {
                setEditClosingTime(true)
              }}
              style={{
                backgroundColor: 'white',
                border: 'none',
                color: '#fb6c3e',
                display: 'inline',
                paddingTop: '10px'

              }}
            ><span className="material-symbols-outlined" style={{ fontSize: '1.2em' }}>
                edit
              </span>
            </button>

          </div>
        </div> */}
                <div className='row col-lg-8 mt-2' style={{ margin: '0 auto' }}>
                    <div className='col-lg-4'>
                        <p style={{ fontWeight: '700', }}>Minimum Order</p>
                    </div>
                    <div className='col-lg-8 d-flex align-items-center'>
                        <input
                            disabled={!editMinimumOrder}
                            onChange={(e) => {
                                setMinimumOrderAmount(e.target.value)
                            }}
                            style={{
                                width: '100%',
                                backgroundColor: 'white',
                                border: 'none',
                                height: 'fit-content',

                            }}
                            type={'number'}
                            value={minimumOrderAmount}
                        />
                        <button
                            onClick={() => {
                                setEditMinimumOrder(true)
                            }}
                            style={{
                                backgroundColor: 'white',
                                border: 'none',
                                color: '#fb6c3e',
                                display: 'inline',
                                paddingTop: '10px'

                            }}
                        ><span className="material-symbols-outlined" style={{ fontSize: '1.2em' }}>
                                edit
                            </span>
                        </button>

                    </div>
                </div>
                <div className='row col-lg-8 mt-4' style={{ margin: '0 auto' }}>
                    <button

                        style={{
                            margin: '0 auto',
                            width: 'fit-content',
                            background: '#fb6c3e',
                            color: 'white',
                            border: 'none',
                            borderRadius: 5,
                            padding: ' .15em 1em'
                        }}>Save</button>
                </div>
            </div>
        </div >
    )
}

export default Profile
