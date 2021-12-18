import React, {useState} from 'react'
import {Button} from '@material-ui/core';
import {Link,useHistory,Redirect} from 'react-router-dom'
import axios from 'axios';
import BaseApi from '../../store/BaseApi';
import Store from '../../store/Store'

function Login() {

    const history = useHistory()

    const [Email,
        setEmail] = useState('')
    const [Password,
        setPassword] = useState('')


       
        const {SignIn,User} = Store()

    function HandleLogin(e) {
        e.preventDefault()

     

        const UserDetails = {
            identifier : Email,
            password:Password
        }

        axios.post(`${BaseApi}/auth/local`, UserDetails)
        .then(res=> {
           
            
            // SignIn(res.data)
            if (res.data.jwt) {
                localStorage.setItem('user', JSON.stringify(res.data))
                SignIn(res.data)
              history.push('/')
            }
        })
        .catch((err)=>{
            console.log(err.message);
        })

        setEmail('')
        setPassword('')

    }

    if (User) {
        return <Redirect to='/'/>
    }


    return (
        <div className='login'>

            <div className="form">
                <h3>Sign In
                </h3>
                <form onSubmit={(e) => HandleLogin(e)} className='form-container'>

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
                        className='reg-btn'>Sign In</Button>
                </form>

                <p>Don't have an account ? Register
                    <span className='form-span'>
                        <Link to='/register'>Here</Link>
                    </span>

                </p>
            </div>

        </div>
    )
}

export default Login
