import { Component } from "react";
import axios from "axios";

//Make a second API call within the component, passing the word as a parameter.
//For the API call, we need: user word
// This API call will return a list of words that usually follow that word in the English language
// Filter/other method that array of results to get the words with the correct number of syllables (ie if the user inputs a 2 syllable word, we will give them results with <= 3 syllables)

class Compose extends Component {

    constructor(){
        super();
        this.state = {
            remainSylls: null, //remaining syllables for the line - passed as props
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
            lineInProgress: [this.props.word],
            remainSylls: this.props.totalSylls - this.props.sylls,
            userSelect: {
                numSyllables: this.props.sylls
            }
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
        //filter the array to find the words that have a syllable count that is smaller or equal to this.state.remainSylls
        const filteredArray = array.filter((word) => {
            return word.numSyllables <= this.state.remainSylls
        })

        //call the function to randomize the array - this will make sure that our user gets different words every time
        this.randomize(filteredArray);

        //Slice the array to get only 5 results
        const slicedAndFiltered = filteredArray.slice(0,5);
        console.log(slicedAndFiltered);

        //setState results with the filtered array
        this.setState({
            results: slicedAndFiltered
        })
        console.log(this.state.results);
    }


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
    }


    //handleselect to set that to the word and syllable count
    handleSelect = (input) => {
        //store th number of syllables in a variable (because the path is long!)
        const sylls = parseInt(input.target.options[input.target.selectedIndex].dataset.syll)
        //set state
        this.setState({
            userSelect: {
                word:input.target.value,
                numSyllables: sylls
            }
        })
    }

    handleSelect = (input) => {
        //store th number of syllables in a variable (because the path is long!)
        const sylls = parseInt(input.target.ul[input.target.li].dataset.syll)
        //set state
        this.setState({
            userSelect: {
                word: input.target.value,
                numSyllables: sylls
            }
        })
    }


    //When user selects a word
    //call the function to get words + filter
    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            lineInProgress: 
                [...this.state.lineInProgress, this.state.userSelect.word],
            remainSylls: 
                this.state.remainSylls - this.state.userSelect.numSyllables
        })

        this.getWords(this.state.userSelect.word);
    }
    

    //function to remove the last word
    removeLastWord = () => {
        const newLineInProgress = [...this.state.lineInProgress];
            newLineInProgress.pop();
            this.setState({
                lineInProgress: newLineInProgress,
            });
    };


    //function to clear the form
    removeEverything = () => {
        this.setState({
            lineInProgress: "",
        });
    };



    render() {
        console.log(typeof this.state.lineInProgress)

        return(
        <div className="Compose">

            <h2>Haiku</h2>
                <p>User word: {this.props.word}</p>
                <p>Line 1: {this.state.lineInProgress && this.state.lineInProgress.join(' ')}</p>
                <p>Syllables left: {this.state.remainSylls}</p>

                <h3>Word options:</h3>

                { this.state.remainSylls !== 0

                ?   <form>

                        <div className="controls">

                            <button 
                                className="removeLastWord" 
                                onClick={this.removeLastWord}
                            >
                            Remove the last word
                            </button>

                            <button 
                                className="removeEverything" onClick={this.removeEverything}
                            >
                            Remove everything
                            </button>
                        </div>

                        <label htmlFor="word">Choose a word:</label>

                        <select 
                            name="wordSelect" 
                            id="word"   
                            onChange={this.handleSelect}
                        > 

                        {   
                            this.state.results.map((word) => {
                            
                                return (
                                    word.word !== '.'

                                ?   <option 
                                        key={word.score} 
                                        value={word.word}
                                        data-syll={word.numSyllables}
                                    >
                                        Word:{word.word} (# of syllables: {word.numSyllables})
                                    </option>

                                :   null
                                )   
                            })
                        }

                        </select>

                        <button onClick={this.handleSubmit}>Pick Word</button>

                    </form>

                : 'Line complete'

                }
            
            </div>
        )
    }

}

export default Compose;
