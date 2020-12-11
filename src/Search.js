import { Component } from "react";
import "./App.css";
import axios from "axios";
import Error from "./Error";
class Search extends Component {
  constructor() {
    super();
    this.state = {
      suggestions: "",
      showError: false
    };
  }

  //this function gets suggested words for autocomplete from api
  getSuggestions = (word) => {
    //check if the word is a valid word/letter character
    let wordParams = /^([a-z\w])+$/;
    //if so, lets get some words from our API!
    if (wordParams.test(word) && word !== ''){
      axios({
        url: "https://api.datamuse.com/sug",
        responseType: "json",
        method: "GET",
        params: {
          s: word,
        },
      })
      .then(({ data }) => {
      //store the suggestions in an array, and filter that array to only get words (as per our regex)
        const suggestions = data.filter((item) => {
        const singleWord = /^([a-z])+$/;
        //if the words correspond to our cirterias, lets return them and setState for our error message to no longer display
            if (singleWord.test(item.word)) {
            this.setState({
              showError: false
            })
            return item;
            
            }
            console.log(item.word.charAt(0).toUpperCase() + item.word.slice(1))
            // item.word.charAt(0).toUpperCase() + item.word.slice(1)
            return item.word.charAt(0).toUpperCase() + item.word.slice(1);
            //splice to only get 5 word autocompletions
        }).splice(0,5);

        const capitalizedArray = suggestions.map((item) => {
          return {
            word:item.word.charAt(0).toUpperCase() + item.word.slice(1),
            numSyllables:item.numSyllables
          }
        })

        //setState for the suggestions, they will then display on the page
        this.setState({
          suggestions: capitalizedArray,
        });
      })
      } else {
        //if the user query is not a word or letter
        //clear the array and set the errorMsg state to true - to show the error
        this.setState({
          suggestions: [],
          showError: true
        })
      }
    }


  //when suggested word is clicked, this function is called. It gets the syllables number of the clicked word
  getWordInfo = (e) => {
    const word = e.target.dataset.name;
    axios({
      url: "https://api.datamuse.com/words",
      responseType: "json",
      method: "GET",
      params: {
        //this param tells api to pull the words that have similar prononcuation to the query. the first result will be the word itself
        sp: word,
        //this param tells api to include the number of syllables in response
        md: "s",
      },
    }).then(({ data }) => {
      console.log(data[0]);
      //this function updates the state in app.js with the word that user clicked and the number of syllables in that word
      this.props.updateSearchQuery(data[0]);
    });

  };
  
  render() {
    return (
      <section className="Search">
        <form>
          <label className="srOnly" htmlFor="search">
            Input your word
          </label>
          <input
            autoComplete="off"
            type="text"
            id="search"
            placeholder="Enter starting word here"
            onChange={(e) => {
              this.getSuggestions(e.target.value);
            }}
          />
        </form>
        {
          this.state.showError
          ? < Error />
          : ''
        }
        <ul className="suggestedWords">
          {/* displays suggested words (if there are any) as lis */}
          {this.state.suggestions &&
            this.state.suggestions.map((word) => {
              return (
                <li
                  key={word.score}
                  onClick={this.getWordInfo}
                  data-name={word.word}
                >
                  {word.word}
                </li>
              );
            })}
        </ul>
      </section>
    );
  }
}
export default Search;
