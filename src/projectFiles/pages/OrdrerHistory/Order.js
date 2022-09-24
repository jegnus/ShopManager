import React, { useEffect, useState } from 'react'
import { gql } from "@apollo/client";
import { client } from "../../Features/Client";
import OrderDetailsModal from './OrderDetailsModal';

function Order() {
    const [username, setusername] = useState(localStorage.getItem('user'))
    const [orders, setorders] = React.useState([])
    const [loading, setloading] = React.useState(true)
    const [showOrderDetailModal, setShowOrderDetailModal] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState({})
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
                    orderedItems{
                    id
                    foodName
                    foodPrice
                    quantity
                  }
                    
                }
            }
            
            }
        `
        const { data } = await client.query({
            query: getOrders
        })
        console.log(data)
        setorders(data.Restaurant.orderlist)
        setloading(false)
    }

    useEffect(() => {
        getOrders()
    }, [])






    return (

        <div className='container'>
            <OrderDetailsModal
                orderdetails={selectedOrder}
                show={showOrderDetailModal}
                onHide={() => setShowOrderDetailModal(false)}
            />

            <h1>Orders</h1>

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
                                                order.orderedItems[0] ? '£' + totalCount : '----'
                                            }</td>
                                        </tr>

                                    )

                                }) :
                                <h1>No Orders</h1>
                    }


                </tbody>
            </table>



        </div >
    )
}

export default Order
