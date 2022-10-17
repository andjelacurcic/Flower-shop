import React  from "react";
import { withNavigation } from "../../routeconf";
import { Form, Button, Row, Col } from "react-bootstrap";
import Axios from '../../apis/Axios';


class AddProduct extends React.Component{

    constructor(props){
        super(props);

        let params = {
            name: "",
            price: "",
            avlbl: true,
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
                <Form style={{ width: "100%" }}>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Naziv proizvoda</Form.Label>
                        <Form.Control
                          name="name"
                          as="input"
                          type="text"
                          placeholder="Unesi naziv"
                          onChange={(e) => this.onInputChange(e)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
      
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Cena</Form.Label>
                        <Form.Control
                        name="price"
                          type="number"
                          as="input"
                          
                          onChange={(e) => this.onInputChange(e)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Dostupnost</Form.Label>
                        <Form.Control
                          name="avlbl"
                          as="input"
                         
                          onChange={(e) => this.onInputChange(e)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Drzava takmicara</Form.Label>
                        <Form.Select
                          name="categoryId"
                          onChange={(e) => this.onInputChange(e)}
                        >
                          <option>Izaberi kateogoriju</option>
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
                      Dodaj takmicara
                    </Button>
                  </Col>
                </Row>
              </div>
            </>
          );
        }

}

export default withNavigation(AddProduct);