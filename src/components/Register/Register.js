import React, {useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {Button} from '@material-ui/core'
import axios from 'axios';
import BaseApi from '../../store/BaseApi';
import Store from '../../store/Store'


function Register() {

    const [UserName,
        setUserName] = useState('');
    const [Email,
        setEmail] = useState('');
    const [Password,
        setPassword] = useState('')

const {User} = Store()


        function HandleRegister(e) {

            e.preventDefault(e);


        const newRegister ={
            username:UserName,
            email:Email,
            password:Password
        }

        axios.post(`${BaseApi}/auth/local/register`, newRegister)
        .then(res=> {
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err.message);
        })


            setUserName('')
            setEmail('')
            setPassword('')
            
        }

        if (User) {
            return <Redirect to='/'/>
        }

    return (
        <div className='login'>

            <div className="form">
                <h3>Register
                </h3>
                <form onSubmit={e=>HandleRegister(e)} className='form-container'>

                    <div className="form-control">

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            placeholder='User@email.com'
                            value={Email}
                            onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    </div>
                    <div className="form-control">

                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id='username'
                            placeholder='JaneDoe20'
                            value={UserName}
                            onChange={(e) => {
                            setUserName(e.target.value)
                        }}/>
                    </div>
                    <div className="form-control">

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id='password'
                            placeholder='********'
                            value={Password}
                            onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                    </div>

                    <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        size='small'
                        fullWidth={false}
                        className='reg-btn'>Register</Button>
                </form>

                <p>Already have an account ? Sign In
                    <span className='form-span'>
                        <Link to='/login'>Here</Link>
                    </span>

                </p>
            </div>

        </div>
    )
}

export default Register
