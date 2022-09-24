import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function OrderDetailsModal(props) {
    const [orderData, setOrderData] = useState({ orderedItems: [] })
    const [totalAmount, setTotalAmount] = useState(0)
    useEffect(() => {
        if (props.orderdetails)
            console.log(props.orderdetails)


        let totalPrice = 0
        if (props.orderdetails) {
            setOrderData({ ...props.orderdetails })
            if (props.orderdetails.orderedItems) {
                props.orderdetails.orderedItems.map((item) => {
                    totalPrice += item.foodPrice * item.quantity
                    console.log(totalPrice)
                })
                setTotalAmount(totalPrice)

            }
        }

    }, [props.orderdetails])

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Order Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5 style={{ fontWeight: '700' }}>Order No</h5>
                    <p>{orderData.id}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5 style={{ fontWeight: '700' }}>Order Time</h5>
                    <p>{orderData.orderTime}</p>
                </div>
                <div >
                    <h5 style={{ fontWeight: '700' }}>Items: </h5>
                    <div

                        style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '60%' }}>
                            <p style={{ fontWeight: '700' }}>Id</p>
                            <p style={{ fontWeight: '700' }}>Qty</p>
                            <p style={{ fontWeight: '700' }}>Name</p>
                        </div>
                        <p style={{ fontWeight: '700' }}>£ Price</p>
                    </div>
                    {
                        orderData.orderedItems ?
                            orderData.orderedItems.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '60%' }}>
                                            <p>{item.id}</p>
                                            <p>{item.quantity}</p>
                                            <p>{item.foodName}</p>
                                        </div>
                                        <p>£{item.foodPrice}</p>
                                    </div>
                                )
                            }) : null
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5 style={{ fontWeight: '700' }}>Total Amount</h5>
                    <p>£{totalAmount}</p>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default OrderDetailsModal