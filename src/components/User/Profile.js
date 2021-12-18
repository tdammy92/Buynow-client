import React from 'react'
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import Store from '../../store/Store'
import BaseApi from '../../store/BaseApi';

function Profile() {

    const history = useHistory()

    const {User, SignOut} = Store()

    function HandleSignOut() {

        history.push('/')

        SignOut()

    }

    console.log(User);
    return (
        <div className='User-page'>
            <div className="User-wrapper">

                <h2>My Profile</h2>
                <div className="profile-section">
                    <div className="avater">
                        <img
                            src={`${BaseApi}${User
                            ?.user
                                ?.UserImage
                                    ?.url}`}
                            alt={User.user.username}/>
                    </div>

                    <div>

                        <h3>
                            <span className='user-title'>Username:
                            </span>
                            {User
                                ?.user
                                    ?.username}</h3>
                        <p>
                            <span className='user-title'>Email:
                            </span>
                            {User
                                ?.user
                                    ?.email}</p>
                        <p>
                            <span className='user-title'>Date Registered:
                            </span>
                            {new Date(User
                                ?.user
                                    ?.createdAt).toDateString()}</p>

                        <p>
                            <span className='user-title'>Identity:
                            </span>
                            {User
                                ?.user
                                    ?.role
                                        ?.name}</p>
                    </div>
                </div>
                <div className="profile-btn">

                    <Button color='primary'>Reset Password</Button>
                    <Button variant='contained' color='secondary' onClick={HandleSignOut}>Logout</Button>

                </div>
            </div>

        </div>
    )
}

export default Profile
