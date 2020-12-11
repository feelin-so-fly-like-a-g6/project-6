import { Component } from "react";
import "./App.css";
import Header from "./Header";
import Modal from './Modal'
import Intro from "./Intro";
import Verse from "./Verse";
import Haiku from "./Haiku";
import Logbook from "./Logbook";
import Footer from "./Footer";
import Finish from "./Finish";


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
      verseVisible: 0,
      line1: [],
      line2: [],
      line3: [],
      headerVisible: false,
      modalVisible: false,
      allHaikus: [],
    };
  }

  //Function to set the state of the line - will be passed as props to the verse
  updateHaiku = (numberOfLine, lineText) => {
    //storing the line number in a variable
    const line = `line${numberOfLine}`;
    this.setState({
      [line]: lineText,
    });
  };

  //function to change which verse is being/displayed composed on the page
  changeVerseVisible = () => {
    this.setState({
      verseVisible: ++this.state.verseVisible,
    });
    //also show the header, when the verse is visible
    this.setState({
      headerVisible: true,
    });
  };

  //function to allow the user to move to a previous line, mid composition
  goToPreviousLine = () => {
    const prevVerseVisible = this.state.verseVisible - 1;
    this.setState({
      verseVisible: prevVerseVisible,
    });
  };

  //function to set the sate of allHaikus - aka populate the array from Firebase
  getHaikus = (array) => {
    this.setState({
      allHaikus: array,
    });
  };

  //function to Toggle Modal
  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.verseVisible === 0 && (
          <>
            <Intro changeVerseVisible={this.changeVerseVisible} />
          </>
        )}

        {/* Display only once the user clicks on 'create your own' - which sets the state to true */}
        {this.state.headerVisible 
        ? <Header 
            modalVisible={this.state.modalVisible}
            toggleModal={this.toggleModal}/> 
        : null}

        {/* Display the modal based on the state */}
        {this.state.modalVisible
        ?   < Modal toggleModal={this.toggleModal}/>
        : null
        }
      

        <main>
          

          {this.state.verseVisible === 1 && (
            <Verse
              updateHaiku={this.updateHaiku}
              lineNumber={1}
              line={this.state.line1}
              totalNumSyllables={5}
              changeVerseVisible={this.changeVerseVisible}
            />
          )}

          {this.state.verseVisible === 2 && (
            <Verse
              updateHaiku={this.updateHaiku}
              lineNumber={2}
              line={this.state.line2}
              totalNumSyllables={7}
              changeVerseVisible={this.changeVerseVisible}
              goToPreviousLine={this.goToPreviousLine}
            />
          )}


          {this.state.verseVisible === 3 && (
            <Verse
              updateHaiku={this.updateHaiku}
              lineNumber={3}
              line={this.state.line3}
              totalNumSyllables={5}
              startAgain={this.startAgain}
              changeVerseVisible={this.changeVerseVisible}
              goToPreviousLine={this.goToPreviousLine}
            />
          )}

          {this.state.verseVisible < 4 && this.state.verseVisible > 0 && (
            <Haiku
              line1={this.state.line1}
              line2={this.state.line2}
              line3={this.state.line3}
              active={this.state.verseVisible}
            />
          )}

          {this.state.verseVisible === 4 && (
            <Finish
              line1={this.state.line1}
              line2={this.state.line2}
              line3={this.state.line3}
            />
          )}


          {this.state.verseVisible <= 4 && this.state.verseVisible > 0 && (
            <Logbook
              allHaikus={this.state.allHaikus}
              getHaikus={this.getHaikus}
            />
          )}
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
