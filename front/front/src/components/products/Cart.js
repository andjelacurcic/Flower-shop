import React from 'react';
import Axios from '../../apis/Axios';
import {Row, Col, Table, Form,Button} from 'react-bootstrap'
import './../index.css';
import {withParams, withNavigation} from '../../routeconf'
import './../index.css';
class Cart extends React.Component{


  constructor(props) {
    super(props);

    this.state = {
      items: [],
      orders:[],
     orderId:-1, productName: '', productPrice: ''
       }
}

componentDidMount(){
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

deleteFromState(orderItemId) {
  var items = this.state.items;
  items.forEach((element, index) => {
      if (element.id === orderItemId) {
        items.splice(index, 1);
          this.setState({items: items});
      }
  });
}

delete(Id) {
  Axios.delete('/orderitem/' + Id)
  .then(res => {
      // handle success
      alert('Product was deleted successfully!');
       // ili
       //window.location.reload();
  });
  //this.deleteFromState(Id);
  window.location.reload();
}

goToCheckout(id) {
  this.props.navigate('/checkout/' + id);  
}

  renderOrderItems(){
    return this.state.items.map((item, index) =>{
        return(
            <tr key={item.id}>
                <td>{item.productName}</td>
                <td>{item.productPrice}.00 RSD</td>
                <td><Button variant="danger" className='buttonStyle' onClick={() => this.delete(item.id)}>Delete</Button></td>
            </tr>
        );
    });
}



    render(){

        return (
          <div className='backimg'>
            <h1>Order</h1>
            <Table striped className='tablestyle'>
              <thead>
                <tr>
                  <th>Product name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {this.renderOrderItems()}
              </tbody>
            </Table>
            <div>
              < h1 style={{color: 'black', marginLeft:400}}><b>Full price: </b><b>{this.state.orders.fullPrice}.00 RSD</b></h1>
              <button onClick={() => this.goToCheckout(this.props.params.id)} className="buttonStyle" style={{ marginLeft:500, borderRadius: 50}}>CHECKOUT</button>
            </div>
            
            <div>   
            </div>
          </div>
        )
    }
}

export default withNavigation(withParams(Cart));