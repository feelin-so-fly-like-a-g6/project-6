import { Component } from "react";

class Haiku extends Component {

 
  //function to highlight the word in progress (or something?)
  highlight = () => {

    const activeArray = this.props[`line${this.props.active}`]


    console.log(activeArray);
    //console.log(activeArray)
    //setState
    // this.setState({
    // })
  }
  // this.props.line{this.props.active}

  componentDidUpdate(){
    this.highlight();
  }



   //Function to set the state of the line - will be passed as props to the verse
  //  updateHaiku = (numberOfLine, lineText) => {
  //   //storing the line number in a variable
  //   const line = `line${numberOfLine}`;
  //   console.log(typeof line);
  //   this.setState({
  //     [line]: lineText,
  //   });
  // };





  render() {
    return (
      <section className="haiku">
        <h3>Let's write some Haiku</h3>

        <p>
          {/* display only the words, not syllables */}
          {this.props.line1 &&
            this.props.line1
              .map((wordObject) => {
                return wordObject.word;
              })
              .join(" ")}
        </p>

        <p>
          {this.props.line2 &&
            this.props.line2
              .map((wordObject) => {
                return wordObject.word;
              })
              .join(" ")}
        </p>

        <p>
          {this.props.line3 &&
            this.props.line3
              .map((wordObject) => {
                return wordObject.word;
              })
              .join(" ")}
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
