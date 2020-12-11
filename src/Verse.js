import { Component } from "react";
import Compose from "./Compose";
import Search from "./Search";

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
    
    word = word.charAt(0).toUpperCase() + word.slice(1);


    this.setState({
      searchQuery: {
        word: word,
        numSyllables: numSyllables,
      },
    });
  };

  reRender = () => {
    this.forrceUpdate()
  }

  render() {
    return (
      <div className="verse">
        {/* Repeat search + haiku 3x (once for each line) */}
        {this.props.line.length > 0 || this.state.searchQuery.word ? (
          <Compose
            updateHaiku={this.props.updateHaiku}
            word={this.state.searchQuery.word}
            sylls={this.state.searchQuery.numSyllables}
            totalSylls={5}
            lineNumber={this.props.lineNumber}
            line={this.props.line}
            changeVerseVisible={this.props.changeVerseVisible}
            getHaikus={this.props.getHaikus}
            reRenderVerse = {this.reRender}
          />
        ) : (
          // ((!this.props.line) || (this.props.line === [])) && (
            <Search updateSearchQuery={this.updateSearchQuery} />
          )
        }

        {(this.props.lineNumber === 2 || this.props.lineNumber === 3) && (
          <button onClick={this.props.goToPreviousLine}>
            Go to previous line
          </button>
        )}
      </div>
    );
  }
}

export default Verse;
