import { Component } from 'react';
import Haiku from './Haiku';
import Search from './Search';

class Verse extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: {
        word: "",
        numSyllables: "",
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

  render(){
    return(
      <div className="verse">
        {/* Repeat search + haiku 3x (once for each line) */}
          <Search updateSearchQuery={this.updateSearchQuery} />

          {
            this.state.searchQuery.word
            ? <Haiku 
            word={this.state.searchQuery.word}
            sylls={this.state.searchQuery.numSyllables}
            />
            : '' //We can move search here so that when there is no word in state, the search bar shows, and when there is a word, the haiku shows
          }
          {/* Strech goal: display haikus */}
      </div>
    )
  }
}

export default Verse;