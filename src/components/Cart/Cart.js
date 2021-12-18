import React, { useEffect} from 'react'



import CartItem from './CartItem'
import Store from '../../store/Store'
import {Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import FormatCurrency from '../Utils/formatCurrency'


import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from 'react-router-dom'


const useStyles = makeStyles({
    table: {
        minWidth: 700
    }
});

const TAX_RATE = 0.07;

function Cart() {
    
    const classes = useStyles();
    
    
    const {
        Cart,
        TotalItems,
        ClearCart,
        User,
        getTotal,
        Total
    } = Store();

    const Person = User
        ?.user
            ?.username;

    

    useEffect(() => {
        getTotal()
    }, [Cart])

       



    return (
        <div className='Cart'>

            <div className="cart__intro">
                <h3>Cart Items</h3>

                <p>
                    Dear
                    <span className='cart-user'>
                        {User
                            ? Person
                            : "Guest"}

                    </span>
                    below is the items you added to cart
                </p>
            </div>

            <div className="carttable-container">

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="spanning table">
                        <TableHead>

                            <TableRow>
                                <TableCell align="center">
                                    QTY
                                </TableCell>

                                <TableCell align="center">PRODUCT</TableCell>
                                <TableCell align="center">PRICE</TableCell>
                                <TableCell align="center">TOTAL</TableCell>
                                <TableCell align="center">REMOVE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Cart
                                ?.map((item) => (<CartItem {...item}/>))}

                            {Cart.length < 1
                                ? null
                                : <> <TableRow>

                                    <TableCell colSpan={2}></TableCell>

                                    <TableCell colSpan={2}>
                                        <strong>Total Items</strong>
                                    </TableCell>
                                    <TableCell align="center">
                                        <strong>{TotalItems}</strong>
                                    </TableCell>
                                </TableRow> <TableRow> <TableCell colSpan={2}></TableCell> <TableCell colSpan = {
                                    2
                                } > <strong>Subtotal</strong> </TableCell>
                                <TableCell align="center">
                                    <strong>{FormatCurrency.format(Total)}</strong> </TableCell> </TableRow>

                            <TableRow>
                                <TableCell colSpan={2}></TableCell> <TableCell>
                                    <strong>Tax</strong>
                                </TableCell> <TableCell align = "center" > <strong>{`${ (TAX_RATE * 100).toFixed(0)} %`}</strong> </TableCell>
                                <TableCell align="center">
                                    <strong>{FormatCurrency.format(TAX_RATE * Total)}</strong> </TableCell> 
                                    </TableRow>

                            <TableRow>

                                <TableCell colSpan={2}></TableCell> 
                                <TableCell colSpan={2}>
                                    <strong>Total</strong>
                                </TableCell> <TableCell align = "center"> <strong>{FormatCurrency.format((Total) + (TAX_RATE * Total))}</strong> </TableCell>
                            </TableRow> </>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className="total">

                {Cart
                    ?.length < 1
                        ? <h4 className='cart_empty_message'>Your Cart is empty, pls

                                <Link to='/' className='cart-bck-btn'>go back</Link>

                                to add item(s) to Cart</h4>
                        : <Button
                            variant="contained"
                            color="secondary"
                            startIcon={< DeleteIcon />}
                            onClick={() => ClearCart()}
                            style={{width:'150px'}}
                            >
                            Clear Cart
                        </Button>}

                <span></span>

                {Cart.length < 1
                    ? null
                    : <Button 
                    component={Link}
                     to='/checkout' 
                  
                    variant="contained" color='primary' endIcon={<ShoppingCartIcon/>}
                     style={{width:'150px'}}
                    >CheckOut</Button>
}

            </div>

        </div>
    )
}

export default Cart
