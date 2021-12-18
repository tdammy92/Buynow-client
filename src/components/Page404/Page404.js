import React from 'react'
import { Button } from '@material-ui/core'
import {useHistory} from 'react-router-dom'

function Page404() {

    const history = useHistory()
    return (
        <div  style={{marginTop:'150px', textAlign:'center'}}>

            <h1>OOps! this is a dead end</h1>

            <div>
                <Button
                variant='contained'
                color='primary'
                onClick={()=>history.push('/')}
                >Go Back Home</Button>
            </div>

        </div>
    )
}

export default Page404
