import { Component } from "react";

class Haiku extends Component {
  render() {
    return (
      <section>
        <h3>Your Haiku</h3>

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
      </section>
    );
  }
}

export default Haiku;
