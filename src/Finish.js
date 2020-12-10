import { Component } from "react";
import firebase from "./firebase";
import Haiku from "./Haiku";

class Finish extends Component {
  saveHaiku = (e) => {
    e.preventDefault();

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
  };

  render() {
    return (
      <div>
        <h1>Finish</h1>
        <Haiku
          line1={this.props.line1}
          line2={this.props.line2}
          line3={this.props.line3}
        />
        <button onClick={this.saveHaiku}>Save haiku</button>
      </div>
    );
  }
}

export default Finish;
