import { Component } from "react";

class Haiku extends Component {

  printLine(lineNumber){
    // checks if the line is empty
    if (this.props[`line${lineNumber}`].length !== 0){
      // checks if the lineNumber is euqal to the active line
      if(lineNumber === this.props.active && this.props.active < 4) {
        // returns the line and excludes the last word by using .slice .length -1
        return this.props[`line${this.props.active}`].slice(0,this.props[`line${this.props.active}`].length-1)
        .map((wordObject) => {
          return wordObject.word;
        })
        .join(" ");
      } else {// prints the whole verse if the line is not the active one
        return this.props[`line${lineNumber}`].map((wordObject) => {
          return wordObject.word;
        })
        .join(" ");
      }
    }
    
  }

  // Prints the last word that was excluded in the printLine function
  lastWord(lineNumber){
    let lineLength = 0;
    // checks that the active line is less than 4
    if (this.props.active < 4){
      // gets the length of the line
      lineLength = this.props[`line${this.props.active}`].length;
    // if the length is not 0, and the line is the active line: print the final word with the class of CurrentWord which has the underline styling in css
      if(this.props[`line${this.props.active}`].length !== 0 && lineNumber === this.props.active) {
        return <span className="CurrentWord">{this.props[`line${this.props.active}`][lineLength-1].word}</span>;
      }
    }
  }





  render() {
    return (
      
      <section className="haiku">
        <h3>Let's write some Haiku</h3>

        <p>
          <span> </span>
          {/* display only the words, not syllables */}
          {this.props.line1 &&
          // printLine: prints the verse and excludes the last word
          // lastWord: prints the last word with the underline
              this.printLine(1)}
              <span> </span>
              {this.lastWord(1)}
        </p>

        <p>
          <span> </span>
          {/* display only the words, not syllables */}
          {this.props.line1 &&
              this.printLine(2)}
              <span> </span>
              {this.lastWord(2)}
        </p>

        <p>
          <span> </span>
          {/* display only the words, not syllables */}
          {this.props.line1 &&
              this.printLine(3)}
              <span> </span>
              {this.lastWord(3)}
        </p>

        {/* If the remaining sylls = 0 AND if line number is 3 */}
        {/* {Condition to make the button appear when the syllables = 17 OR if syls remain = 0 and line3
            ? <button>Save haiku</button>
                //push to dbref
            : ''
            } */}
      </section>
    );
  }
}

export default Haiku;
