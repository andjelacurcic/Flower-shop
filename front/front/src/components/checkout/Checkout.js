import React from 'react';
import Axios from '../../apis/Axios';
import {withParams, withNavigation} from '../../routeconf'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';


class Checkout extends React.Component
{
    constructor(props) {
        super(props);
    
        this.state = {
          items: [],
          orders:[],
         orderId:-1, 
         productName: '',
          productPrice: '',
          check: 0,
          checked: false
           }

    }

    handleCheck(){
        this.setState({
            checked:true
          
        })
    
    }

    componentDidMount(){
        console.log(this.state.checked)
        this.getItems();
        this.getOrderById()
    }

     
getItems(){
  
    let config={
        params:{
           // name: this.state.search.name,
            orderId: this.props.params.id
        }
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
  
  getOrderById(){
    let id = this.props.params.id;
    Axios.get('/orders/' + id)
    .then(res => {
        // handle success
        console.log(res);
        this.setState({orders:res.data })
    })
    .catch(error => {
        // handle error
        console.log(error);
        alert('Error occured please try again!');
     }); 
  }
  
  
  
    renderOrderItems(){
      return this.state.items.map((item, index) =>{
          return(
              <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
              <h6 class="my-0">{item.productName}</h6>
              <small class="text-muted">{item.productPrice}</small>
              </div>
              <span class="text-muted">{item.productPrice}</span>
          </li>
          );
      });
  } 

  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };
  
  goToSuccess() {
    this.props.navigate('/success');  
}
  

  render()
  {
    return (
        <div className="checkout">
         <section class="py-5">
                <div class="container px-4 px-lg-5 my-5">
                <div class="row">
                <div class="col-md-4 order-md-2 mb-4">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">Your cart</span>
                    <span class="badge badge-secondary badge-pill">{this.state.items.length}</span>
                    </h4>
                    <ul class="list-group mb-3">
                    
                    {this.renderOrderItems()}
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Total (RSD)</span>
                        <strong>{this.state.orders.fullPrice}</strong>
                    </li>
                    </ul>
                    
                </div>
                <div class="col-md-8 order-md-1">
                    <h4 class="mb-3">Billing address</h4>
                    <form class="needs-validation" novalidate>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                        <label for="firstName" class="form-label">First name</label>
                        <input type="text" class="form-control" id="firstName" placeholder="" value={this.state.orders.usersName} required />
                        <div class="invalid-feedback">
                            Valid first name is required.
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <label for="lastName" class="form-label">Last name</label>
                        <input type="text" class="form-control" id="lastName" placeholder="" value={this.state.orders.lastName} required />
                        <div class="invalid-feedback">
                            Valid last name is required.
                        </div>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="email" class="form-label">Email <span class="text-muted">(Optional)</span></label>
                        <input type="email" class="form-control" id="email" placeholder="you@example.com" />
                        <div class="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">Address</label>
                        <input type="text" class="form-control" id="address" placeholder="1234 Main St" value={this.state.orders.address} required />
                        <div class="invalid-feedback">
                        Please enter your shipping address.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="address2" class="form-label">Address 2 <span class="text-muted">(Optional)</span></label>
                        <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" />
                    </div>
                    <div class="row">
                        <div class="col-md-5 mb-3">
                        <label for="country" class="form-label">Country</label>
                        <select class="form-select d-block w-100" id="country" required>
                            <option value="">Serbia</option>
                            <option>Serbia</option>
                        </select>
                        <div class="invalid-feedback">
                            Please select a valid country.
                        </div>
                        </div>
                        <div class="col-md-4 mb-3">
                        <label for="state" class="form-label">City</label>
                        <select class="form-select d-block w-100" id="state" required>
                            <option value="">Novi Sad</option>
                            <option>California</option>
                        </select>
                        <div class="invalid-feedback">
                            Please provide a valid state.
                        </div>
                        </div>
                        <div class="col-md-3 mb-3">
                        <label for="zip" class="form-label">Zip</label>
                        <input type="text" class="form-control" id="zip" placeholder="" value="21000" required />
                        <div class="invalid-feedback">
                            Zip code required.
                        </div>
                        </div>
                    </div>
                    <hr class="mb-4" />
                    
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="save-info"onChange={()=>this.handleCheck()} />
                        <label class="form-check-label" for="save-info" >Placanje pri dostavi</label>
                    </div>
                    {this.state.checked === false && 
                    <div>
                    <hr class="mb-4" />
                    <h4 class="mb-3">Payment</h4>
                    <div class="d-block my-3">
                        <div class="form-check">
                        <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked required />
                        <label class="form-check-label" for="credit">Credit card</label>
                        </div>
                        <div class="form-check">
                        <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required />
                        <label class="form-check-label" for="debit">Debit card</label>
                        </div>
                        <div class="form-check">
                        <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required />
                        <label class="form-check-label" for="paypal">Paypal</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                        <label for="cc-name" class="form-label">Name on card</label>
                        <input type="text" class="form-control" id="cc-name" placeholder="" required />
                        <small class="text-muted">Full name as displayed on card</small>
                        <div class="invalid-feedback">
                            Name on card is required
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <label for="cc-number" class="form-label">Credit card number</label>
                        <input type="text" class="form-control" id="cc-number" placeholder="" required />
                        <div class="invalid-feedback">
                            Credit card number is required
                        </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 mb-3">
                        <label for="cc-expiration" class="form-label">Expiration</label>
                        <input type="text" class="form-control" id="cc-expiration" placeholder="" required />
                        <div class="invalid-feedback">
                            Expiration date required
                        </div>
                        </div>
                        <div class="col-md-3 mb-3">
                        <label for="cc-expiration" class="form-label">CVV</label>
                        <input type="text" class="form-control" id="cc-cvv" placeholder="" required />
                        <div class="invalid-feedback">
                            Security code required
                        </div>
                        </div>
                   </div>
                   
                    </div>}
                    {this.state.checked === true &&
                    <div></div>}
                    <hr class="mb-4" />
                    <button class="btn btn-dark px-4 rounded-pill" type="button" 
                     onClick={(e)=>{this.createNotification('success'); this.goToSuccess()}}
                    >Place Order</button>
                    <NotificationContainer/>
                    </form>
                </div>
                </div>
            </div>
            </section>
         
        </div>
      
    )
  }
}
export default withNavigation(withParams(Checkout));