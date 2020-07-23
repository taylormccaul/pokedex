import React, { Component } from "react";
import "./App.css";

const axios = require("axios");

var names = [];
var imageUrls = [];
var pokemonUrls = [];
var typesData = [];
var typesArr = [];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      names: [],
      imageUrls: [],
      pokemonUrls: [],
      typesData: [],
      loading: true,
      serverResponse: "",
    };
  }

  async componentDidMount() {
    this.getPokemonData().then(() => {
      this.setState({
        loading: false,
      });
    });
  }

  async getPokemonData() {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20`);
    const { data } = await res;
    this.setState({ data: data });

    this.getNamesData(data).then((result) => {
      this.setState({
        names: result,
      });
    });

    this.getImageData(data).then((result) => {
      this.setState({
        imageUrls: result,
      });
    });

    await this.getUrlsData(data).then((result) => {
      this.setState({
        pokemonUrls: result,
      });
    });

    await this.getTypesData(data).then((result) => {
      this.setState({
        typesData: result,
      });
    });
  }

  async getNamesData(inputData) {
    for (let item in inputData.results) {
      names.push(inputData.results[item].name);
    }
    return names;
  }

  async getImageData(inputData) {
    for (let item in inputData.results) {
      imageUrls.push(
        `https://pokeres.bastionbot.org/images/pokemon/${
          parseInt(item) + 1
        }.png`
      );
    }

    return imageUrls;
  }

  async getUrlsData(inputData) {
    for (let item in inputData.results) {
      pokemonUrls.push(inputData.results[item].url);
    }
    return pokemonUrls;
  }

  async getTypesData(inputData) {
    for (let item in inputData.results) {
      var typesRes = await axios.get(inputData.results[item].url);
      var typesResData = await typesRes;
      typesArr = [];
      for (let type in typesResData.data.types) {
        typesArr.push(typesResData.data.types[type]);
      }
      //console.log(typesArr)
      typesData.push(/*typesResData.data.types[0].type.name*/ typesArr);
      //console.log(typesData)
    }

    return typesData;
  }

  render() {
    //console.log(this.state.typesData[0])
    return (
      <div>
        {this.state.loading ? (
          <h1>LOADING</h1>
        ) : (
          <div className="cards-div">
            {this.state.imageUrls.map((item, index) => {
              return (
                <div
                  className={this.state.typesData[index][0].type.name}
                  key={index}
                >
                  <header>
                    <h3 className="pokemon-name">
                      {this.state.names[index].slice(0, 1).toUpperCase() +
                        this.state.names[index].slice(1)}
                    </h3>
                    {index + 1 < 10 ?
                    <h3 className="pokemon-number">#00{index}</h3>
                    : index + 1 < 100 ?
                    <h3 className="pokemon-number">#0{index}</h3>
                    : <h3 className="pokemon-number">#{index}</h3>
                    }
                  </header>
                  <img
                    src={this.state.imageUrls[index]}
                    alt={`${this.state.names[index]}`}
                  ></img>
                  {this.state.typesData[index].length === 1 ? (
                    <div
                      className={`${this.state.typesData[index][0].type.name}-preview-sing`}
                    >
                      {this.state.typesData[index].map((item, itemIndex) => {
                        return (
                          <p key={itemIndex} className="types-preview">
                            {this.state.typesData[index][itemIndex].type.name}
                          </p>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      className={`${this.state.typesData[index][0].type.name}-preview-mult`}
                    >
                      {this.state.typesData[index].map((item, itemIndex) => {
                        return (
                          <p key={itemIndex} className="types-preview">
                            {this.state.typesData[index][itemIndex].type.name}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
