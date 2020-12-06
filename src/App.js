import { Component } from "react";
import "./App.css";
import Header from "./Header";
import Search from "./Search";
import Footer from "./Footer";
import Haiku from "./Haiku";

// PSEUDO CODE
// User inputs a first word - we grab that input value
// On change OR on submit: Make an API call to get the number of syllables:
// If the user enters a word that has more than 5 syllables
// Error handling  - if there the word is not a word
// Provide a visual indicator (color)
// setState - word and # of syllables
// Make a second API call within the component, passing the word as a parameter.
// This API call will return a list of words that usually follow that word in the English language
// Filter/other method that array of results to get the words with the correct number of syllables (ie if the user inputs a 2 syllable word, we will give them results with <= 3 syllables)
// Display the results on the page for the user to choose from
// Dave knows what’s up
// User cycles through the options
// Once the user selects the word, the line is then complete OR we make another API call to get the following word.
// Display message (stretch goal - option to save) when the user has completed their haiku

//endpoint: https://api.datamuse.com/words
//Params:
//rel_bga = user input = this.state.word
//md = s - this is from the API, it returns the number of syllables for each result

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: {
        word: "",
        numberOfSylls: "",
      },
    };
  }

  updateSearchQuery = ({ word, numSyllables }) => {
    this.setState({
      searchQuery: {
        word: word,
        numSyllables: numSyllables,
      },
    });
  };
  render() {
    return (
      <div className="App">
        <Header />

        <main>
          <Search updateSearchQuery={this.updateSearchQuery} />
          <Haiku />

          {/* Strech goal: display haikus */}
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
