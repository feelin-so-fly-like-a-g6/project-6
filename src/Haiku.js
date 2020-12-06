import { Component } from 'react';
import axios from 'axios';

// LATEST UPDATE: 
//Trying to figure out how to pass two values in the option value on line 136 (the word AND the numSyllables) so that we can retreive both. The word for the searc (and display of the line) and the numb of syllables so that we can keep count of how many syllable total we have, because we cannot exceed the 5 or 7, AND we must let the user knwo that they have reached the total number

//Make a second API call within the component, passing the word as a parameter.
//For the API call, we need: user word
// This API call will return a list of words that usually follow that word in the English language
// Filter/other method that array of results to get the words with the correct number of syllables (ie if the user inputs a 2 syllable word, we will give them results with <= 3 syllables)

class Haiku extends Component {
    constructor(){
        super();
        this.state = {
            lineCount: 5, //5 or 7 - passed in as prop

            line: '', //to display the full line (user word + selected words)
            userSelect: '', //the word the user selects
            userSelectSyll: null, //num of syllables for the selected words
            totalSylls: null, //Could also be remaining
            results: [], //array of words returns from the API call
        }
    }


    //function to filter the array of results to only get the matching number of syllables
    filterResults = () => {
        //find the number of syllables needed
        const syllsNeeded = this.state.lineCount - this.props.sylls;
        console.log(syllsNeeded);
    
        //filter the array to find the words that have a syllable count that is smaller or equal to syllsNeeded
        const filteredArray = this.state.results.filter((word) => {
            return word.numSyllables <= syllsNeeded
        })

        //setState results with the filtered array
        this.setState({
            results: filteredArray
        })
        console.log(this.state.results);
    }


    //function to get words that normally follw the word that the user has input (or selected)
    getWords= (word) => {
        //API call to get the words that normally follow the word in the user input
        axios({
            url: "https://api.datamuse.com/words",
            responseType: "json",
            method: "GET",
            params: {
                rel_bga: word, //will be prop or userSelect
                md: 's',
            },
        }).then((response)=> {
            this.setState({
                results: response.data
            })
            //call the function to filter the results
            this.filterResults();
        })
    }


    componentDidMount(){
        //API call to get the words that normally follow the word in the user input
        this.getWords(this.props.word);

        this.setState({
            line: this.props.word,
            totalSylls: this.props.sylls
        })
    }


    handleSelect = (input) => {

        console.log(input.target.value);
        this.setState({
            userSelect: input.target.value['word'],
            //HOW TO GET NUMBER OF SYLLABLES
            // userSelectSyll: 
        })
    }


    //When user selects a word
        //call the function to get words + filter
    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            line: `${this.state.line} ${this.state.userSelect}`,
            //not working yet, because we're not getting the value
            totalSylls: this.state.totalSylls + this.state.userSelectSylls
        })

        this.getWords(this.state.userSelect);
        }
    


    render() {
        return(
        <div className="Haiku">

            <h2>Haiku</h2>
                <p>User word: {this.props.word}</p>
                <p>Line 1: {this.state.line} Syllables: {this.state.totalSylls}</p>

                <h3>Word options:</h3>
                
                    <form>

                        <label htmlFor="word">Choose a word:</label>

                        <select 
                            name="wordSelect" 
                            id="word"   
                            onChange={this.handleSelect}
                        > 

                            {   
                            this.state.results.map((word) => {

                                //store word and syllable count in obkject so that we can pass it in as the value
                                // const wordPlusSyll = {'word': `${word.word}`, 'syll':`${word.numSyllables}`}
                                
                                return (
                                    word.word !== '.'
                                    ? <option 
                                        key={word.score} 
                                        // value={wordPlusSyll}
                                        value={word.word}
                                        >
                                            Word:{word.word} (# of syllables: {word.numSyllables})
                                        </option>
                                    : null
                                )   
                            })
                            }
                        </select>

                        <button onClick={this.handleSubmit}>Pick Word</button>
                    </form>
            
            </div>
        )
    }
}

export default Haiku;