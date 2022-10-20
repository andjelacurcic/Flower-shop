import React from 'react';
import Axios from '../../apis/Axios';
import {Row, Col, Button, Table, Form, Card} from 'react-bootstrap'
import './../index.css';
import {withParams, withNavigation} from '../../routeconf'
import Login from '../../components/authorization/Login'
class Orders extends React.Component{

    constructor(props) {
        super(props);

        const search = {
            // name: "",
             orderId: -1
            
         }
      
        this.state = { 
           orders: [],
           search: search,
            items: []
        }
    }

    componentDidMount() {
        this.getOrders();
       this.getItems();
    }

    getOrders() {
        let config={
            params:{
               // name: this.state.search.name,
                userName: window.localStorage.getItem("username")
            }
        }
        
        if(this.state.search.userName !== ""){
            
            config.params['userName'] = window.localStorage.getItem("username")
            
        }
        console.log(config)
        Axios.get('/orders',config)
        .then(res => {
             // handle success
             this.setState({
                 orders: res.data,
                });
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Error occured please try again!');
        });
    }


    getItems(){
        let config={
            params:{
               // name: this.state.search.name,
                orderId: this.state.search.orderId
            }
        }
        if(this.state.search.orderId !== ""){
            
            console.log(this.state.search.orderId)
            config.params['orderId'] = this.state.search.orderId;
        }
     
        Axios.get('/orderitem',config)
        .then(res => {
            let items = res.data;
            this.setState({
                items: res.data,
               });
            console.log(items)
        })
        .catch((err)=> {
            console.log(err);
        });
        
    }



  
    renderOrderItems(){
        return this.state.items.map((item, index) =>{
            return(
                <tr key={item.id}>
                    <td>{item.productName}</td>
                    <td>{item.productPrice}.00 RSD</td>
                </tr>
            );
        });
    }

    onInputChange(event){
        const name = event.target.name;
        const value = event.target.value
        
        let search=this.state.search;
        search[name] = value;
        console.log(search)
        this.setState({search})
    }


    renderOrders() {
        return this.state.orders.map((order, index) => {
            return (
               <tr key={order.id}>
                
                  <td>{order.usersName}</td>
                  <td>{order.lastName}</td>
                  <td>{order.address}</td>
                  <td>{order.date.toString()}</td>
                  <td>{order.fullPrice}.00 RSD</td>
                  <td>{order.contact}</td>
                  <td><button 
                  value={order.id}
                  name="orderId"
                   as="input"
                  type="text"
                  onClick={(e)=>{this.onInputChange(e); this.getItems()}}>items</button></td>
               </tr>
            )
         })
    }



    render() {
        
        if(window.localStorage['role']=='ROLE_ADMIN'){
        return (
            <div >
            <Col>
                <Row><h1>Orders</h1></Row>

                {window.localStorage['role']=='ROLE_ADMIN'?
                <Row>
                    <Button onClick={() => this.goToAdd() }>Add</Button>
                    <br/><br/>
                </Row>:null}
                
                <Row>
                    <Table className = 'tablestyle'>
                        <thead>
                            <tr>
                                
                                <th colSpan={2}>Name</th>
                                <th>Address</th>
                                <th>Date</th>
                                <th>Full price</th>
                                <th>Contact</th>
                                <th>Item</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderOrders()}
                        </tbody>                  
                    </Table>
                    <Table className = 'tablestyle'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.renderOrderItems()}
                        </tbody>
                    </Table>
                </Row>
            </Col>
            </div>
        );
        }
        else
        { 
            return(
                <>
                <div className='backimg'>
                <Col >
                <Row><h1 >Orders</h1></Row>
                <Row>
                    <Table className='tablestyle'>
                        <thead>
                            <tr>
                                <th colSpan={2}>Name</th>
                                <th>Address</th>
                                <th>Date</th>
                                <th>Full price</th>
                                <th>Contact</th>
                                <th>Item</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderOrders()}
                        </tbody>                  
                    </Table>
                    <Table className='tablestyle'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.renderOrderItems()}
                        </tbody>
                    </Table>
                </Row>
            </Col>
            </div>
                </>
            );

            }
        }

}

export default withNavigation(withParams(Orders));