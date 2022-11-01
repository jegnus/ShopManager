import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import {useMutation} from "@apollo/client";
import {client} from "../../Features/Client";
import {gql} from "@apollo/client";

function PartnerAddModal(props) {
    const [partnerDetails, setPartnerDetails] = useState({
        name: '',
        mobileNo: '',
        restaurantId: '',
        apiKey: '',
        email: '',
    })

    const CreatePartner = async () => {
        console.log("CreatePartner",props.RId, partnerDetails.name, partnerDetails.mobileNo, partnerDetails.restaurantId, partnerDetails.apiKey, partnerDetails.email)
        const createPatner = gql`
            mutation{
                CreatePatner(
                    RId: ${props.RId},
                    PatnerName: "${partnerDetails.name}",
                    mobileNo: "${partnerDetails.mobileNo}",
                    email: "",
                    apiKey: "",
                    patnerRestaurantId: "${partnerDetails.restaurantId}"
                )
                {
                    Patner{
                        id

                    }
                }
            }
        `
        client.mutate({
            mutation: createPatner,
            fetchPolicy: 'no-cache',

        }
        ).then((result) => {
            console.log(result)
            props.onHide()


        }).catch((error) => {
            console.log(error)
            alert("Something went wrong")
        })
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="l"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* <form action="" > */}
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3 style={{ color: '#fb6e3c', fontWeight: 'light' }}>Add Patner Detail</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label
                            style={{}}
                        >Partner</label>
                        <select
                            onChange={(e) => {
                                setPartnerDetails({ ...partnerDetails, name: e.target.value })
                            }}
                            // onSelect={(e) => {
                            //     console.log(e)
                            //     setPartnerDetails({ ...partnerDetails, partnerName: 1 })
                            // }}
                            style={{ padding: 10, borderRadius: 5, paddingLeft: 20, paddingRight: 20 }}
                            name="cars" id="cars">
                            {/*{props.partnerList.map((item, index) => {*/}
                            {/*    return (*/}
                            {/*                    item.name.toLowerCase() === "gaston" ? null :*/}
                            {/*                    item.name.toLowerCase() === "deliveroo" ? null:*/}
                            {/*                    item.name.toLowerCase() === "justeat" ? null :*/}
                            {/*                    item.name.toLowerCase() === "ubereats" ? null :*/}
                            {/*                        <option value={"gaston"}>None</option>*/}

                            {/*)*/}
                            {/*})*/}
                            {/*}*/}
                            <option value="none">None</option>
                            <option value="gaston">Gaston</option>
                            <option value="deliveroo">Deliveroo</option>
                            <option value="justeat">Just Eat</option>
                            <option value="ubereats">Uber Eats</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                        <label for="exampleFormControlInput1" class="form-label">Partner Restaurant ID</label>
                        <input type="text"
                            onChange={(e) => {
                                setPartnerDetails({ ...partnerDetails, restaurantId: e.target.value })

                            }}

                            class="form-control" style={{ width: 200 }} id="exampleFormControlInput1" placeholder="partner restaurant ID" />


                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                        <label for="exampleFormControlInput1" class="form-label">mobile No</label>
                        <input type="text" class="form-control"
                            onChange={(e) => {
                                setPartnerDetails({ ...partnerDetails, mobileNo: e.target.value })

                            }}
                            style={{ width: 200 }} id="exampleFormControlInput1" placeholder="mobileNo" />


                    </div>
                </div>
            </Modal.Body>


            <Modal.Footer>
                <button onClick={(e) => {
                    // console.log("clicked")
                    // handleCroppedImage(e)
                    props.onHide()
                }} className='justify-end addCategory'>Close</button>

                <button onClick={(e) => {
                    CreatePartner()
                }} className='justify-end addCategory'>Add</button>
            </Modal.Footer>
            {/* </form> */}
        </Modal>
    )
}

export default PartnerAddModal
