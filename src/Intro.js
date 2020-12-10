import { Component } from "react";
import './App.css'

class Intro extends Component {

    state = {
        showing: false,
        buttonState: ""
    };

    toggleClick = (e) => {
        let className = "";

        if (!this.state.showing) {className = "moveUp"}

        this.setState({
            showing: !this.state.showing,
            buttonState: className 
        });
    }

    render() {
        return (
            <div className="Wrapper">
                <div className="Intro">
                    <button className={`button title ${this.state.buttonState}`} onClick={this.toggleClick} >Haiku Ahoy!</button>

                    { this.state.showing
                        ? <div className="Introduction" >
                            <article>
                                <p>A haiku (俳句 high-koo) is a short three-line poem that usually follows a 5-7-5 syllable structure. Haiku poetry was originally developed by Japanese poets, and is often inspired by nature, a moment of beauty, or a poignant experience.</p>
                                <h1>How to write Haiku:</h1>
                                <p className="HowTo">Haikus follow a strict form:<br />
                                Three lines, with a 5-7-5 syllable structure. That means the first line will have five syllables, the second line will have seven syllables, and the last line will have five syllables.</p>

                                <h2>Examples of Haikus:</h2>
                                <p className="example">
                                    A winter blanket<br />
                                    covers the Earth in repose<br />
                                    but only a dream
                                </p>
                                <button className="button CreateOwn" onClick={this.props.changeVerseVisible}>Create your own!</button>
                                {/* Make an arrow here */}
                            </article>
                        
                        </div>
                        : null
                        }
                </div>
            </div>
        )}
}

export default Intro;