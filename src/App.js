mport React, { Component } from "react";
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
      //console.log(typesResData.data.types[0].type.name);
      typesData.push(typesResData.data.types[0].type.name);
      /*axios.get(this.state.data.results[item].url).then((pokeUrl) => {
        typesData.push(pokeUrl.data.types[0].type.name);
      });*/
    }

    return typesData;
  }

  render() {
    //console.log(this.state.typesData.length);
    //console.log(this.state.names.length);
    return (
      /*this.state.loading ? (
      <h1>LOADING</h1>
    ) : (*/
      <div>
        {this.state.loading ? (
          <h1>LOADING</h1>
        ) : (
          <div className="cards-div">
            {this.state.imageUrls.map((item, index) => {
              return (
                <div className={this.state.typesData[index]} key={index}>
                  <h3>
                    {this.state.names[index].slice(0, 1).toUpperCase() +
                      this.state.names[index].slice(1)}
                  </h3>
                  <img
                    src={this.state.imageUrls[index]}
                    alt={`${this.state.names[index]}`}
                  ></img>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
