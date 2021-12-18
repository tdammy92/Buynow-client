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
// import FormatCurrency from '../Utils/formatCurrency';
import Store from '../../store/Store'

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: 440
    }
});

function DeleteUser() {

const {User:CurrentUser} = Store()

const Token = CurrentUser.jwt

    const [User,
        setUser] = useState([])

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

    async function getUser() {
        axios
            .get(`${BaseApi}/users`,{
                headers: {'Authorization': `Bearer ${Token}`}
            })
            .then(res => {
                setUser(res.data)
                
                
            })
            .catch((err) => {
                return console.log(err.message);
            })
    }

    useEffect(() => {
        getUser()
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
                                USERNAME
                            </TableCell>

                            <TableCell
                                align='center'
                                style={{
                                minWidth: 170
                            }}>
                                EMAIL
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{
                                minWidth: 170
                            }}>
                                ROLE
                            </TableCell>
                         

                            <TableCell
                                align='center'
                                style={{
                                minWidth: 170
                            }}>
                                DATE REGISTERED
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
                        {User
                            ?.map((item) => {
                                    
                                const {id,username,email,role:{name},createdAt} = item
                                 return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={id}>

                                        <TableCell align='center'>
                                            {username}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {email}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {name}
                                        </TableCell>
                                       
                                        <TableCell align='center'>
                                            {new Date(createdAt).toDateString()}
                                        </TableCell>
                                  


                                        <TableCell align="center">
                                            <HighlightOffIcon color='secondary'/>

                                        </TableCell>

                                    </TableRow>
                                ); 
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={User?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}/>
        </Paper>
    );

}

export default DeleteUser
