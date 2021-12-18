import React from 'react'

function Dashboard({catName, products}) {
    return (
        <div className='Dashboard__item'>

        <h3>{catName}</h3>
        <p> Items:{products?.length}</p>
            
        </div>
    )
}

export default Dashboard
