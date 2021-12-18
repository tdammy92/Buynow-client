import React, {useState, useEffect} from 'react'
import BaseApi from '../../store/BaseApi'
import FormatCurrency from '../Utils/formatCurrency'
import Ticker from 'react-ticker'
import axios from 'axios'
import Phones from '../../assets/images/Featured-Baby-Products.jpg'


// import { motion, AnimatePresence } from "framer-motion"

function getRandomIndex (min, max) {
    
    const offset = min
    const range = (max - min) + 1
    const randomNumber = Math.floor(Math.random() * range) + offset
  
    return randomNumber
  }
  



 

  



function DisplayTicker() {

    
    const [Prod,setProd] = useState([])
    const [Item,setItem] = useState('')


    
    useEffect(() => {
        
        async function getProducts(){
            
            axios.get(`${BaseApi}/products`)
            .then(res=> setProd(res.data))
            .catch((err)=> console.log(err.message))
        }
        
       getProducts()
        
    },[])


    function MakeFakeAPICall () {
      const number = getRandomIndex(0, Prod.length)
      return new Promise((resolve) => {
        window.setTimeout(() => {
          resolve(Prod[number])
        }, 500)
      })
    }
    

    useEffect(() => {
      async function fetchData () {
        const res = await MakeFakeAPICall()
        // console.log(res);
        setItem(res)
      }


      window.setTimeout(()=>{
        
        fetchData()
      },500)


    }, [Prod])




const {prodImg,prodName,prodPrice} = Item || ''

    return (
       Item ?
       <div className='banner-item'>

       <div className="img-container">
           <img
               src={BaseApi + prodImg
               ?.url}
               alt={prodName}/>

       </div>

       <h4>{prodName}</h4>
       <h4>
           <strong>
               {FormatCurrency.format(prodPrice)}

           </strong>
       </h4>

   </div>
             :
             <div className='banner-item'>

             <div className="img-container">
                 <img
                     src={Phones}
                     alt='buy-now'
                       className='img-holder'
                     />
     
             </div>
     
             <h4>Buy Now</h4>
             <h4>
                 <strong>
                     Buy-Now
     
                 </strong>
             </h4>
     
         </div>
      
    )
}


function Banner() {

   

   
    

    return (
        <div className='banner-container'>

            <Ticker speed={10}>
            {() => <DisplayTicker />}
               
            </Ticker>

           

        </div>

    )
}

export default Banner;
