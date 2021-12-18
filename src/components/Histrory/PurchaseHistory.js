import React, {useEffect} from 'react'

import Store from '../../store/Store'
import {Button} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {Link} from 'react-router-dom'


import VisibilityIcon from '@material-ui/icons/Visibility';



const useStyles = makeStyles({
    table: {
        minWidth: 700
    },
    emptyCard: {
        maxWidth: 1000,
        maxHeight: 650,
        minWidth: 500,
        minHeight: 350,
        padding:20,
        textAlign:'center'
    },
    btn:{
       textAlign:'center'
    }
});

function PuchaseHistory() {

    const classes = useStyles();

    const {User} = Store();
    const {user:{username,purchase_histories}} = User

    console.log(purchase_histories);

    

  
 

    return (
        <div className='Cart'>

            <div className="cart__intro">
                <h3>Purchase History</h3>

               {purchase_histories.length > 0 && <p>
                    Dear
                    <span className='cart-user'>
                        {username}

                    </span>
                    Below is your Purchase History
                </p>}
            </div>

            <div className="carttable-container">


            {purchase_histories.length < 1 ? 
            

            <Card  className={classes.emptyCard}>
                <CardActionArea>
                    <h3>{username} you have not bought anything from Buy-Now, your missing out !!!</h3> 

                </CardActionArea>
                <CardActions  className={classes.btn}>
                    <Button color='primary' variant='contained' component={Link} to='/'>Shop now</Button>
                </CardActions>

            </Card>
            :
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="spanning table">
                        <TableHead>

                            <TableRow>

                                <TableCell align="center">DATE</TableCell>
                                <TableCell align="center">Invoice-No</TableCell>
                                <TableCell align="center">VIEW</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                       

                        {
                            purchase_histories.map((item)=>{

                            

                                return  <TableRow  key={item.id}>

                                            <TableCell align="center">{(item.createdAt)}</TableCell>
                                            <TableCell align="center">#{item.InvoiceNo}</TableCell>
                                            <TableCell align="center"> 
                                            
                                            <Link  to={`/purchase/${item.id}`}>

                                            <VisibilityIcon
                                             color='primary'/>
                                            </Link>
                                             
                                             </TableCell>


                                        </TableRow>
                            }
                            )
                        }

                           
                        </TableBody>
                    </Table>
                </TableContainer>
                }
            </div>

        </div>

    )
}

export default PuchaseHistory
