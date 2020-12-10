import { Component } from "react";
import axios from "axios";

//Make a second API call within the component, passing the word as a parameter.
//For the API call, we need: user word
// This API call will return a list of words that usually follow that word in the English language
// Filter/other method that array of results to get the words with the correct number of syllables (ie if the user inputs a 2 syllable word, we will give them results with <= 3 syllables)

class Compose extends Component {
  constructor() {
    super();
    this.state = {
      remainSylls: null, //remaining syllables for the line - passed as props
      userSelect: {
        word: "", //the word the user selects
        numSyllables: null, //num of syllables for the selected words
      },
      lineInProgress: "", //to display the full line (user word + selected words)
      results: [], //array of words returns from the API call
    };
  }

  //on mount - get words and set state
  componentDidMount() {
    this.calculateFilledSylls();
    //API call to get the words that normally follow the word in the user input
    this.setState(
      {
        lineInProgress:
          // this.props.line.length > 1 ? this.props.line : [this.props.word],
          this.props.line.length > 0
            ? this.props.line
            : [{ word: this.props.word, numSyllables: this.props.sylls }],

        remainSylls:
          this.props.totalSylls -
          (this.props.sylls ? this.props.sylls : this.calculateFilledSylls()),
        userSelect: {
          numSyllables: this.props.sylls,
          word: this.props.word,
        },
        //Puts the user word in Haiku component
      },
      () => {
        this.props.updateHaiku(
          this.props.lineNumber,
          this.state.lineInProgress
        );
        this.getWords(this.state.userSelect.word);
      }
    );
  }

  calculateFilledSylls = () => {
    if (this.props.line.length > 0) {
      const numOfFilledSylls = this.props.line
        .map((wordObj) => {
          return wordObj.numSyllables;
        })
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        });
      console.log(numOfFilledSylls);
      return numOfFilledSylls;
    } else {
      return 0;
    }
  };

  //function to get words that normally follw the word that the user has input (or selected)
  getWords = (word) => {
    //API call to get the words that normally follow the word in the user input
    axios({
      url: "https://api.datamuse.com/words",
      responseType: "json",
      method: "GET",
      params: {
        rel_bga: word,
        md: "s",
      },
    }).then((response) => {
      //call the function to filter the results
      this.filterResults(response.data);
    });
  };

  //function to filter the array of results to only get the matching number of syllables
  filterResults = (array) => {
    //filter the array to find the words that have a syllable count that is smaller or equal to this.state.remainSylls
    const filteredArray = array.filter((word) => {
      return word.numSyllables <= this.state.remainSylls;
    });
    //call the function to randomize the array - this will make sure that our user gets different words every time
    this.randomize(filteredArray);
    //Slice the array to get only 5 results
    const slicedAndFiltered = filteredArray.slice(0, 5);
    //setState results with the filtered array
    this.setState({
      results: slicedAndFiltered,
    });
  };

  //function to randomize the array and only get 5 results
  randomize = (array) => {
    let random = 0;
    let temp = 0;
    for (let i = 1; i < array.length; i++) {
      random = Math.floor(Math.random() * i);
      temp = array[i];
      array[i] = array[random];
      array[random] = temp;
    }
  };

  //handleselect to set that to the word and syllable count
  handleSelect = (e) => {
    //store th number of syllables in a variable (because the path is long!)
    const word = e.target.dataset.word;
    const sylls = e.target.dataset.syll;

    //set state
    this.setState(
      {
        userSelect: {
          word: word,
          numSyllables: sylls,
        },
      },
      //call the handle submit function after the userSelect state has been set
      () => {
        this.handleSubmit(e);
      }
    );
  };

  //When user selects a word
  //call the function to get words + filter
  handleSubmit = (e) => {
    e.preventDefault();

    this.setState(
      {
        lineInProgress: [
          ...this.state.lineInProgress,
          {
            word: this.state.userSelect.word,
            numSyllables: parseInt(this.state.userSelect.numSyllables),
          },
        ],
        remainSylls:
          this.state.remainSylls - this.state.userSelect.numSyllables,
      },
      //Once the lineInProgress state has been set, call the updateJaiku function to display the haiku on the page
      () => {
        if (this.state.remainSylls === 0) {
          this.props.changeVerseVisible();
        }
        this.props.updateHaiku(
          this.props.lineNumber,
          this.state.lineInProgress
        );
      }
    );
    //call the getWords function
    this.getWords(this.state.userSelect.word);
  };

  //function to remove the last word
  removeLastWord = (e) => {
    e.preventDefault();
    
    const newLineInProgress = [...this.state.lineInProgress];
    const deletedWord = newLineInProgress.pop();
    //Set line without last word in the state
    this.setState(
      {
        //remove the last item in line in progress array
        lineInProgress: newLineInProgress,
        remainSylls: this.state.remainSylls + deletedWord.numSyllables,
      },
      () => {
        //if line in prgress empty make verse update -> search appears
        if(!this.state.lineInProgress===[]){
          console.log('line empty')
          this.props.reRenderVerse();
        }
        //update haiku with new line in progress
        this.props.updateHaiku(
          this.props.lineNumber,
          this.state.lineInProgress
        );
        //put the last item in line in progress into userSelect property in the state
        this.setState(
          {
            userSelect: this.state.lineInProgress[
              this.state.lineInProgress.length - 1
            ],
          },
          //call the function that get the usually following words (red buttons)
          () => {
            this.getWords(this.state.userSelect.word);
          }
        );
      }
    );
  };

  //function to remove all the words from the line
  removeEverything = () => {
    this.setState(
      {
        lineInProgress: "",
      },
      () => {
        this.props.updateHaiku(
          this.props.lineNumber,
          this.state.lineInProgress
        );
      }
    );
  };

  render() {
    return (
      <div className="Compose">
        <p>Syllables left: {this.state.remainSylls}</p>

        <h3>Word options:</h3>
        {this.state.remainSylls < 5 && (
          <div className="controls">
            <button className="removeLastWord" onClick={this.removeLastWord}>
              Remove the last word
            </button>

            <button
              className="removeEverything"
              onClick={this.removeEverything}
            >
              Remove everything
            </button>
          </div>
        )}
        {this.state.remainSylls !== 0 ? (
          <form>
            <label htmlFor="word">Choose a word:</label>
            <ul className="wordPicker" name="wordSelect" id="word">
              {this.state.results.map((word) => {
                return word.word !== "." ? (
                  <li
                    className="wordOption"
                    key={word.score}
                    data-syll={word.numSyllables}
                    data-word={word.word}
                    onClick={this.handleSelect}
                  >
                    {word.word}
                  </li>
                ) : null;
              })}
            </ul>
          </form>
        ) : (
          "Line complete"
        )}
        {this.state.remainSylls === 0 && (
          <button onClick={this.props.changeVerseVisible}>
            Go to next line
          </button>
        )}
      </div>
    );
  }
}

export default Compose;
