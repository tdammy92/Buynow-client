import {createContext, useContext } from 'react';



export function getUser() {

    const ls = JSON.parse(localStorage.getItem('user'))

    if (ls) {
        return ls
    } else {
        return null
    }
    

  
}


export const InitialState = {
    Cart:[],
    InvoiceNo:'',
    Total:0, 
    Amount:0,
    User: getUser() || null,
    
    
}



export const GlobalStore = createContext(InitialState);

const Store = ()=> useContext(GlobalStore)


export default Store; 