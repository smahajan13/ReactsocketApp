import React from 'react';
import Websocket from 'react-websocket';
 
  class ProductDetail extends React.Component {
 
    constructor(props) {
      super(props);
      this.state = {
        count: '90'
      };
    }
 
    handleData(data) {
      let result = JSON.parse(data);
      console.log(result,'result');
      this.setState({count: this.state.count + result.data});
    }
 
    render() {
      return (
        <div>
          Count: <strong>{this.state.count}</strong>
 
          <Websocket url='ws://localhost:5000/chat'
              onMessage={this.handleData.bind(this)}/>
        </div>
      );
    }
  }
 
  export default ProductDetail;