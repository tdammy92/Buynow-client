import React, {useEffect, useState} from 'react'
import axios from 'axios'
// import {Button} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import BaseApi from '../../store/BaseApi'
import Store from '../../store/Store'
import deleteImg from '../Utils/DeleteImg';

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: 440
    }
});

function DeletCategory() {

    const {User:CurrentUser} = Store()

const Token = CurrentUser.jwt

    const [Category,
        setCategory] = useState([])

    const classes = useStyles();
    const [page,
        setPage] = useState(0);
    const [rowsPerPage,
        setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+ event.target.value);
        setPage(0);
    };

    async function getCategory() {
        axios
            .get(`${BaseApi}/categories`)
            .then(res => {
                setCategory(res.data)
            })
            .catch((err) => {
                return console.log(err.message);
            })
    }


    async function DeleteCategory(id) {
        
        axios.delete(`${BaseApi}/categories/${id}`,{
            headers: {'Authorization': `Bearer ${Token}`}
        })
        .then(res=>{
            
            deleteImg(res.data.catImg.id,Token)
            
            getCategory()
        }).catch((err)=>{
            console.log(err.message);
        })
        
    }

    useEffect(() => {
        getCategory()
    }, [])

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>

                            <TableCell
                                align='center'
                                style={{
                                minWidth: 170
                            }}>
                                CATEGORY
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{
                                minWidth: 170
                            }}>
                                PRODUCT
                            </TableCell>

                            <TableCell
                                align='center'
                                style={{
                                minWidth: 170
                            }}>
                                DATE CREATED
                            </TableCell>

                            <TableCell
                                align='center'
                                style={{
                                minWidth: 170
                            }}>
                                DELETE
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Category
                            ?.map((item) => {
                                  
                                const {id, catName,products, createdAt} = item
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={id}>

                                        <TableCell align='center'>
                                            {catName}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {products?.length}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {new Date(createdAt).toDateString()}
                                        </TableCell>
                                      

                                        {products.length < 1 ? 
                                            <TableCell align="center">
                                            <HighlightOffIcon
                                            
                                             color='secondary' onClick={()=>DeleteCategory(id)}/>

                                        </TableCell>:

                                        <TableCell align="center">
                                            <HighlightOffIcon style={{color:"gray"}} />

                                        </TableCell>
                                        }

                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={Category.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}/>
        </Paper>
    );

}

export default DeletCategory
