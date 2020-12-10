import { Component } from 'react';

class Header extends Component {
    render(){
        return(
            <header>
                <h1>Haikus Ahoy!</h1>
    
                <h2>Knowing The Ropes</h2>
                <button onClick={this.props.toggleModal}>Click here for instructions</button>
    
            </header>
        )
    }
}

export default Header