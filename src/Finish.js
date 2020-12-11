import { Component } from "react";
import firebase from "./firebase";
import Haiku from "./Haiku";

class Finish extends Component {
  saveHaiku = () => {
    //create haiku object:
    let haiku = {
      line1:
        this.props.line1 &&
        this.props.line1
          .map((wordObject) => {
            return wordObject.word;
          })
          .join(" "),
      line2:
        this.props.line2 &&
        this.props.line2
          .map((wordObject) => {
            return wordObject.word;
          })
          .join(" "),
      line3:
        this.props.line3 &&
        this.props.line3
          .map((wordObject) => {
            return wordObject.word;
          })
          .join(" "),
    };
    //Make reference to Firebase database
    //Store the database reference in a variable
    const dbRef = firebase.database().ref();
    dbRef.push(haiku);
    //hide the button
    document.querySelector(".save").style.display = 'none';
  };

  render() {
    return (
      <div className="finish">
        <h2>Smooth Sailing! Your haiku is complete.</h2>
        <button className="save" onClick={this.saveHaiku}>Save to Log Book</button>
        <Haiku
          line1={this.props.line1}
          line2={this.props.line2}
          line3={this.props.line3}
        />
        
      </div>
    );
  }
}

export default Finish;
