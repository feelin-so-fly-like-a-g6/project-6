import { Component } from 'react';
import firebase from './firebase';

class Haiku extends Component {

    saveHaiku = (e) => {
    e.preventDefault();

    //create haiku object:
    let haiku = {
        line1: this.props.line1.join(" "),
        line2: this.props.line2.join(" "),
        line3: this.props.line3.join(" ")
    }
    //Make reference to Firebase database
    //Store the database reference in a variable
        const dbRef = firebase.database().ref();
        dbRef.push(haiku);
    }

    render(){
        return(

            <section className="haiku">

                <h3>Your Haiku</h3>

                <p>
                    {this.props.line1
                    ? this.props.line1.join(" ")
                    : ''}
                </p>

                <p>
                    {this.props.line2
                    ? this.props.line2.join(" ")
                    : ''}
                </p>

                <p>
                    {this.props.line3
                    ? this.props.line3.join(" ")
                    : ''}
                </p>

            {/* If the remaining sylls = 0 AND if line number is 3 */}
            {/* {Condition to make the button appear when the syllables = 17 OR if syls remain = 0 and line3
            ? <button>Save haiku</button>
                //push to dbref
            : ''
            } */}
            <button onClick={this.saveHaiku}>Save haiku</button>

            </section>

        )
    }
}

export default Haiku;
