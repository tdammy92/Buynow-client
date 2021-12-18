import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function LoaderBar(){
    return (

        <div className='loader'>

        <Loader
        type="Oval"
        color="#3f51b5"
        height={250}
        width={250}
        visible={true}
        // timeout={3000} //3 secs
    />

        </div>
    )
}

export default LoaderBar
