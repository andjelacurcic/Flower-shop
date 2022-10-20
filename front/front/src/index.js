import React from 'react';
import ReactDOM  from 'react-dom';
import { Route, Link, HashRouter as Router, Routes, Navigate } from 'react-router-dom';
import { logout } from './services/auth';
import Home from './components/Home';
import Login from './components/authorization/Login';
import { Badge, Button, Container, Dropdown, Nav, Navbar,CButton,CBadge, Row } from 'react-bootstrap';
import Product from './components/products/Product';
import AddProduct from './components/products/AddProduct';
import {FaShoppingCart}from 'react-icons/fa'
import Cart from './components/products/Cart';
import EditProduct from './components/products/EditProduct';
import Orders from './components/orders/Orders';
import Checkout from './components/checkout/Checkout';
import Success from './components/checkout/Success';

class App extends React.Component {

    

    render(){
        
        const jwt = window.localStorage['jwt'];
    
        if(jwt){
            return(
                <>
                <Router >
                    <Navbar class="navbar" >
                        <Navbar.Brand as={Link} to="/">
                            Home
                        </Navbar.Brand>
                        <Nav>
                        <Nav.Link style={{fontSize:20}} as={Link} to="/products">
                                Products
                            </Nav.Link>
                        </Nav>
                        <Nav>
                        <Nav.Link style={{fontSize:20}} as={Link} to="/orders">
                                Orders
                            </Nav.Link>
                            <Button style={{fontSize:20}} onClick={()=>logout()} as={Link} to="/">logout</Button>
                        </Nav>
                      
                         
                    </Navbar>
                    <Container style={{paddingTop:"10px"}}>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/products" element={<Product/>}/> 
                            <Route path="/products/add" element={<AddProduct/>}/> 
                            <Route path="/products/edit/:id" element={<EditProduct/>}/> 
                            <Route path="/cart/:id" element={<Cart/>}/>
                            <Route path="/orders" element={<Orders/>}/>
                            <Route path="/checkout/:id" element = {<Checkout/>}/>
                            <Route path="/success" element={<Success/>}/>
                            <Route path="/cart/:id" element={<Cart/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="/login" element={<Login/>}/>
                        </Routes>
                    </Container>
                </Router>
             
                </>
        );  
        }else{
            return(
                <>
                <Router>
                    <Navbar class="navbar" >
                        <Navbar.Brand as={Link} to="/" style={{fontSize:20}}>
                        Home
                        </Navbar.Brand>
                        <Nav>
                            <Nav.Link as={Link} to="/products" style={{fontSize:20}}>
                                Products
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login" style={{fontSize:20}}>
                            Login
                            </Nav.Link>
                           
                        </Nav>
                    </Navbar>
                    <Container style={{paddingTop:"10px"}}>
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path="/products" element={<Product/>}/>
                            <Route path="/login" element={<Login/>}/>
                        </Routes>
                    </Container>
                </Router>

                </>
            );
        }  
    }
}
    
ReactDOM.render(
    
        <App/>,
   
    document.querySelector('#root')
);