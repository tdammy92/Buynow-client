import React, {useEffect, useState} from 'react'
import Dashboard from './Dashboard'
// import Uploads from '../Uploads/Uploads'
import {Button} from '@material-ui/core'
import BaseApi from '../../store/BaseApi'
import Store from '../../store/Store'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'

function Admin() {

    const [Category,
        setCategory] = useState([])

    const {User} = Store()

    useEffect(() => {

        async function getCategory() {

            axios
                .get(`${BaseApi}/categories`)
                .then(res => {
                    setCategory(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        getCategory()

    }, [])

   

    if (User
        ?.user
            ?.role.name !== 'Admin') {
        return <Redirect to='/'/>
    }

    return (
        <div className='Admin'>
            <h3 className='title'>Admin Dashboard</h3>

            <div className="dashboard">

                {Category
                    ?.map(cat => {
                        return <Dashboard key={cat.id} {...cat}/>
                    })}

            </div>

            <hr/>

            <div className="buttons__container">

                <Button
                    variant='contained'
                    component={Link}
                    to='/admin/uploads'
                    color='primary'>
                    Uploads
                </Button>

                <Button
                    component={Link}
                    to="/admin/delete"
                    variant='contained'
                    color='secondary'>
                    Delete
                </Button>

                <Button variant='contained'>
                    Reports
                </Button>

            </div>

        </div>
    )
}

export default Admin
