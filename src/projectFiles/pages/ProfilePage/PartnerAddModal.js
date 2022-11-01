import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
function PartnerAddModal(props) {
    const [partnerDetails, setPartnerDetails] = useState({
        partnerName: '',
        partnerId: '',
        restaurantID: ''
    })
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
                    <h3 style={{ color: '#fb6e3c', fontWeight: 'light' }}>Crop Food Item Image</h3>
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
                                setPartnerDetails({ ...partnerDetails, partnerName: e.target.value })
                            }}
                            // onSelect={(e) => {
                            //     console.log(e)
                            //     setPartnerDetails({ ...partnerDetails, partnerName: 1 })
                            // }}
                            style={{ padding: 10, borderRadius: 5, paddingLeft: 20, paddingRight: 20 }}
                            name="cars" id="cars">
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
                                setPartnerDetails({ ...partnerDetails, restaurantID: e.target.value })

                            }}

                            class="form-control" style={{ width: 200 }} id="exampleFormControlInput1" placeholder="partner restaurant ID" />


                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                        <label for="exampleFormControlInput1" class="form-label">Partner ID</label>
                        <input type="text" class="form-control"
                            onChange={(e) => {
                                setPartnerDetails({ ...partnerDetails, partnerId: e.target.value })

                            }}
                            style={{ width: 200 }} id="exampleFormControlInput1" placeholder="partner ID" />


                    </div>
                </div>
            </Modal.Body>


            <Modal.Footer>
                <button onClick={(e) => {
                    // console.log("clicked")
                    // handleCroppedImage(e)
                    props.handlePartnerAdd(partnerDetails)
                }} className='justify-end addCategory'>Add</button>
            </Modal.Footer>
            {/* </form> */}
        </Modal>
    )
}

export default PartnerAddModal