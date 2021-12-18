import React,{useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios';

import Store from '../../store/Store'
import BaseApi from '../../store/BaseApi'
import FormatCurrency from '../Utils/formatCurrency';

import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import {queryByTitle} from '@testing-library/react';

const useStyles = makeStyles({
    table: {
        minWidth: 300
    },
    tableContainer: {
        maxWidth: 400

    }
});

const TAX_RATE = 0.07;

function CheckOut() {
    const history = useHistory()

    const {User, Cart, Total, TotalItems, InvoiceNo,setInvoiceNo,ClearPurchase} = Store()

    const Token = User?.jwt 

    useEffect(() => {
        setInvoiceNo()
    
    }, [])

    const printInvoice = () => {
        window.print()
    }

    const classes = useStyles();

    function CompleteSale() {

        const ItemObje = {
            User,
            Cart,
            VAT:Total * TAX_RATE,
            SubTotal:Total,
            Total:(Total) + (TAX_RATE * Total)
        }

        const PurchaseObje = {
               
                item: JSON.stringify(ItemObje),
                user: [User.user.id],
                InvoiceNo: "" + InvoiceNo
        };

        axios({
            method: 'POST',
            url:  `${BaseApi}/purchase-histories`,
            data: PurchaseObje,
            headers: {'Authorization': `Bearer ${Token}`},
            })
        .then(res=>{
            console.log(res.data);
            history.push('/')
            ClearPurchase()
        })
        .catch(err=>{
            console.log(err.message);
        })


        
    }






    return (

        <div className='checkout-page'>

            <div className="invoice-container">

                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} aria-label="caption table">
                        <caption>Thank you for patronizing Buy-now, hope to see you soon!!!</caption>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={3}>
                                    <h2 className='invoice-header '>Buy-now</h2>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left" colSpan={3}>
                                    <p className='invoice-sub-heading'>Customer:
                                        <span>{User
                                                ?.user
                                                    ?.username}</span>
                                    </p>
                                </TableCell>
                            </TableRow>
                            <TableRow>

                                <TableCell align="left" colSpan={3}>
                                    <p className='invoice-sub-heading'>Invoice No:<span>#{InvoiceNo}</span>
                                    </p>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>ITEM</TableCell>
                                <TableCell align="center">QTY</TableCell>
                                <TableCell align="center">PRICE(N)</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Cart
                                ?.map((item) => {

                                    const {prodName, qty, prodPrice} = item;
                                    return <TableRow key={item.id}>
                                        <TableCell component="th" scope="row">
                                            {prodName}
                                        </TableCell>
                                        <TableCell align="center">{qty}</TableCell>
                                        <TableCell align="center">{FormatCurrency.format(prodPrice * qty)}</TableCell>

                                    </TableRow>
                                })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>

                                {/* <TableCell align="center"></TableCell> */}
                                <TableCell align="center" colSpan={2}>
                                <p className='invoice-total'>

                                    Sub Total:
                                    </p>
                                </TableCell>
                                <TableCell align="center">
                                    <p className='invoice-total'>

                                        {FormatCurrency.format(Total)}
                                    </p>
                                </TableCell>

                            </TableRow>
                            <TableRow>

                                {/* <TableCell align="center"></TableCell> */}
                                <TableCell align="center" colSpan={2}>
                                    <p className='invoice-total'>
                                        Total QTY : {TotalItems}

                                    </p>
                                </TableCell>
                                <TableCell align="center">
                                    <p className='invoice-total'>

                                        Total PRICE: {FormatCurrency.format((Total) + (TAX_RATE * Total))}
                                    </p>
                                </TableCell>

                            </TableRow>

                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>

            <Button
                onClick={CompleteSale}
                style={{
                marginTop: '15px'
            }}
                className='print-invoice'
                color='primary'
                variant='contained'>Pay</Button>

        </div>

    )
}

export default CheckOut
