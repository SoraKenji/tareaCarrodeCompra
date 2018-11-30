import React, { Component } from 'react';
import './App.css';

class App extends Component {
  index = 0;
  constructor(props) {
    super(props);
    this.state = { valueNombreProducto: '', valueCantidadProducto: 0, valuePrecioProducto: 0, precioFinal: 0, items: [] };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickMore = this.handleClickMore.bind(this);
    this.handleClickLess = this.handleClickLess.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClickMore = (id) => {
    let items = Object.assign([], this.state.items);
    let object = items.find(c => c.id === id);
    object.cantidad++;
    this.setState({ precioFinal: parseInt(this.state.precioFinal) + parseInt(object.precio) });
    this.setState({ items });
  }

  handleClickLess = (id) => {
    let items = Object.assign([], this.state.items);
    let object = items.find(c => c.id === id);
    object.cantidad--;
    this.setState({ precioFinal: parseInt(this.state.precioFinal) - parseInt(object.precio) });
    if (parseInt(object.cantidad) <= 0) {
      if (items.length <= 1) {
        this.setState({ items: [] });
      } else {
        const itemMenos = items.filter(c => c.id !== id);
        this.setState({ items: itemMenos });
      }
    } else {
      this.setState({ items });
    }
  }

  handleClick(event) {
    let arrayCosas = [];
    const datoIngresar = {
      id: parseInt(this.index),
      nombre: this.state.valueNombreProducto,
      cantidad: parseInt(this.state.valueCantidadProducto),
      precio: parseInt(this.state.valuePrecioProducto),
      preciofinal: parseInt(this.state.valuePrecioProducto) * parseInt(this.state.valueCantidadProducto)
    };
    this.index++;
    arrayCosas.push(datoIngresar);
    this.setState({ precioFinal: this.state.precioFinal + datoIngresar.preciofinal });
    this.setState({ items: [...this.state.items, ...arrayCosas] });
  }

  handleChange(e) {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  render() {
    const listItems = this.state.items.map(item => {
      return (
        <tr role="row">
          <td>{item.id}</td>
          <td>{item.nombre}</td>
          <td>{item.cantidad}</td>
          <td>{item.precio}</td>
          <td>{item.preciofinal}</td>
          <td>
            <button type="button" class="btn btn-primary" onClick={() => this.handleClickLess(item.id)}>Reducir</button>
            <button type="button" class="btn btn-success" onClick={() => this.handleClickMore(item.id)}>Agregar</button>
          </td>
        </tr>
      );
    });
    return (
      <div class="container">
        <div class="form-group mb-2">
          <label>Producto: </label>
          <input type="text" name="valueNombreProducto" class="form-control" value={this.state.value} onChange={this.handleChange}></input>
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <label>Cantidad</label>
          <input type="number" name="valueCantidadProducto" min="1" max="100" value={this.state.value} onChange={this.handleChange}></input>
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <label>Precio</label>
          <input type="number" name="valuePrecioProducto" min="1" value={this.state.value} onChange={this.handleChange}></input>
        </div>
        <button class="btn btn-primary mb-2" onClick={this.handleClick}>Agregar</button>
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio Unitario</th>
                <th scope="col">Precio Final</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {listItems}
            </tbody>
          </table>
        </div>

        <div class="form-group mb-2">
          <label>Precio final: </label>
          <input type="text" readonly class="form-control-plaintext" value={this.state.precioFinal}></input>
        </div>
      </div>
    );
  }
}

export default App;
