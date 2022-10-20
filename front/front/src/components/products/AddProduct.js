import React  from "react";
import { withNavigation } from "../../routeconf";
import { Form, Button, Row, Col } from "react-bootstrap";
import Axios from '../../apis/Axios';
import './../index.css';

class AddProduct extends React.Component{

    constructor(props){
        super(props);

        let params = {
            name: "",
            price: "",
            avlbl: true,
            img: "",
            categoryId: "",
        };
        this.state={  params: params, categories: [] };

       
    }
    componentDidMount() {
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

      onInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        let params = this.state.params;
        params[name] = value;
        console.log(params);
        this.setState({ params: params });
      }

      renderCategoriesInDropDown() {
        return this.state.categories.map((count) => {
          return (
            <option value={count.id} key={count.id}>
              {count.name}
            </option>
          );
        });
      }

      createProduct(e) {
        let params = this.state.params;
        let dto = {
          name: params.name,
          price: params.price,
          avlbl: params.avlbl,
          img: params.img,
          categoryId: params.categoryId,
        };
        console.log("dto: " + JSON.stringify(dto));
        try {
          Axios.post("/product", dto).then((res) => {
            console.log(res);
            this.props.navigate("/products");
          });
        } catch (err) {
          console.log(err);
        }
      }

      render() {
        return (
            <>
              <div>
                <Form className='formstyle'>
                  <Row >
                    <Col>
                      <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          name="name"
                          as="input"
                          type="text"
                          placeholder="mandatory"
                          onChange={(e) => this.onInputChange(e)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
      
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                        name="price"
                          type="number"
                          as="input"
                          placeholder="mandatory"
                          onChange={(e) => this.onInputChange(e)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col >
                      <Form.Group>
                        <Form.Label>Available</Form.Label>
                        <Form.Control
                          name="avlbl"
                          as="input"
                          placeholder="mandatory"
                          onChange={(e) => this.onInputChange(e)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Img</Form.Label>
                        <Form.Control
                        name="img"
                          type="text"
                          as="input"
                          
                          onChange={(e) => this.onInputChange(e)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label >Category</Form.Label>
                        <Form.Select
                          name="categoryId"
                          onChange={(e) => this.onInputChange(e)}
                        >
                          <option>Choose category</option>
                          {this.renderCategoriesInDropDown()}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
                <br />
                <Row>
                  <Col>
                    <Button onClick={(e) => this.createProduct(e)}>
                      Add product
                    </Button>
                  </Col>
                </Row>
              </div>
            </>
          );
        }

}

export default withNavigation(AddProduct);