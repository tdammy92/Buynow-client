import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import BaseApi from '../../store/BaseApi'
import Store from './../../store/Store'
import FormatCurrency from '../Utils/formatCurrency'

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        maxHeight: 250
    }
});

function ShopItem({
    id,
    prodName,
    prodPrice,
    prodQty,
    prodImg,
    prodDesc
}) {

    const {AddToCart} = Store()

    const CartObject = {
        id,
        prodName,
        prodPrice,
        prodQty,
        qty: 1,
        // total:prodPrice,

    }

    const classes = useStyles();
    return (

        <Grid
            item
            xs={8}
            sm={4}
            md={3}
            style={{
            maxWidth: '250px',
            margin: '15px'
        }}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt=""
                        height="140"
                        // image={BaseApi + prodImg.url}
                        image={prodImg.url}
                        title={prodName}/>

                    <h3 className='product-name'>
                        {prodName && prodName}
                        : {prodPrice && FormatCurrency.format(prodPrice)}
                    </h3>

                </CardActionArea>

                <CardActions>
                    {prodQty < 1
                        ? <IconButton
                            edge="end"
                            color="primary"
                            aria-label="add to cart"
                            // onClick={() => AddToCart(CartObject)}
                            >

                            <RemoveShoppingCartIcon/>

                        </IconButton>
                        
                       
                        : <IconButton
                            edge="end"
                            color="primary"
                            aria-label="add to cart"
                            onClick={() => AddToCart(CartObject)}>

                            <AddShoppingCartIcon/>

                        </IconButton>
}

                    <h4 >
                        {prodQty > 0
                            ? `in stock`
                            : 'Out of stock'}
                    </h4>
                </CardActions>
            </Card>

        </Grid>

    )
}

export default ShopItem
