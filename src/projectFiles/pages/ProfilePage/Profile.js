import React, { useEffect, useState } from 'react'
import ImageCropModal from './ImageCropModal'
// import { menuActions } from "../../store/menuSlice";
// import Form from 'react-bootstrap/Form';

import axios from "axios"
import { gql } from "@apollo/client";
import { client } from "../../Features/Client";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PartnerAddModal from './PartnerAddModal';
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
    const [preparationTimeValue, setPreparationTimeValue] = useState('30')
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
    const [Restaurant, setRestaurant] = useState("")
    const [timingsData, setTimingsData] = useState([])
    const [selectedPartner, setSelectedPartner] = useState('')
    const [showPartnerAddModal, setShowPartnerAddModal] = useState(false)
    const [partnerList, setPartnerList] = useState([])
    const UpdateDetail = async () => {
        const editRestaurant = gql`
            mutation{
                editRestaurant(
                    ResturantName: "${Restaurant.ResturantName}",
                    username: "${Restaurant.username}",
                    preparationTime: ${preparationTimeValue},
                    description: "${descriptionValue}",
                    minimumOrder: ${minimumOrderAmount},
                    mobileNo: "${phoneValue}",

                )
                {
                    Restaurant{
                        id
                    }
                }
            }
            `
        client.mutate({
            mutation: editRestaurant,
            fetchPolicy: "no-cache",
        }
        ).then((result) => {
            console.log(result)
            setRestaurant(result.data.editRestaurant.Restaurant)
            setRestaurantID(result.data.editRestaurant.Restaurant.id)
            setloading(false)
            alert("Restaurant Updated")
        }
        ).catch((error) => {
            console.log(error)
            alert("Restaurant Not Updated")


        })

    }
    const handleTimingsChange = (dayID, T, tCode, value) => {
        console.log(dayID, tCode, value)
        let tempTimingList
        tempTimingList = timingsData.map((item) => {
            let tempTiming
            tempTiming = item.Timing.map((T) => {
                if (T.id === tCode) {
                    if (T.id === T) {
                        if (tCode === 'OT') {
                            return (
                                {
                                    ...T,
                                    openingTime: value
                                }
                            )
                        } else if (tCode === 'CT') {
                            return (
                                {
                                    ...T,
                                    closingTime: value
                                }
                            )
                        }
                    }
                }
                return T
            })
            if (item.id === dayID) {
                if (tCode === 'OOTD') {
                    return (
                        {
                            ...item,
                            openthisday: value
                        }
                    )
                }
            }

            return item
        })
        console.log(tempTimingList)
        setTimingsData([...tempTimingList])
    }

    const Get_Restaurant_data = gql`
        query{

            Restaurant(username:"indianlounge"){
                id
                username
                ResturantName
                preparationTime
                patner{
                    id
                    restaurantId
                    mobileNo
                    name
                }
                restaurantImg
                restaurantLogo
                description
                mobileNo
                operatingTime{
                    id
                    day
                    openthisday
                    Timing{
                        id
                        closingTime
                        openingTime
                    }
                }
            }
        }
    `;
    const Get_Restaurant = async () => {
        client.query({
            query: Get_Restaurant_data,
            fetchPolicy: 'no-cache'
        }).then(res => {
            console.log("get restaurant", res.data.Restaurant)
            setRestaurant(res.data.Restaurant)
            setTimingsData(res.data.Restaurant.operatingTime)
            setLogoImageData(res.data.Restaurant.restaurantLogo)
            setProfileImageData(res.data.Restaurant.restaurantImg)
            setDescriptionValue(res.data.Restaurant.description)
            setPhoneValue(res.data.Restaurant.mobileNo)
            setRestaurantID(res.data.Restaurant.id)
            setloading(false)
            setPartnerList(res.data.Restaurant.patner)
            setProfileLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {

        Get_Restaurant()
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

    const handleDeletePartner = (value) => {

        let tempPartnerList = [...partnerList]
        tempPartnerList = tempPartnerList.filter(item => item.partnerName !== value)
        setPartnerList([...tempPartnerList])

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
            {
                showPartnerAddModal ?
                    <PartnerAddModal
                        // imageAspect={imgAspect}
                        // sub={(val, newCroppedFile) => handleCroppedImage(val, newCroppedFile)}
                        // imgSource={imgSrc}
                        handlePartnerAdd={(partnerDetails) => {
                            console.log('addded', partnerDetails)
                            partnerList.push(partnerDetails)
                            setShowPartnerAddModal(false)
                        }}
                        RId={Restaurant.id}
                        show={showPartnerAddModal}
                        onHide={() => setShowPartnerAddModal(false)}
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
                <h2 style={{ fontWeight: '300' }}> Welcome {Restaurant.ResturantName}</h2>



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
                                border: editDescription ? '1px solid #fb5c3e' : '1px solid grey',
                                height: 'fit-content',
                                resize: 'none'
                            }}
                            type={'text'}
                            value={descriptionValue}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                            <button
                                onClick={() => {
                                    setEditDescription(!editDescription)
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
                                border: editPhone ? '1px solid #fb6c3e' : 'none',
                                height: 'fit-content',
                                resize: 'none'
                            }}
                            type={'text'}
                            value={phoneValue}
                        />
                        <button
                            onClick={() => {
                                setEditPhone(!editPhone)
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
                                                        checked={dayData.openthisday}
                                                        onChange={(e) => {
                                                            // console.log(e.target.checked)
                                                            handleTimingsChange(dayData.id, "", 'OOTD', e.target.checked)
                                                        }}
                                                        value='checked' id="flexCheckDefault" />
                                                    <label
                                                        style={{ fontWeight: '700' }}
                                                        className="form-check-label" htmlFor="flexCheckDefault">
                                                        {dayData.day}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='col-lg-8'>
                                                {
                                                    dayData.openthisday ?
                                                        dayData.Timing.map((timingData) => {
                                                            return (
                                                                <div
                                                                    key={timingData.id}
                                                                    className='row'>
                                                                    <div className='col-lg-6'>
                                                                        <input
                                                                            disabled={!dayData.openOnThisDay}
                                                                            onChange={(e) => {
                                                                                handleTimingsChange(dayData.id, timingData.id, 'OT', e.target.value)
                                                                            }}
                                                                            style={{
                                                                                width: '100%',
                                                                                backgroundColor: 'white',
                                                                                border: 'none',
                                                                                height: 'fit-content',
                                                                                resize: 'none'
                                                                            }}
                                                                            type={'time'}
                                                                            value={timingData.openingTime}
                                                                        />
                                                                    </div>
                                                                    <div className='col-lg-6'>
                                                                        <input
                                                                            disabled={!dayData.openOnThisDay}
                                                                            onChange={(e) => {
                                                                                handleTimingsChange(dayData.id, timingData.id, 'CT', e.target.value)
                                                                            }}
                                                                            style={{
                                                                                width: '100%',
                                                                                backgroundColor: 'white',
                                                                                border: 'none',
                                                                                height: 'fit-content',
                                                                                resize: 'none'
                                                                            }}
                                                                            type={'time'}
                                                                            value={timingData.closingTime}
                                                                        />
                                                                    </div>
                                                                    <div className='col-lg-6'>

                                                                        <Button>
                                                                            Save
                                                                        </Button>
                                                                    </div>




                                                                </div>

                                                            )

                                                        })
                                                        : null

                                                }

                                            </div>

                                        </div>

                                    )
                                })

                                :
                                <div className='row mt-5'>
                                    <Button>
                                        Add Timings
                                    </Button>
                                </div>

                        }

                    </div>
                </div>
                {/*<div className='row col-lg-8 mt-2' style={{ margin: '0 auto' }}>*/}
                {/*    <div className='col-lg-4'>*/}
                {/*        <p style={{ fontWeight: '700', }}>Minimum Order</p>*/}
                {/*    </div>*/}
                {/*    <div className='col-lg-8 d-flex align-items-center'>*/}
                {/*        <input*/}
                {/*            disabled={!editMinimumOrder}*/}
                {/*            onChange={(e) => {*/}
                {/*                setMinimumOrderAmount(e.target.value)*/}
                {/*            }}*/}
                {/*            style={{*/}
                {/*                width: '100%',*/}
                {/*                backgroundColor: 'white',*/}
                {/*                border: 'none',*/}
                {/*                height: 'fit-content',*/}

                {/*            }}*/}
                {/*            type={'number'}*/}
                {/*            value={minimumOrderAmount}*/}
                {/*        />*/}
                {/*        <button*/}
                {/*            onClick={() => {*/}
                {/*                setEditMinimumOrder(true)*/}
                {/*            }}*/}
                {/*            style={{*/}
                {/*                backgroundColor: 'white',*/}
                {/*                border: 'none',*/}
                {/*                color: '#fb6c3e',*/}
                {/*                display: 'inline',*/}
                {/*                paddingTop: '10px'*/}

                {/*            }}*/}
                {/*        ><span className="material-symbols-outlined" style={{ fontSize: '1.2em' }}>*/}
                {/*                edit*/}
                {/*            </span>*/}
                {/*        </button>*/}

                {/*    </div>*/}
                {/*</div>*/}

                <div className='row col-lg-8 mt-2' style={{ margin: '0 auto' }}>
                    <div className='col-lg-4'>
                        <p style={{ fontWeight: '700', }}>idle Prepare time</p>
                    </div>
                    <div className='col-lg-8 d-flex align-items-center'>
                        <input
                            disabled={!editMinimumOrder}
                            onChange={(e) => {
                                setPreparationTimeValue(e.target.value)
                            }}
                            style={{
                                width: '100%',
                                backgroundColor: 'white',
                                height: 'fit-content',
                                border: editMinimumOrder ? '1px solid #fb6c3e' : 'none',


                            }}
                            type={'number'}
                            value={preparationTimeValue}
                        />
                        <button
                            onClick={() => {
                                setEditMinimumOrder(!editMinimumOrder)
                            }}
                            style={{
                                backgroundColor: 'white',
                                color: '#fb6c3e',
                                border: 'none',
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
                    {/* <DropdownButton
                        // onClick={(e) => { console.log(e) }}
                        // onChange={(e) => { console.log(e.target) }}
                        onSelect={(e) => console.log(e)}
                        // style={{ backgroundColor: '#fb6c3e' }}

                        id="dropdown-basic-button" title="Dropdown button">
                        <Dropdown.Item href="#/action-2">Gaston</Dropdown.Item>
                        <Dropdown.Item href="#/action-1">Deliveroo</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Uber Eats</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Just Eat</Dropdown.Item>
                    </DropdownButton> */}
                    <div className='col-lg-4'>
                        <p style={{ fontWeight: '700', }}>Patners</p>
                    </div>
                    <div className='col-lg-8 '>
                        <button
                            onClick={() => {
                                console.log('clicked')
                                setShowPartnerAddModal(true)
                            }}
                        >+ add partner</button>
                        <div>
                            {
                                partnerList.length > 0 ?

                                    partnerList.map((partner, index) => {
                                        return (

                                            <div
                                                key={index}
                                                style={{ marginTop: 20, padding: 10, border: '1px solid grey', borderRadius: 10 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <p style={{ fontWeight: '700' }}>{partner.name}</p>
                                                    <p
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => {
                                                            handleDeletePartner(partner.name)
                                                        }}>X</p>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                                    <p>Partner Id</p>
                                                    <p>{partner.mobileNo}</p>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                                    <p>Restaurant Id</p>
                                                    <p>{partner.restaurantId}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : null
                            }
                        </div>
                    </div>
                </div>


                <div className='row col-lg-8 mt-4' style={{ margin: '0 auto' }}>
                    <button
                        onClick={() => {
                            UpdateDetail()
                        }
                        }
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
