import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
function Account() {

    const [invoice, setInvoice] = useState([])
    const [selectedinvoice, setselectedinvoice] = useState([])
    const [selectedInvoiceID, setSelectedInvoiceID] = useState('')
    const handlePrint = () => {

        let printContents = document.getElementById('invoiceDiv').innerHTML;
        var mywindow = window.open('', 'my div', 'height=400,width=600');
        mywindow.document.body.innerHTML = printContents;

        let linkToAdd = document.createElement('link');
        // Link to water.css stylesheet
        linkToAdd.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css';
        linkToAdd.crossOrigin = 'anonymous';
        linkToAdd.integrity = "sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
        linkToAdd.rel = "stylesheet"
        mywindow.document.head.appendChild(linkToAdd);

        let scriptToAdd = document.createElement('script');
        scriptToAdd.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js'
        scriptToAdd.integrity = "sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
        scriptToAdd.crossOrigin = 'anonymous';
        mywindow.document.body.appendChild(scriptToAdd);

        setTimeout(() => {

            mywindow.print();
            mywindow.close();
        }, 1000)
        // let originalContents = document.body.innerHTML;
        // document.body.innerHTML = printContents;
        // window.print();
        // document.body.innerHTML = originalContents;

    }

    const addHeader = () => {
        let linkToAdd = document.createElement('link');

        // Link to water.css stylesheet
        linkToAdd.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi';

        linkToAdd.crossOrigin = 'anonymous';

        // Get the head element of the document
        // and append the link
        document.head.appendChild(linkToAdd);

        // Update textarea
        // updateHeadOutput();
    }
    const addJS = () => {
        let scriptToAdd = document.createElement('script');
        scriptToAdd.type = 'text/javascript';

        // Create contents of the script
        let inlineScript = document.createTextNode("console.log('Script Loaded Successfully');");

        scriptToAdd.appendChild(inlineScript);

        // Uncomment to load script from another
        // source
        // scriptToAdd.src = 'myscript.js';

        // Get the head element of the document
        // and append the script
        document.head.appendChild(scriptToAdd);

        // Update textarea
        // updateHeadOutput();
    }

    // function updateHeadOutput() {
    //     document.querySelector(".head-element")
    //         .textContent = document.head.innerHTML;
    // }

    // updateHeadOutput();
    return (
        <div className='container'>
            <div style={{ display: 'flex', width: '100%', backgroundColor: "#FFF7F4", marginTop: 20, marginBottom: 20, padding: 20 }}>
                <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>

                        <p style={{ marginBottom: 0, fontSize: 35, fontWeight: '700' }}>£350</p>
                        <p style={{ marginBottom: 0, fontSize: 14, color: '#7F7F7F' }}>Todays Bill Amount</p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%', padding: 30, backgroundColor: '#FFFCFB' }}>
                    <div style={{ textAlign: 'center' }}>

                        <p style={{ marginBottom: 0, fontSize: 28, fontWeight: '600' }}>£159</p>
                        <p style={{ marginBottom: 0, fontSize: 14, color: '#7F7F7F' }}>Todays Bill Amount</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>

                        <p style={{ marginBottom: 0, fontSize: 28, fontWeight: '600' }}>105</p>
                        <p style={{ marginBottom: 0, fontSize: 14, color: '#7F7F7F' }}>Successful Deliveries</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>

                        <p style={{ marginBottom: 0, fontSize: 28, fontWeight: '600' }}>4</p>
                        <p style={{ marginBottom: 0, fontSize: 14, color: '#7F7F7F' }}>Returned Orders</p>
                    </div>

                </div>
            </div>

            <div className='row'>
                <div className='col-lg-5'>
                    <div style={{ border: '1px solid #7F7F7F', borderRadius: 10, padding: 10, height: '70vh', overflowY: 'scroll' }}>
                        <div style={{}}>
                            <label htmlFor='date_filter' style={{ marginRight: 10 }}>filter</label>
                            <input id='date_filter' type={'date'}></input>
                            <hr style={{ marginBottom: 5 }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }}>

                                <div style={{ display: 'flex', width: '40%' }}>
                                    <p style={{ marginBottom: 0, width: '60%', fontWeight: '700' }}>Invoice ID</p>
                                    <p style={{ marginBottom: 0, fontWeight: '700' }}>Date</p>
                                </div>
                                <p style={{ marginBottom: 0, fontWeight: '700' }}>Paid Amount</p>
                            </div>
                            <hr style={{ marginTop: 5 }} />

                            {
                                invoice.map((invoice, index) => {
                                    console.log("invoice details", invoice)
                                    return (
                                        <div
                                            onClick={() => {
                                                setSelectedInvoiceID(invoice)
                                            }}
                                            key={index}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                backgroundColor: invoice === selectedInvoiceID ? '#FFF7F4' : 'white',
                                                padding: 10,
                                                borderRadius: 5,
                                                boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.15)',
                                                marginBottom: 10
                                            }}>

                                            <div style={{ display: 'flex', width: '40%', }}>
                                                <p style={{ marginBottom: 0, width: '60%', }}>#2342423</p>
                                                <p style={{ marginBottom: 0 }}>25/10/2022</p>
                                            </div>
                                            <p style={{ marginBottom: 0, fontWeight: '700', color: '#fb6c3e' }}>£240.00</p>
                                        </div>
                                    )
                                })

                            }


                        </div>
                    </div>
                </div>
                <div className='col-lg-7'>
                    { selectedinvoice > 0 ?
                    <div id='invoiceDiv' style={{ border: '1px solid #7F7F7F', borderRadius: 10, padding: 20, }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <img style={{ width: '100px' }} src='https://storage.googleapis.com/locus_image_store/assets/logo_1024.png'></img>
                            <h1 style={{ fontSize: '1.5rem', marginBottom: 0 }}>Invoice Reciept</h1>
                            <p style={{ marginBottom: 0 }}>30/10/2022</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', marginBottom: 20, paddingBottom: 20 }}>
                            <div>
                                <h2 style={{ fontSize: '1.5em' }}>Jegnus UK Ltd</h2>
                                <p>3 Stuart Road, Harrow,
                                    <br></br>
                                    HA3 7RF, United Kingdom</p>
                            </div>
                            <div>
                                <p style={{ textAlign: 'right', marginBottom: 0 }}>+44 7810676749</p>
                                <p style={{ textAlign: 'right' }}>contact@jegnus.com</p>
                                {/* <p style={{ textAlign: 'right', marginBottom: 0 }}>Sort Code: 23-69-72</p>
                                <p style={{ textAlign: 'right', marginBottom: 0 }}>Account Number: 28346298</p> */}
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <p style={{ fontWeight: '500' }}>Bill To:</p>
                                <h2 style={{ fontSize: '1.5em' }}>Slice</h2>
                                <p style={{ width: '250px' }}>6 Princes Parade
                                    Golders Green Road
                                    London
                                    NW11 9PS</p>
                                {/* <p style={{ marginBottom: 0 }}>+44 32423423424</p>
                                <p style={{}}>contact@jegnus.com</p> */}

                            </div>
                            <div style={{ width: '200px' }}>

                                {/* <p>Invoice ID: <span style={{ fontWeight: 'bold' }}>#52342342</span></p> */}
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><p style={{ marginBottom: 0 }}>Invoice No:</p>     <p style={{ marginBottom: 0, fontWeight: '700' }}>INV-OO18</p> </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><p style={{ marginBottom: 0 }}>Issue Date:</p>     <p style={{ marginBottom: 0, fontWeight: '500' }}>30/10/2022</p> </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><p style={{ marginBottom: 0 }}>Due Date:</p>     <p style={{ marginBottom: 0, fontWeight: '500' }}>31/10/2022</p> </div>
                            </div>
                        </div>
                        {/* <div>
                            <p style={{ fontWeight: '700', fontSize: '1.2rem' }}>Orders processed</p>
                        </div> */}
                         <table className='table table-striped table-hover' style={{ width: '100%' }} striped hover>
                            <thead>
                                <tr>
                                    <th>#Order ID</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Fee(£)</th>
                                    <th>VAT(£)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#4213424</td>
                                    <td>28/10/2022</td>
                                    <td>5:46PM</td>
                                    <td>Delivery</td>
                                    <td>Completed</td>
                                    <td>3.25</td>
                                    <td>0.75</td>
                                </tr>

                                <tr>
                                    <td>#4213424</td>
                                    <td>28/10/2022</td>
                                    <td>5:46PM</td>
                                    <td>Delivery</td>
                                    <td>Completed</td>
                                    <td>3.25</td>
                                    <td>0.75</td>
                                </tr>
                                <tr>
                                    <td>#4213424</td>
                                    <td>28/10/2022</td>
                                    <td>5:46PM</td>
                                    <td>Delivery</td>
                                    <td>Completed</td>
                                    <td>3.25</td>
                                    <td>0.75</td>
                                </tr>
                                <tr>
                                    <td>#4213424</td>
                                    <td>28/10/2022</td>
                                    <td>5:46PM</td>
                                    <td>Delivery</td>
                                    <td>Completed</td>
                                    <td>3.25</td>
                                    <td>0.75</td>
                                </tr>
                                <tr>
                                    <td>#4213424</td>
                                    <td>28/10/2022</td>
                                    <td>5:46PM</td>
                                    <td>Delivery</td>
                                    <td>Completed</td>
                                    <td>3.25</td>
                                    <td>0.75</td>
                                </tr>
                                <tr>
                                    <td>#4213424</td>
                                    <td>28/10/2022</td>
                                    <td>5:46PM</td>
                                    <td>Delivery</td>
                                    <td>Completed</td>
                                    <td>3.25</td>
                                    <td>0.75</td>
                                </tr>
                                <tr>
                                    <td>#4213424</td>
                                    <td>28/10/2022</td>
                                    <td>5:46PM</td>
                                    <td>Delivery</td>
                                    <td>Completed</td>
                                    <td>3.25</td>
                                    <td>0.75</td>
                                </tr>
                                <tr>
                                    <td colSpan={4}></td>
                                    <td style={{ fontWeight: 'bold' }}>Total</td>
                                    <td style={{ fontWeight: 'bold' }}>26</td>
                                    <td style={{ fontWeight: 'bold' }}>6</td>
                                </tr>
                            </tbody>
                        </table>

                        {/*<table className='table table-striped table-hover' style={{ width: '100%' }} striped hover>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Unit(£)</th>
                                    <th>Total(£)</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Food Delivery</td>
                                    <td>46</td>
                                    <td>16.50</td>
                                    <td>759</td>
                                </tr>



                            </tbody>
                        </table>*/}

                        <div style={{}}>
                            <p style={{ textAlign: 'right', marginRight: 10 }}>Total Payable Amount<span style={{ marginLeft: 20, fontSize: 30, fontWeight: '600' }}>£759.00</span></p>
                        </div>
                        <div>
                            <h4>Payment Details</h4>
                            <div style={{ width: '250px' }}>

                                {/* <p>Invoice ID: <span style={{ fontWeight: 'bold' }}>#52342342</span></p> */}
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><p style={{ marginBottom: 0 }}>Account Name:</p>     <p style={{ marginBottom: 0, fontWeight: '500' }}>Shrey Patel</p> </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><p style={{ marginBottom: 0 }}>Sort Code:</p>     <p style={{ marginBottom: 0, fontWeight: '500' }}>608371</p> </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><p style={{ marginBottom: 0 }}>Account Number:</p>     <p style={{ marginBottom: 0, fontWeight: '500' }}>24260831</p> </div>
                            </div>
                        </div>
                    </div>
                        :
                        null
                    }
                    <button
                        disabled={true}
                        onClick={() => {
                            handlePrint()
                        }}
                        style={{
                            backgroundColor: '#fb6c3e',
                            borderRadius: 5,
                            padding: '0.5em 1em',
                            color: 'white',
                            marginTop: 10,
                            border: 'none',
                            fontWeight: '700',
                            cursor: 'pointer'
                        }}>Print Invoice</button>
                </div>
            </div >
        </div >
    )
}

export default Account
