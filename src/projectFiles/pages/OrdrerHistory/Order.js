import React, { useEffect, useRef, useState } from 'react'
import { gql } from "@apollo/client";
import { client } from "../../Features/Client";
import OrderDetailsModal from './OrderDetailsModal';
import moment from 'moment'
import { Link, NavLink } from 'react-router-dom';
function Order() {
    const [username, setusername] = useState(localStorage.getItem('user'))
    const [orders, setorders] = React.useState([])
    const [allOrders, setallOrders] = React.useState([])
    const [loading, setloading] = React.useState(true)
    const [showOrderDetailModal, setShowOrderDetailModal] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState({})
    const [date, setDate] = useState('')
    const [pickupTask, setpickupTask] = useState({})
    const [deliveryTask, setdeliveryTask] = useState({})
    console.log(username)
    const getOrders = async () => {
        const getOrders = gql`
            query{
                Restaurant(username:"${username}")
                {
                    id
                    username
                    orderlist{
                        id
                        orderTime
                        estimatedCompletionTime
                        orderStatus
                        orderDate
                        OrderRefernceId
                        patnerOrderId
                        orderType
                        fee
                        acceptOrder
                        orderedItems{
                            id
                            foodName
                            foodPrice
                            quantity
                        }
                        travelLog{
                            id
                            status
                            longitude
                            latitude
                            Image
                            CompleteTime
                            PointType

                        }

                    }
                }

            }
        `
        const { data } = await client.query({
            query: getOrders
        })
        console.log(data)

        setallOrders(data.Restaurant.orderlist)
        setorders(data.Restaurant.orderlist)
        setloading(false)
    }

    useEffect(() => {
        getOrders()
    }, [])

    const logout = async () => {
        console.log("logout")

        localStorage.clear()
        window.location.reload(false);


    }
    const handlePrint = () => {

        let printContents = document.getElementById('printablediv').innerHTML;
        var mywindow = window.open('', 'my div', 'height=400,width=600');
        mywindow.document.body.innerHTML = printContents;
        mywindow.print();
        mywindow.close();
        // let originalContents = document.body.innerHTML;
        // document.body.innerHTML = printContents;
        // window.print();
        // document.body.innerHTML = originalContents;

    }


    return (

        <div className=''>
            {/* <OrderDetailsModal
                orderdetails={selectedOrder}
                show={showOrderDetailModal}
                onHide={() => setShowOrderDetailModal(false)}
            /> */}
            {/* <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>

                    <img
                        style={{ width: '100px' }}
                        src={require('../../../assets/images/homePage/logo_1024.png')} alt="" />
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
            </div> */}
            {/* 
            <h1 style={{ fontSize: 30, textAlign: 'center', margin: '1em 0' }}>Shop Manager</h1> */}

            <div className='row' style={{}}>
                <div className='col-lg-5'>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 20

                    }}>
                        <h3 style={{ margin: 0 }}>Orders</h3>
                        <div>
                            <label
                                style={{ marginRight: 10 }}
                                htmlFor='dateFilter'
                            >filter</label>
                            <input
                                id='dateFilter'
                                type={'date'}
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setDate(e.target.value)
                                    let filterOrders = allOrders.filter((order) => {
                                        return order.orderDate === e.target.value
                                    })
                                    setorders(filterOrders)
                                }}

                            ></input>
                        </div>

                    </div>
                    <div style={{

                        height: '80vh',
                        overflowY: 'scroll'
                    }}>

                        {
                            orders.length > 0 ?
                                orders.map((order) => {
                                    return (
                                        <div
                                            key={order.id}

                                            onClick={() => {
                                                console.log(order)
                                                if (order.travelLog.length > 0) {
                                                    console.log(order.travelLog.length)
                                                    let pickup = order.travelLog.filter((task) => {
                                                        return task.PointType === "Pickup"
                                                    })
                                                    let delivery = order.travelLog.filter((task) => {
                                                        return task.PointType === "Dropoff"
                                                    })
                                                    setpickupTask(pickup[0])
                                                    setdeliveryTask(delivery[0])
                                                } else {
                                                    setpickupTask({})
                                                    setdeliveryTask({})
                                                }
                                                setSelectedOrder(order)

                                            }}
                                            style={{
                                                justifyContent: 'space-between',
                                                display: 'flex', flexDirection: 'row', margin: 10,
                                                backgroundColor: selectedOrder.id === order.id ? '#fff0b6' : 'WHITE',
                                                borderRadius: 8,
                                                padding: 10,
                                                cursor: 'pointer',
                                                boxShadow: '1px 2px 5px 1px rgba(0,0,0, 0.15)'
                                            }}>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', }}>

                                                    <div style={{
                                                        height: 30,
                                                        width: 8,
                                                        backgroundColor: order.orderStatus === 'Preparing' ? '#00D1FF' : order.orderStatus === 'Cancelled' ? 'red' : 'green',
                                                        marginRight: 10,
                                                        borderRadius: 5
                                                    }}></div>
                                                </div>
                                                <p style={{ fontWeight: '700' }}>sdasda2r23412{order.id}</p>
                                            </div>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '0.9em' }}>{order.orderDate}</p>
                                                <p style={{
                                                    margin: 0,
                                                    fontSize: '0.9em'
                                                }}>{order.orderedItems.length} items</p>
                                            </div>
                                        </div>
                                    )
                                })
                                : null
                        }


                    </div>
                </div>
                <div className='col-lg-7'>
                    {
                        Object.keys(selectedOrder).length > 0 ?

                            <div>

                                <button

                                    style={{
                                        border: '1px solid black',
                                        borderRadius: 5,
                                        backgroundColor: 'white',
                                        padding: '0 1em',
                                        margin: 10,
                                        color: '#fb6c3e',
                                        fontWeight: '700',


                                    }}
                                    onClick={() => {
                                        handlePrint()
                                    }}
                                >Print
                                </button>
                                <div
                                    id='printablediv'

                                    style={{

                                        border: '1px solid black',
                                        minHeight: '80vh',
                                        borderRadius: 5,
                                        margin: 10,
                                        padding: 10
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: '700' }}>Order id:
                                                234245242142424{selectedOrder.id}</p>
                                            <p style={{ margin: 0, fontWeight: '700' }}>Status: <span style={{
                                                color: selectedOrder.orderStatus === 'Preparing' ? '#00D1FF' : selectedOrder.orderStatus === 'Cancelled' ? 'red' : 'green',
                                            }}>{selectedOrder.orderStatus}</span></p>
                                        </div>
                                        <div>
                                            <p style={{ margin: 0 }}>Date: {selectedOrder.orderDate}</p>
                                            <p style={{ margin: 0 }}>Time: {moment('2022-05-02 ' + selectedOrder.orderTime).format('hh:mm A')}</p>
                                        </div>
                                    </div>

                                    {
                                        selectedOrder.orderStatus !== 'Cancelled' ?
                                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 40 }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', }}>
                                                    {/* <div
                                    style={{ height: 50 }}
                                ></div> */}
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        width: 200,
                                                        alignItems: 'center'
                                                    }}>
                                                        <img
                                                            src={selectedOrder.orderStatus === 'Preparing' || selectedOrder.orderStatus === 'Prepared' || selectedOrder.orderStatus === 'Completed' ? require('../../../assets/images/OrderPage/correct-solid.png') : require('../../../assets/images/OrderPage/correct-empty.png')}
                                                            style={{ width: 50, height: 50 }}
                                                        >
                                                        </img>

                                                        <p style={{ margin: 0, marginLeft: 10 }}>Recieved</p>
                                                    </div>
                                                    <div style={{
                                                        height: 80,
                                                        width: 1,
                                                        backgroundColor: 'black',
                                                        margin: 10,
                                                        marginLeft: 25
                                                    }}>

                                                    </div>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        width: 200,
                                                        alignItems: 'center'
                                                    }}>
                                                        <img
                                                            src={selectedOrder.orderStatus === 'Prepared' || selectedOrder.orderStatus === 'Completed' ? require('../../../assets/images/OrderPage/correct-solid.png') : require('../../../assets/images/OrderPage/correct-empty.png')}
                                                            style={{ width: 50, height: 50 }}
                                                        >
                                                        </img>

                                                        <p style={{ margin: 0, marginLeft: 10 }}>Prepared</p>
                                                    </div>
                                                    <div style={{
                                                        height: 80,
                                                        width: 1,
                                                        backgroundColor: 'black',
                                                        margin: 10,
                                                        marginLeft: 25
                                                    }}>

                                                    </div>
                                                    {pickupTask ?
                                                        <div

                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                width: 200,
                                                                alignItems: 'center'
                                                            }}>

                                                            <img
                                                                src={pickupTask.status === 'Completed' ? require('../../../assets/images/OrderPage/correct-solid.png') : require('../../../assets/images/OrderPage/correct-empty.png')}
                                                                style={{ width: 50, height: 50 }}
                                                            >
                                                            </img>
                                                            <p style={{ margin: 0, marginLeft: 10 }}>PickedUp</p>
                                                        </div>
                                                        : null
                                                    }

                                                    <div style={{
                                                        height: 80,
                                                        width: 1,
                                                        backgroundColor: 'black',
                                                        margin: 10,
                                                        marginLeft: 25
                                                    }}>

                                                    </div>
                                                    {
                                                        deliveryTask ?
                                                            <div style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                width: 200,
                                                                alignItems: 'center'
                                                            }}>

                                                                <img
                                                                    src={deliveryTask.status === 'Completed' ? require('../../../assets/images/OrderPage/correct-solid.png') : require('../../../assets/images/OrderPage/correct-empty.png')}
                                                                    style={{ width: 50, height: 50 }}
                                                                >
                                                                </img>
                                                                <p style={{ margin: 0, marginLeft: 10 }}>Delivered</p>
                                                            </div>
                                                            : null
                                                    }
                                                    <div
                                                        style={{ height: 10 }}
                                                    ></div>


                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                    <div style={{ height: 150 }}>
                                                        <p>Order
                                                            Time: {selectedOrder.orderTime.toString().split(".")[0]} </p>
                                                    </div>

                                                    <div style={{ height: 150 }}>
                                                        {selectedOrder.orderStatus === 'Prepared' || selectedOrder.orderStatus === 'Completed' ?
                                                            <p>Prepare
                                                                Time:{selectedOrder.estimatedCompletionTime.toString()} </p>
                                                            :
                                                            <p>Prepare Time : </p>
                                                        }
                                                    </div>
                                                    {
                                                        pickupTask ?
                                                            <div style={{
                                                                height: 150,
                                                                borderTop: '1px solid black',
                                                                borderBottom: '1px solid black',
                                                                paddingTop: 10,
                                                                marginBottom: 10
                                                            }}>
                                                                <div>
                                                                    {pickupTask.status === 'Completed' ? <p>Pickup Time: {pickupTask.CompleteTime}</p> : <p>Pickup Time: </p>}
                                                                    <img
                                                                        src={"https://storage.googleapis.com/locus_image_store/" + pickupTask.Image}
                                                                        style={{ height: '100%', width: 100 }}
                                                                        alt={'image'}
                                                                    ></img>
                                                                </div>


                                                            </div>
                                                            : null
                                                    }
                                                    {
                                                        deliveryTask ?
                                                            <div style={{ height: 100 }}>
                                                                {deliveryTask.status === 'Completed' ? <p>Delivery Time:{deliveryTask.CompleteTime} </p> : <p>Delivery Time : </p>}
                                                                <img
                                                                    src={"https://storage.googleapis.com/locus_image_store/" + deliveryTask.Image}
                                                                    style={{ height: '100%', width: 100 }}
                                                                    alt={'image'}
                                                                ></img>
                                                            </div>
                                                            : null
                                                    }
                                                </div>

                                            </div>
                                            : null
                                    }
                                    <div style={{ marginTop: 20 }}>
                                        <h5 style={{ fontWeight: '700' }}>Items: </h5>
                                        <div

                                            style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                width: '60%'
                                            }}>
                                                <p style={{ fontWeight: '700' }}>Id</p>
                                                <p style={{ fontWeight: '700' }}>Qty</p>
                                                <p style={{ fontWeight: '700' }}>Name</p>
                                            </div>
                                            <p style={{ fontWeight: '700' }}>?? Price</p>
                                        </div>
                                        <div
                                            // key={item.id}
                                            style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                width: '60%'
                                            }}>
                                                <p>{selectedOrder.patnerOrderId}</p>
                                                <p>{selectedOrder.quantity}</p>
                                                <p>{selectedOrder.foodName}</p>
                                            </div>
                                            <p>??{selectedOrder.fee}</p>
                                        </div>
                                        {/* {
                                            selectedOrder.orderedItems ?
                                                selectedOrder.orderedItems.map((item) => {
                                                    return (
                                                        <div
                                                            key={item.id}
                                                            style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                width: '60%'
                                                            }}>
                                                                <p>{item.id}</p>
                                                                <p>{item.quantity}</p>
                                                                <p>{item.foodName}</p>
                                                            </div>
                                                            <p>??{item.foodPrice}</p>
                                                        </div>
                                                    )
                                                }) : null
                                        } */}
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <p style={{ textAlign: 'center', marginTop: 20 }}>Please Select an Order</p>
                            </div>
                    }

                </div>
            </div>

            {/*
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Time</th>
                        <th scope="col">Items</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ?
                            null
                            :

                            orders.length > 0 ?
                                orders.map((order) => {
                                    // if (order.orderedItems[0])
                                    //     console.log(order.id, order.orderedItems[0].foodName)

                                    let totalCount = 0
                                    if (order.orderedItems[0])
                                        order.orderedItems.map((item) => {
                                            totalCount += item.foodPrice
                                        })
                                    return (
                                        <tr
                                            key={order.id}
                                            onClick={() => {
                                                setSelectedOrder({ ...order })
                                                setShowOrderDetailModal(true)
                                            }}>
                                            <th scope="row">{order.id}</th>
                                            <td>{order.orderTime}</td>
                                            <td>{
                                                order.orderedItems[0] ? order.orderedItems[0].foodName + '...' : '----'
                                            }</td>
                                            <td>{
                                                order.orderedItems[0] ? '??' + totalCount : '----'
                                            }</td>
                                        </tr>

                                    )

                                }) :
                                <h1>No Orders</h1>
                    }


                </tbody>
            </table> */}

            {/* <div style={{ marginTop: 50, backgroundColor: '#FFF7F4', padding: 10, fontWeight: '700' }}>
                <p style={{ margin: 0 }}>?? 2022 Jegnus UK Ltd</p>
            </div> */}
        </div>
    )
}

export default Order
