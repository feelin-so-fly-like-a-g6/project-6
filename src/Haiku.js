import { Component } from 'react';

class Haiku extends Component {

    render(){
        return(

            <section>

                <h3>Your Haiku</h3>

                <p>{this.props.line1}</p>
                <p>{this.props.line2}</p>
                <p>{this.props.line3}</p>

                {/* Stretch goal */}
                {/* <button>Save</button> */}

            </section>

        
        )
    }
}

export default Haiku;
