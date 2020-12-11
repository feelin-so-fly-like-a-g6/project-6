import { Component } from "react";
import { GrClose } from 'react-icons/gr';
import { GiShipWheel } from 'react-icons/gi';

class Modal extends Component {

    render() {
        return (

            <section className="modal">

                <div>
                    <span className="flexContainer">< GiShipWheel /><h2>Knowing The Ropes</h2></span>

                    <button onClick={this.props.toggleModal}>< GrClose /></button>

                    <p>Welcome to Haiku Ahoy, Mate!</p>

                    <h3>Starting word:</h3>
                    <ul>
                        <li>Step 1: Start entering letters into the text box.</li>
                        <li>Step 2: Five autocomplete words will be displayed on the page - keep entering letters until you get the desired word.</li>
                        <li>Step 3: Click on a word to select it as your starting word for the verse</li>
                    </ul>

                    <h3>Following words:</h3>
                    <ul>
                        <li>Step 4: Once you have selected your first word by clicking on it    the app will generate a list of 5 words that often follow that word.</ li>
                        <li>Step 5: Click on a word to add it to the end of your verse.</li>
                        <li>Step 6: The app will generate new words until you have reached the  appropriate number of syllables for that verse (5 - 7 - 5).</li>
                    </ul>

                    <h3>Going back:</h3>
                    <ul>
                        <li>If you want to change your haiku in progress, click on the “go to   previous line” button. You will then be able to remove words and  obtain new suggestions. </li>
                    </ul>

                    <h3>Clear line:</h3>
                    <ul>
                        <li>Clicking on the “clear line” button will clear your line in progress!</li>
                    </ul>

                    <p>Once you have finished your haiku, you may save it to the log book for other guests to read.</p>

                    <p>Are you ready to set sail?</p></div>

            </section>

        )
    }
}

export default Modal;

