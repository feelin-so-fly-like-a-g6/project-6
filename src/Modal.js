import { Component } from "react";

class Modal extends Component {

    render() {
        return(

        <section className="modal">

        <h2>Knowing The Ropes</h2>

        <p>Welcome to Haiku Ahoy, Sailor!</p>

        <p>
        
        Instructions HERE

        </p>
        
        <p>Are you ready to set sail?</p>

        <button onClick={this.props.toggleModal}>Close</button>

        </section>

        )
    }
}

export default Modal;

