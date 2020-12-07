import { Component } from "react";
import axios from "axios";
class Search extends Component {
  constructor() {
    super();
    this.state = {
      suggestions: "",
    };
  }
  //this function gets suggested words for autocomplete from api
  getSuggestions = (word) => {
    axios({
      url: "https://api.datamuse.com/sug",
      responseType: "json",
      method: "GET",
      params: {
        s: word,
      },
    }).then(({ data }) => {
      //get only first three suggestions
      const suggestions = data.filter((item, index) => {
        if (index < 3) {
          return item;
        }
      });
      //set the suggestions into state
      this.setState({
        suggestions: suggestions,
      });
    });
  };
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
            type="text"
            id="search"
            onChange={(e) => {
              this.getSuggestions(e.target.value);
            }}
          />
        </form>
        <ul>
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
