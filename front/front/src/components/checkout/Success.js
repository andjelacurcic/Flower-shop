import React from 'react';
import Axios from '../../apis/Axios';
import {withParams, withNavigation} from '../../routeconf'

class Success extends React.Component{

    constructor(props) {
        super(props);
    }

    goToProduct() {
        this.props.navigate('/');  
    }

    render()
    {
      return (
        <div>
            <h1>SUCCESS!</h1>
            <button  onClick={(e)=>{this.goToProduct()}}>Back to home page</button>
        </div>

      )
    }

}

export default withNavigation(withParams(Success));