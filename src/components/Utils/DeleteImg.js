import BaseApi from "../../store/BaseApi"
import axios from "axios"


// the below function is used to delete image from strapi and cloudinary, it takes the image ID and user Token

const deleteImg = (ImgId,Token) => {

    
    axios
        .delete(`${BaseApi}/upload/files/${ImgId}`, {
        headers: {
            'Authorization': `Bearer ${Token}`
        }
    })
        .then(res => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(`somthing went wrong ${err.message}`)

           
        })
}


export default deleteImg