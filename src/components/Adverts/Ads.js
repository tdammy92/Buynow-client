import React,{useState} from 'react'

function Ads({Content, duration}) {


    // const [display, setDisplay] = useState(false)
    const [display, setDisplay] = useState(null);

    function generateRandom() {
        return Math.floor((Math.random() + 1) * 2)
    }

   let random;
   
        setInterval(() => {
        setDisplay()

        random = generateRandom();
    }, duration)

    console.log(random ? random : "empty");

    return (
        <div style={{textAlign:'center', color:'blue' , marginTop:'60px'}}>

                {display && <h1 style={{translate:`scale({${display})`}}>{Content}</h1>}
            
        </div>
    )
}

export default Ads;
