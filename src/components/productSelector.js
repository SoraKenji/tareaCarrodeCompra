import React, { Component } from 'react';

const ProductSelector = ({items, ShoppingCart}) => {
    function onAddClick(e) {
        e.preventDefault();
        const form = new FormData(e.target)
        ShoppingCart.current.handleClick(form.get('producto'), form.get('cantidad'));
    }
    return (
    <div>
        <form className="form-inline" onSubmit={onAddClick}>
            <select name="producto" className="form-control">
            {items.map((i)=><option key={i.id} value={i.id}>{i.name} - {i.price}</option>)}
            </select>
            <div className="form-group">
                <input type="number" className="form-control" name="cantidad" min={1} defaultValue="1" required/>
            </div>
            <div className="form-group">
            <button type="submit" className="btn btn-primary">Agregar</button>
            </div>
        </form>
    </div>);
}

export default ProductSelector;