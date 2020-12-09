import { Component } from "react";
import "./App.css";
import Header from "./Header";
import Intro from "./Intro";
import Verse from "./Verse";
import Haiku from './Haiku';
import Footer from "./Footer";

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
constructor(){
  super();
  this.state = {
    verseVisible: 0,
    line1: '',
    line2: '',
    line3: ''
    
  }
}

//Function to set the state of the line - will be passed as props to the verse
  updateHaiku = (numberOfLine, lineText) => {
    //storing the line number in a variable
    const line = `line${numberOfLine}`;
    console.log(typeof line);
    this.setState({
        [line]: lineText,
    })
  }

  changeVerseVisible = () => {
    this.state.verseVisible >= 3
      ? this.setState({
        verseVisible: 1,
        })
      : this.setState({
        verseVisible: ++this.state.verseVisible,
      })
  }

  render() {
    return (
      <div className="App">
        

        <main>

          {
            this.state.verseVisible === 0 &&
            <>
              <Intro changeVerseVisible={this.changeVerseVisible} />
              <Header />
            </>
          }

          { 
            this.state.verseVisible > 0 &&
              < Haiku 
                line1={this.state.line1} 
                line2={this.state.line2}
                line3={this.state.line3}
              />
          }
          
          {
            this.state.verseVisible === 1 &&
              <Verse updateHaiku={this.updateHaiku} lineNumber={1} totalNumSyllables={5} changeVerseVisible={this.changeVerseVisible} />
          }

          {
            this.state.verseVisible === 2 &&
              <Verse updateHaiku={this.updateHaiku} lineNumber={2} totalNumSyllables={7} changeVerseVisible={this.changeVerseVisible} />
          }

          {
            this.state.verseVisible === 3 &&
              <Verse updateHaiku={this.updateHaiku} lineNumber={3} totalNumSyllables={5} startAgain = {this.startAgain} />
          }
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
