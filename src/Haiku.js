import { Component } from "react";
import axios from "axios";

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
            remainSylls: 5, //Number of Syllables remianing for the line PASS AS PROPS

            userSelect: {
                word: "", //the word the user selects
                numSyllables: null, //num of syllables for the selected words
            },

            lineInProgress: '', //to display the full line (user word + selected words)
            results: [], //array of words returns from the API call
        }
    }


    //on mount - get words and set state
    componentDidMount(){
        //API call to get the words that normally follow the word in the user input
        this.getWords(this.props.word);

        this.setState({
            lineInProgress: this.props.word,
            totalSylls: this.props.sylls
        })
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
            //call the function to filter the results
            this.filterResults(response.data);
        })
    }


    //function to filter the array of results to only get the matching number of syllables
    filterResults = (array) => {
        //find the number of syllables needed
        const syllsNeeded = this.state.remainSylls - this.props.sylls;
        console.log(syllsNeeded);
    
        //filter the array to find the words that have a syllable count that is smaller or equal to syllsNeeded
        const filteredArray = array.filter((word) => {
            return word.numSyllables <= syllsNeeded
        })

        //setState results with the filtered array
        this.setState({
            results: filteredArray
        })
        console.log(this.state.results);
    }


    //handleselect to set that to the word and syllable count
    handleSelect = (input) => {

        this.setState({
            userSelect: {
                word:input.target.value
                //HOW???
                // numSyllables: 
            }
        })
    }


    //When user selects a word
    //call the function to get words + filter
    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            lineInProgress: `${this.state.lineInProgress} ${this.state.userSelect.word}`,
            //not working yet, because we're not getting the value
            // remainSylls: this.state.remainSylls + this.state.userSelectSylls
        })

        this.getWords(this.state.userSelect.word);
        }
    


    render() {
        return(
        <div className="Haiku">

            <h2>Haiku</h2>
                <p>User word: {this.props.word}</p>
                <p>Line 1: {this.state.lineInProgress}</p>
                <p>Syllables left: {this.state.remainSylls}</p>

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

                                //store word and syllable count in object so that we can pass it in as the value
                                // const wordPlusSyll = [word.word, word.numSyllables]
                                
                                return (
                                    word.word !== '.'
                                    ? <option 
                                        key={word.score} 
                                        value={word.word}
                                        // value={wordPlusSyll}
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
