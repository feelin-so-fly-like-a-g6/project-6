import { Component } from 'react';

class Haiku extends Component {

    render(){
        return(

            <section>

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

            </section>

        
        )
    }
}

export default Haiku;
