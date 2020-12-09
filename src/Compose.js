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
        //Puts the user word in Haiku component
        },()=>{this.props.updateHaiku(this.props.lineNumber, this.state.lineInProgress.join(" "))})
    }

    //function to get words that normally follw the word that the user has input (or selected)
    getWords= (word) => {
        //API call to get the words that normally follow the word in the user input
        axios({
            url: "https://api.datamuse.com/words",
            responseType: "json",
            method: "GET",
            params: {
                rel_bga: word, 
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
        //setState results with the filtered array
        this.setState({
            results: slicedAndFiltered
        })
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
    handleSelect = (e) => {
        //store th number of syllables in a variable (because the path is long!)
        const sylls = parseInt(e.target.options[e.target.selectedIndex].dataset.syll)
        //set state
        this.setState({
            userSelect: {
                word:e.target.value,
                numSyllables: sylls
            }
        },
        //call the handle submit function after the userSelect state has been set
        ()=>{
            this.handleSubmit(e);
            }
        )
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
        },
        //Once the lineInProgress state has been set, call the updateJaiku function to display the haiku on the page
        ()=>{this.props.updateHaiku(this.props.lineNumber, this.state.lineInProgress.join(" "))})
        //call the getWords function
        this.getWords(this.state.userSelect.word);
    }

    //function to remove the last word
    removeLastWord = () => {
        const newLineInProgress = [...this.state.lineInProgress];
            newLineInProgress.pop();
            //Set line without last word in the state
            this.setState({
                lineInProgress: newLineInProgress,
            });
    };

    //function to remove all the words from the line
    removeEverything = () => {
        this.setState({
            lineInProgress: "",
        });
    };

    render() {
        return(
        <div className="Compose">

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
                            onChange={(e)=>{
                                this.handleSelect(e);
                            }}
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
                        
                    </form>
                : 'Line complete'
                }
                {
                    this.state.remainSylls === 0 &&
                        <button onClick={this.props.changeVerseVisible}>Go to next line</button>
                }
            </div>
        )
    }

}

export default Compose;

