import { Component } from "react";
import axios from "axios";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      suggestions: "",
    };
  }

  getSuggestions = (word) => {
    axios({
      url: "https://api.datamuse.com/sug",
      responseType: "json",
      method: "GET",
      params: {
        s: word,
      },
    }).then(({ data }) => {
      const suggestions = data.filter((item, index) => {
        if (index < 3) {
          return item;
        }
      });

      this.setState({
        suggestions: suggestions,
      });
    });
  };

  getWordInfo = (e) => {
    const word = e.target.dataset.name;
    axios({
      url: "https://api.datamuse.com/words",
      responseType: "json",
      method: "GET",
      params: {
        sp: word,
        md: "s",
      },
    })
      .then(({ data }) => {
        console.log(data[0]);
        this.props.updateSearchQuery(data[0]);
      })
      .catch(() => {
        console.log("no such word");
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
