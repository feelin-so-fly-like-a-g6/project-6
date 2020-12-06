import { Component } from "react";
import axios from "axios";

//Make a second API call within the component, passing the word as a parameter.
//For the API call, we need: user word
// This API call will return a list of words that usually follow that word in the English language
// Filter/other method that array of results to get the words with the correct number of syllables (ie if the user inputs a 2 syllable word, we will give them results with <= 3 syllables)

class Haiku extends Component {
  constructor() {
    super();
    this.state = {
      //PROPS
      userWord: "water", //passed as a prop
      userSyllCount: 2, //passed as prop
      lineCount: 5, //5 or 7 - passed in as prop

      line: "",
      userSelect: "word",
      totalSylls: null, //Could also be remaining
      results: [],
    };
  }

  //function to filter the array of results to only get the matching number of syllables
  filterResults = () => {
    const syllsNeeded = this.state.lineCount - this.state.userSyllCount;
    console.log(syllsNeeded);

    const filteredArray = this.state.results.filter((word) => {
      return word.numSyllables <= syllsNeeded;
    });
    //setState results with the filtered array
    this.setState({
      results: filteredArray,
    });
    console.log(this.state.results);
  };

  //function to get words that follow
  getWords = (word) => {
    //API call to get the words that normally follow the word in the user input
    axios({
      url: "https://api.datamuse.com/words",
      responseType: "json",
      method: "GET",
      params: {
        rel_bga: word, //will be prop
        md: "s",
      },
    }).then((response) => {
      this.setState({
        results: response.data,
      });
      console.log(response.data);
      //call the function to filter the results
      this.filterResults();
    });
  };

  componentDidMount() {
    //API call to get the words that normally follow the word in the user input
    this.getWords(this.state.userWord);

    this.setState({
      line: this.state.userWord,
    });
  }

  handleSelect = (input) => {
    this.setState({
      userSelect: input.target.value,
    });
  };

  //When user selects a word
  //call the function to get words + filter
  handleSubmit = (e) => {
    e.preventDefault();

    console.log(this.state.userSelect);
    // this.getWords(this.state.userSelect);

    //add to line
    // this.setState({
    //     line: this.state.line + this.state.userSelect
    // })
  };

  render() {
    return (
      <div className="Haiku">
        <h2>Haiku</h2>
        <p>User word: {this.state.userWord}</p>
        <p>Line so far: {this.state.line}</p>

        <h3>Word options:</h3>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="word">Choose a word:</label>

          <select
            name="wordSelect"
            id="word"
            onChange={this.handleSelect}
            value={this.state.userSelect}
          >
            {this.state.results.map((word) => {
              return word.word !== "." ? (
                <option key={word.score} value={word.word}>
                  Word:{word.word} (# of syllables: {word.numSyllables})
                </option>
              ) : null;
            })}
          </select>

          <button onClick={this.handleSelect}>Pick Word</button>
        </form>
      </div>
    );
  }
}

export default Haiku;
