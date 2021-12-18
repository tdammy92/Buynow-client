import React from 'react'
import FormatCurrency from '../Utils/formatCurrency'
// import {Button} from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell';

import TableRow from '@material-ui/core/TableRow';

import Store from '../../store/Store'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function CartItem({prodName, prodPrice, id, qty}) {

    const {RemoveFromCart, IncItem, DecItem} = Store()

    return (
        <TableRow key={id}>
            <TableCell >
            <span className='qty-toggle'>
                <ChevronLeftIcon onClick={()=>DecItem(id)}/>
                <strong>
                    {qty}
                </strong>
                <ChevronRightIcon onClick={()=>IncItem(id)}/>

            </span>
            </TableCell>
            <TableCell align="center">{prodName}</TableCell>
            <TableCell align="center">{FormatCurrency.format(prodPrice)}</TableCell>
            <TableCell align="center">{FormatCurrency.format(prodPrice * qty)}</TableCell>

            <TableCell align="center">
                <HighlightOffIcon onClick={()=>RemoveFromCart(id)} color='secondary'/>

            </TableCell>
        </TableRow>
    )
}

export default CartItem;
