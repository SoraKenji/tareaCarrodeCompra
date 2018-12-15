import React, { Component } from 'react';
import './App.css';
import ShoppingCart from './components/shoppingcart';
import ProductSelector from './components/productSelector';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, name: 'Producto_1', price: 1000 },
        { id: 2, name: 'Producto_2', price: 110 },
        { id: 3, name: 'Producto_3', price: 1200 }
      ]
    };
    this.shoppingCart = React.createRef();
  }

  render() {
    return (
      <div className="container">
        <h1>Carro de Compras</h1>
        <ProductSelector items={this.state.items} ShoppingCart={this.shoppingCart}/>
        <ShoppingCart ref={this.shoppingCart}/>
      </div>
    );
  }
}

export default App;
