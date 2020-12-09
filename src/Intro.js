import { Component } from "react";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import './App.css'

class Intro extends Component {




    render() {
        return (
            <div className="Wrapper">
                <div className="Intro">
                    <button className="button title" >Haiku Ahoy!</button>
                
                    <div className="Introduction">
                        <p>A haiku (俳句 high-koo) is a short three-line poem that usually follows a 5-7-5 syllable structure. Haiku poetry was originally developed by Japanese poets, and is often inspired by nature, a moment of beauty, or a poignant experience.</p>
                        <button className="button CreateOwn" onClick={this.props.changeVerseVisible}>Create your own</button>
                        {/* Make an arrow here */}
                    </div>
                </div>
            </div>
        )}
}

export default Intro;