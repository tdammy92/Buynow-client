import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'

import axios from 'axios'
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import BaseApi from '../../store/BaseApi'
import Store from '../../store/Store'
import FormatCurrency from '../Utils/formatCurrency';



const useStyles = makeStyles({
    table: {
        minWidth: 300
    },
    tableContainer: {
        maxWidth: 400

    }
});


const TAX_RATE = 0.07;

function Purchase() {

    const [Purchase, setPurchase] = useState({})
    const [Item, setItem] = useState({})

    const {id} = useParams()
    const {User} = Store();

    const Token = User.jwt;

    const classes = useStyles();

    async function getPurchase() {


        axios.get(`${BaseApi}/purchase-histories/${id}`,{
            headers: {'Authorization': `Bearer ${Token}`}
        })
        .then(res=>{
            
            setPurchase(res.data)
        })
        .catch(err=>{
            console.log(err.message);
        })
    }

    useEffect(() => {
       getPurchase()
    }, [])
    


    // const purchasedItems = JSON.parse(Purchase?.item);
    // console.log(Purchase);

    
    
    async function checkItem() {
        try {
            const item = JSON.parse(Purchase.item)
            setItem(item)
        } catch (error) {
            console.log(error);
        }
    }
    
    
    useEffect(() => {
        checkItem()
    }, [Purchase])




    console.log(Item);
    const {Total,Cart} = Item;

 

 


    return (
     

        <div className="purchase-container">

            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="caption table">
                    {/* <caption>Thank you for patronizing Buy-now, hope to see you soon!!!</caption> */}
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={3}>
                                <h2 className='invoice-header '>Buy-now</h2>
                            </TableCell>
                        </TableRow>
                      
                        <TableRow>

                            <TableCell align="left" colSpan={3}>
                                <p className='invoice-sub-heading'>Invoice No:<span>#{Purchase?.InvoiceNo}</span>
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>

                            <TableCell align="left" colSpan={3}>
                                <p className='invoice-sub-heading'>Date Purchased:<span>{Purchase?.createdAt}</span>
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>

                            <TableCell align="left" colSpan={3}>
                                <p className='invoice-sub-heading'>Status:<span>{Purchase.Delivered ?  'Delivered':'Pending'}</span>
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>ITEM</TableCell>
                            <TableCell align="center">QTY</TableCell>
                            <TableCell align="center">PRICE(N)</TableCell>

                        </TableRow>
                    </TableHead>
                    {Item && <TableBody>
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
                    </TableBody> }
                    <TableFooter>
                        <TableRow>

                            <TableCell align="center" colSpan={2}>
                            <p className='invoice-total'>

                                Sub Total:
                                </p>
                            </TableCell>
                            <TableCell align="center">
                               {Item &&

                                <p className='invoice-total'>

                                    {FormatCurrency.format(Total)}
                                </p>

                               }
                            </TableCell>

                        </TableRow>
                        <TableRow>

                            <TableCell align="center" colSpan={2}>
                                <p className='invoice-total'>
                                   
                                Total PRICE:
                                </p>
                            </TableCell>
                            <TableCell align="center">
                            {Item &&

                                <p className='invoice-total'>

                                    {FormatCurrency.format((Total) + (TAX_RATE * Total))}
                                </p>
                            }
                            </TableCell>

                        </TableRow>

                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Purchase
