import { Component } from 'react';
import { GiShipWheel } from 'react-icons/gi';

class Header extends Component {
    render(){
        return(
            <header>
                <h1>Haikus Ahoy!</h1>
    
                <span className="flexContainer">< GiShipWheel/><h2>Knowing The Ropes</h2></span>

                <button onClick={this.props.toggleModal}>Click here for instructions</button>
    
            </header>
        )
    }
}

export default Header