import React from 'react';
import ReactDOM  from 'react-dom';
import { Route, Link, HashRouter as Router, Routes, Navigate } from 'react-router-dom';
import { logout } from './services/auth';
import Home from './components/Home';
import Login from './components/authorization/Login';
import { Badge, Button, Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import Product from './components/products/Product';
import AddProduct from './components/products/AddProduct';
import {FaShoppingCart}from 'react-icons/fa'

class App extends React.Component {

    //cd \......
    //npm install
    //npm install react-router-dom
    //npm install axios
    //npm install react-bootstrap
    // npm install jwt-decode
    //npm start

    render(){
        
        const jwt = window.localStorage['jwt'];

        if(jwt){
            return(
                
                <>
                <Router>
                    <Navbar class="navbar" >
                        <Navbar.Brand as={Link} to="/">
                            Home
                        </Navbar.Brand>
                        <Nav>
                        <Nav.Link as={Link} to="/products">
                                Products
                            </Nav.Link>
                            <Button onClick={()=>logout()}>logout</Button>
                        </Nav>
                         
                        <Dropdown style={{marginLeft:1020}}>
                                <Dropdown.Toggle variant="success">
                                <FaShoppingCart color="white" fontSiye="25px"/>
                                    <Badge>{10}</Badge>
                                </Dropdown.Toggle>
                            <Dropdown.Menu style={{minwidth: 370}}>
                            <span style={{padding:10}}> style</span>
                            </Dropdown.Menu>
                            </Dropdown>
                    </Navbar>
                    <Container style={{paddingTop:"10px"}}>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/products" element={<Product/>}/> 
                            <Route path="/products/add" element={<AddProduct/>}/> 
                            {/* <Route path="/putanja_neka" element={<PutanjaNeka/>}/> */}
                            {/* {<PutanjaNeka/>} se menja, izbacice gresku ako se ovako pokrene 
                            cd \......
                            npm install
                            npm install react-router-dom
                            npm install axios
                            npm install react-bootstrap
                            npm install jwt-decode
                            npm start
                            */}
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
                        <Navbar.Brand as={Link} to="/">
                        Home
                        </Navbar.Brand>
                        <Nav>
                            <Nav.Link as={Link} to="/putanja_neka">
                                Signup
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login">
                            Login
                            </Nav.Link>
                           
                        </Nav>
                    </Navbar>
                    <Container style={{paddingTop:"10px"}}>
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            {/* <Route path="/putanja_neka" element={<PutanjaNeka/>}/> */}
                            {/* {<PutanjaNeka/>} se menja, izbacice gresku ako se ovako pokrene 
                            cd \......
                            npm install
                            npm install react-router-dom
                            npm install axios
                            npm install react-bootstrap
                            npm install jwt-decode
                            npm start
                            */}
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