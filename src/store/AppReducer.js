import * as actionTypes from './actionTypes'

function AppReducer(state, action) {

    switch (action.type) {

        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                Cart: [
                    action.payload, ...state.Cart
                ]
            }

        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                Cart: state
                    .Cart
                    .filter(item => item.id !== action.payload)
            }
        case actionTypes.SET_INVOICE_NO:
            return {
                ...state,
                InvoiceNo: Date.now()
            }

        case actionTypes.SIGN_IN:

            return localStorage.setItem('user', JSON.stringify(action.payload))

        case actionTypes.CHECK_USER:
            return {
                ...state,
                User: JSON.parse(localStorage.getItem('user')) || null
            }

        case actionTypes.SIGN_OUT:
            return {
                ...state,
                User: null
            }

        case actionTypes.INCREASE_ITEM:
            let TempCart = state
                .Cart
                .map((item) => {
                    if (item.id === action.payload) {

                        return {
                            ...item,
                            qty: item.qty + 1
                        }

                    }

                    return item

                });

            return {
                ...state,
                Cart: TempCart
            }

        case actionTypes.DECREASE_ITEM:
            let tempCart = state
                .Cart
                .map((item) => {
                    if (item.id === action.payload) {
                        if (item.qty > 1) {

                            return {
                                ...item,
                                qty: item.qty - 1
                            }
                        }
                    }

                    return item

                });
            return {
                ...state,
                Cart: tempCart
            }

        case actionTypes.GET_TOTAL:
           
        const {Total,Amount} = state.Cart.reduce((cartTotal,cartItem)=>{

                const { prodPrice,qty} = cartItem

                const itemTotal = +(prodPrice * qty);
              
                cartTotal.Total  += +itemTotal;
               
                cartTotal.Amount += +qty;

               

                return cartTotal

            },{Total:0, Amount:0})
      
            return {...state, Total,Amount}

        case actionTypes.CLEAR_CART:
            return {
                ...state,
                Cart: []
            }
        case actionTypes.CLEAR_PURCHASE:
            return {
                ...state,
                Cart: [],
                InvoiceNo:'',
                Total:0, 
                Amount:0,
                
            }

        default:
            return state;
    }

}

export default AppReducer;