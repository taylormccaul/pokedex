import React, { Component } from 'react';
import { whileStatement } from '@babel/types';
//import styled from 'styled-components';

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <a 
                    style={{color: 'white'}}
                    className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center">Pokedex</a>
                </nav>
            </div>
        );
    }
}