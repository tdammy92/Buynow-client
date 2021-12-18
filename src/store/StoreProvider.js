import React, {useReducer} from 'react'
import {InitialState, GlobalStore} from './Store'
import * as actionTypes from './actionTypes'

import AppReducer from './AppReducer';

function Provider({children}) {

    const [state,
        dispatch] = useReducer(AppReducer, InitialState)

    function AddToCart(item) {

        const res = state.Cart
            ?.filter(itm => itm.id === item.id)

        const compare = res[0]
            ?.id;

        if (compare === item
            ?.id) {
            console.log('Already added to cart');
        } else {

            dispatch({type: actionTypes.ADD_TO_CART, payload: item})

        }
    }

    function IncItem(id) {

        dispatch({type: actionTypes.INCREASE_ITEM, payload: id})
    }

    function DecItem(id) {
        dispatch({type: actionTypes.DECREASE_ITEM, payload: id})
    }

    function getTotal() {

        dispatch({type: actionTypes.GET_TOTAL})

    }
    function setInvoiceNo() {

        dispatch({type: actionTypes.SET_INVOICE_NO})

    }

    function RemoveFromCart(id) {

        dispatch({type: actionTypes.REMOVE_FROM_CART, payload: id})
    }

    function ClearCart() {
        dispatch({type: actionTypes.CLEAR_CART})
    }
    function ClearPurchase() {
        dispatch({type: actionTypes.CLEAR_PURCHASE})
    }

    function SignIn(User) {

        dispatch({type: actionTypes.SIGN_IN, payload: User})
    }

    function SignOut() {
        localStorage.clear()

        dispatch({type: actionTypes.SIGN_OUT})

    }

    function CheckUser() {
        dispatch({type: actionTypes.CHECK_USER})
    }

    return (

        <GlobalStore.Provider
            value={{
            Cart: state
                ?.Cart,
            Total: state?.Total,
            User: state
                ?.User,
            TotalItems: state?.Amount,
            InvoiceNo:state?.InvoiceNo,
            AddToCart,
            RemoveFromCart,
            ClearCart,
            ClearPurchase,
            SignIn,
            SignOut,
            CheckUser,
            IncItem,
            DecItem,
            getTotal,
            setInvoiceNo
        }}>

            {children}

        </GlobalStore.Provider>

    )

}

export default Provider;