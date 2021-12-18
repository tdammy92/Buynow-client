import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Cart from './components/Cart/Cart'
import Shop from './components/shop/Shop'
import Profile from './components/User/Profile'
import Login from './components/Login/Login'
import Admin from './components/Admin/Admin'
import Delete from './components/Delete/Delete';
import Uploads from './components/Uploads/Uploads'
import Page404 from './components/Page404/Page404';
import CheckOut from './components/Checkout/CheckOut';
import Register from './components/Register/Register';
import PurchaseHistory from './components/Histrory/PurchaseHistory';
import Purchase from './components/Histrory/Purchase';
import ProtectedRoute from './components/Protected/ProtectedRoute';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Store from './store/Store'

import Nav from './components/Nav'


function App() {

    const {User: IsLoggedin} = Store()

    return (
        <div className="main-container">

            <Router>
                <Nav/>

                <Switch>

                    <Route exact path='/'>

                        <Shop/>

                    </Route>
                    <Route exact path='/login'>

                        <Login/>

                    </Route>
                    <Route exact path='/register'>

                        <Register/>

                    </Route>
                    <Route exact path='/cart'>

                        <Cart/>

                    </Route>

                    {/* <Route exact path='/admin'>

                        <Admin/>

                    </Route> */}

                    <ProtectedRoute
                        exact
                        path='/admin'
                        IsLoggedin={IsLoggedin}
                        Component={Admin}/>

                    <ProtectedRoute
                        exact
                        path='/admin/delete'
                        IsLoggedin={IsLoggedin}
                        Component={Delete}/>

                    <Route exact path='/admin/uploads'>

                        <Uploads/>

                    </Route>

                    <ProtectedRoute
                        exact
                        path='/profile'
                        IsLoggedin={IsLoggedin}
                        Component={Profile}/>

                    <ProtectedRoute
                        exact
                        path='/purchaseHistory'
                        IsLoggedin={IsLoggedin}
                        Component={PurchaseHistory}/>
                   
                    <ProtectedRoute
                        exact
                        path='/purchase/:id'
                        IsLoggedin={IsLoggedin}
                        Component={Purchase}/>

                    <ProtectedRoute
                        exact
                        path='/checkout'
                        IsLoggedin={IsLoggedin}
                        Component={CheckOut}/>

                    <Route exact path='*'>
                        <Page404/>
                    </Route>

                </Switch>
            </Router>

        </div>
    );
}

export default App;
