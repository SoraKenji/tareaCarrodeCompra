import React, { Component } from 'react';
import '../App.css';

const Summary = ({cart}) => {
    let total = 0;
    cart.forEach(item => {
        total+=item.quantity*item.price;
    });
    return <div className="col"><h4 className="float-right">Total {total}</h4></div>;
}

export default Summary;