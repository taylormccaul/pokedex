import React, { Component } from 'react';

export default class PokemonCard extends Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: ''
    };
    
    render() {
        const { name, url } = this.props;

        const pokemonIndex = url.split("/")[url.split("/").length - 2];
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

        this.setState({
            name, 
            imageUrl,
            pokemonIndex
        });

        return (
            <div className="col-md-3 col-sm-6 mb-5">
                <div className="card">
                    <h5 className="card-header">{this.state.pokemonIndex}</h5>
                </div>
            </div>
        );
    }
}
