import React from 'react';
import Axios from '../../apis/Axios';
import {Row, Col, Button, Table, Form, Card,Badge} from 'react-bootstrap'
import {FaShoppingCart}from 'react-icons/fa'
import './../index.css';
import {withParams, withNavigation} from '../../routeconf'
import {
    MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol
  } from 'mdb-react-ui-kit';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Product extends React.Component{
    constructor(props) {
        super(props);

        let params={
            quantity: 1,
            ordersId: 5,
            productId: -1
        }
        

        const search = {
            name: "",
            categoryName: ""
        }
        this.state = { 
           products: [],
            search: search,
            categories:[],
            params: params,
            cart:0
    }
}
    componentDidMount() {
        this.getProduct();
        this.getCategories();
    }

    getCategories() {
        Axios.get("/category")
          .then((res) => {
            console.log(res);
            this.setState({ categories: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
      }

    getProduct() {
        let config={
            params:{
               // name: this.state.search.name,
                categoryName: this.state.search.categoryName
            }
        }
        /*if(this.state.search.name != ""){
            config.params['name'] = this.state.search.name;
        }*/
        if(this.state.search.categoryName !== ""){
            console.log(this.state.search.categoryName)
            config.params['categoryName'] = this.state.search.categoryName;
        }

        Axios.get('/product',config)
        .then(res => {
             // handle success
             console.log(res);
             this.setState({
                 products: res.data,
                });
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Error occured please try again!');
        });
    }

    deleteFromState(productId) {
        var products = this.state.products;
        products.forEach((element, index) => {
            if (element.id === productId) {
                products.splice(index, 1);
                this.setState({products: products});
            }
        });
    }
    getCategoryStringFromList(list) {
        return list.map(element => element.category).join(',');
    }

    delete(productId) {
        Axios.delete('/product/' + productId)
        .then(res => {
            // handle success
            console.log(res);
            alert('Product was deleted successfully!');
            this.deleteFromState(productId); // ili refresh page-a window.location.reload();
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Error occured please try again!');
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

    
    onInputChang2(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        let params = this.state.params;
        params[name] = value;
        console.log(params);
        this.setState({ params: params });
      }

    renderCategoriesInButton() {
        return this.state.categories.map((count) => {
          return (
            <button class="buttons" value2={count.name} key={count.id} 
            value={count.name}
            name="categoryName"
             as="input"
            type="text"
            onClick={(e)=>{this.onInputChange(e); this.getProduct()}} 
            >
              {count.name} 
            </button>
            
          );
        });
      }

      createOrderItem(productId) {
        let cart2 = this.state.cart;
        let cart = cart2 + 1;
        this.setState({cart: cart});
        let params = this.state.params;
        let dto = {
          quantity: params.quantity,
          ordersId: params.ordersId,
          productId: productId
        };
        console.log("dto: " + JSON.stringify(dto));
        try {
          Axios.post("/orderitem", dto).then((res) => {
            console.log(res);
          });
        } catch (err) {
          console.log(err);
        }
      }


    renderProducts() {
        return this.state.products.map((product, index) => {
            return (
               <tr key={product.id}>
                
                  <td>{product.name}</td>
                  <td>{product.price}.00 RSD</td>
                  <td>{product.avlbl.toString()}</td>
                  {window.localStorage['role']=='ROLE_ADMIN'?
                  [<td><Button variant="warning" onClick={() => this.goToEdit(product.id)}>Edit</Button></td>,
                  <td><Button variant="danger" onClick={() => this.delete(product.id)}>Delete</Button></td>]
                  :null}
               </tr>
            )
         })
    }

    renderProductForUser(){
        return this.state.products.map((product, index)=>{
            console.log(product)

            return (
                <MDBCol className="wrapper" > 
                    <MDBCard className='h-100'>
                    <MDBCardImage
                        src={product.img}
                        alt='...'
                        position='top'
                        class="img"
                    />
                    <MDBCardBody >
                        <MDBCardTitle>{product.name}</MDBCardTitle>
                        <MDBCardText class="card">
                        <br/>
                        CENA<br/> 
                        {product.price}.00 RSD 
                        </MDBCardText>
                        {product.avlbl.toString()=="true" &&
                        <Button className="button2s" onClick={() => this.createOrderItem(product.id)}>Add to cart</Button>}
                        {product.avlbl.toString()=="false" &&
                        <Button className="disabled" >Out of stock</Button>}
                       
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            )
        })
    }

    createNotification = (type) => {
        return () => {
          // eslint-disable-next-line default-case
          switch (type) {
            case 'info':
              NotificationManager.info('MUST LOGIN!');
              break; 
              
          }
        };
      };
    
    renderProductForNonUser(){
        return this.state.products.map((product, index)=>{
            console.log(product)

            return (
                <MDBCol className="wrapper" > 
                    <MDBCard className='h-100'>
                    <MDBCardImage
                        src={product.img}
                        alt='...'
                        position='top'
                        class="img"
                    />
                    <MDBCardBody >
                        <MDBCardTitle>{product.name}</MDBCardTitle>
                        <MDBCardText class="card">
                        <br/>
                        CENA<br/> 
                        {product.price}.00 RSD 
                        </MDBCardText>
                        {product.avlbl.toString()=="true" &&
                        <Button className="button2s" onClick={this.createNotification('info')}>Add to cart
                         <NotificationContainer/></Button>}
                        
                        {product.avlbl.toString()=="false" &&
                        <Button className="disabled" >Out of stock</Button>}
                       
                    </MDBCardBody>
                    </MDBCard>
                   
                </MDBCol>
                
            )
        })
    }

    
    

    goToAdd() {
        this.props.navigate('/products/add');  
    }

    goToCart(orderId){
        this.props.navigate('/cart/' + orderId);
    }

    goToEdit(productId) {
        this.props.navigate('/products/edit/'+ productId); 
    }

    render() {
        const jwt = window.localStorage['jwt'];
        if(jwt){
        if(window.localStorage['role']=='ROLE_ADMIN'){
        return (
            <Col>
                <Row><h1>Product</h1></Row>

                <Row>
                <Form style={{width:"100%"}}>
                    <Row><Col>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            value={this.state.search.categoryName}
                            name="categoryName"
                            as="input"
                            type="text"
                            onChange={(e)=>this.onInputChange(e)}></Form.Control>
                    </Form.Group>
                    </Col></Row>

                   
                </Form>
                </Row>
                <Row>
                <Button onClick={()=>this.getProduct()}>Search</Button>
                </Row>
                <br/>

                {window.localStorage['role']=='ROLE_ADMIN'?
                <Row>
                    <Button onClick={() => this.goToAdd() }>Add</Button>
                    <br/><br/>
                </Row>:null}
                
                <Row>
                    <Table style={{marginTop:5}} className='tablestyle'>
                        <thead>
                            <tr>
                                
                                <th>Name</th>
                                <th>Price </th>
                                <th>Available</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderProducts()}
                            
                        </tbody>                  
                    </Table>
                </Row>
            </Col>
        );
        }else{
            return(
                <>
                <div className='backimg'>
                <div >
                <FaShoppingCart style={{marginLeft:1020, fontSize:50}} onClick={() => this.goToCart(this.state.params.ordersId)}></FaShoppingCart>
                <Badge>{this.state.cart}</Badge>
                </div>
                <div class="buttonsdiv">
                    {this.renderCategoriesInButton()}
                </div >
                 <MDBRow className='row-cols-1 row-cols-md-4 g-4' >
                    {this.renderProductForUser()}
                </MDBRow>
                </div>
                </>
            );

        }
    }
            else{
                return(
                    <>
                <div className='backimg'>
                <div >
                <FaShoppingCart style={{marginLeft:1020, fontSize:50}} onClick={() => this.goToCart(this.state.params.ordersId)}></FaShoppingCart>
                <Badge>{this.state.cart}</Badge>
                </div>
                <div class="buttonsdiv">
                    {this.renderCategoriesInButton()}
                </div >
                 <MDBRow className='row-cols-1 row-cols-md-4 g-4' >
                    {this.renderProductForNonUser()}
                </MDBRow>
                </div>
                </>
                );
            }
        }
 }

export default withNavigation(withParams(Product));