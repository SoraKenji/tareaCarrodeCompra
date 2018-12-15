import React from 'react';
import Summary from './summary';

class ShoppingCart extends React.Component {

    index = 0;
    items = [
        { id: 1, name: 'Producto_1', price: 1000 },
        { id: 2, name: 'Producto_2', price: 110 },
        { id: 3, name: 'Producto_3', price: 1200 }
      ];
    constructor(props)
    {
        super(props);
        this.state = {
            carrito:[]
        }
        this.handleClickMore = this.handleClickMore.bind(this);
        this.handleClickLess = this.handleClickLess.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    handleClickDelete = (id) => {
        let carrito = Object.assign([], this.state.carrito);
        const itemMenos = carrito.filter(c => c.id != id);
        this.setState({ carrito: itemMenos });
    }

    handleClickMore = (id) => {
        let carrito = Object.assign([], this.state.carrito);
        carrito.find(c => c.id == id).quantity++;
        this.setState({carrito:carrito});
    }
    
    handleClickLess = (id) => {
        let carrito = Object.assign([], this.state.carrito);
        let toSearch = carrito.find(c => c.id == id);
        toSearch.quantity--;
        if(toSearch.quantity <= 0){
            console.log('dd');
            if (carrito.length <= 1) {
                this.setState({ carrito: [] });
            } else {
                const itemMenos = carrito.filter(c => c.id != id);
                this.setState({ carrito: itemMenos });
            }
        }else{
            this.setState({carrito:carrito});
        }
    }
    handleClick(id, cantidad) {
        let carrito = Object.assign([], this.state.carrito);
        let object = this.items.find(c => c.id == id);
        let toSearch = carrito.find(c=> c.id == id);
        console.log(toSearch);
        if (typeof toSearch !== 'undefined'){
            toSearch.quantity++;
            console.log(carrito);
        }
        else{
            carrito.push({
                id: object.id,
                name: object.name,
                price: object.price,
                quantity: cantidad});
        }
        this.setState({carrito});
        
    }
    handleChange(e) {
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    render(){
        this.index = 0;
        const listItems = this.state.carrito.map(item => {
            this.index++;
            return (
              <tr key={this.index} role="row">
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.price * item.quantity}</td>
                <td>
                  <button type="button" className="btn btn-primary" onClick={() => this.handleClickLess(item.id)}>Reducir</button>
                  <button type="button" className="btn btn-success" onClick={() => this.handleClickMore(item.id)}>Agregar</button>
                  <button type="button" className="btn btn-danger" onClick={() => this.handleClickDelete(item.id)}>Eliminar</button>
                </td>
              </tr>
            );
          });
        return (
            <div>
            <div className="row">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
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
                
            </div>
            <Summary cart={this.state.carrito}/>
            </div>
        );
    }
}

export default ShoppingCart;