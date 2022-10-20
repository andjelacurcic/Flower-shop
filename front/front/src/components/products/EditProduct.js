import React from 'react';
import Axios from '../../apis/Axios';
import {Col, Row, Form, Button} from 'react-bootstrap';
import {withParams, withNavigation} from '../../routeconf';
import './../index.css';

class EditProduct extends React.Component{

    constructor(props) {
        super(props);

        this.state = { id:-1, name: '', price: '', avlbl: 0, img: '',categoryName:'',categoryId:-1 }
    }

    componentDidMount(){
        this.getProductById(this.props.params.id);
    }

    getProductById(id){
        Axios.get('/product/' + id)
        .then(res => {
            // handle success
            console.log(res);
            this.setState({id: res.data.id, name: res.data.name, price: res.data.price, avlbl: res.data.avlbl, img: res.data.img, categoryName: res.data.categoryName,categoryId: res.data.categoryId});
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Error occured please try again!');
         }); 
    }

    onNameChange = event => {
        console.log(event.target.value);

        const { name, value } = event.target;
        console.log(name + ", " + value);

        this.setState((state, props) => ({
            name: value
        }));
    }
    onPriceChange = event => {
        console.log(event.target.value);

        const { name, value } = event.target;
        console.log(name + ", " + value);

        this.setState((state, props) => ({
            price: value
        }));
    }

    onAvlblChange = event => {
        console.log(event.target.value);

        const { name, value } = event.target;
        console.log(name + ", " + value);

        this.setState((state, props) => ({
            avlbl: value
        }));
    }

    onImgChange = event => {
        console.log(event.target.value);

        const { name, value } = event.target;
        console.log(name + ", " + value);

        this.setState((state, props) => ({
            img: value
        }));
    }

    edit() {
        var params = {
            'id': this.state.id,
            'name': this.state.name,
            'price': this.state.price,
            'avlbl': this.state.avlbl,
            'img': this.state.img,
            'categoryName': this.state.categoryName,
            'categoryId': this.state.categoryId
        };

        Axios.put('/product/' + this.state.id, params)
        .then(res => {
            // handle success
            console.log(res);
            alert('Movie was edited successfully!');
            this.props.navigate('/products');
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Error occured please try again!');
         });
    }

    render() {
        return (
            <Col>
                <Row><h1>Edit product</h1></Row>
                <Row>
                <Form className='formstyle'>
                    <Form.Group>
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control id="name" type="text" value={this.state.name} onChange={(e) => this.onNameChange(e)}/><br/>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label htmlFor="price">price</Form.Label>
                    <Form.Control id="price" type="number" value={this.state.price} onChange={(e) => this.onPriceChange(e)}/>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label htmlFor="avlbl">Available</Form.Label>
                    <Form.Control id="avlbl" type="text" value={this.state.avlbl} onChange={(e) => this.onAvlvlChange(e)}/><br/>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label htmlFor="img">Image</Form.Label>
                    <Form.Control id="img" type="text" value={this.state.img} onChange={(e) => this.onImgChange(e)}/><br/>
                    </Form.Group>
                </Form>
                </Row>
                <Button className='buttons' onClick={() => this.edit()}>Edit</Button>
            </Col>
        );
    }

}

export default withNavigation(withParams(EditProduct));