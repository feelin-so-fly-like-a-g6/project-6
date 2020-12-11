import { Component } from 'react';
import firebase from './firebase';

class Logbook extends Component {

    componentDidMount(){
        //Display the saved Haikus to the page
        //Make reference to Firebase database
        //Store the database reference in a variable
        const dbref = firebase.database().ref();
        //Obtain the data object from the Firebase using 'value' and the val (Firebase method) and setState to that array
            dbref.on('value', (data) => {
            let dbResult = data.val();
            dbResult = Object.values(dbResult);
            //call the function that sets the state of allHaikus
            this.props.getHaikus(dbResult)
        })
    }

    render(){
        return(

            <section className="logbook">

                <h2>Log Book</h2>
                    
                <ul>
                {

                    this.props.allHaikus.map((haiku) => {
                        return (
                            <li tabIndex="0">
                                <p>{haiku.line1}</p>
                                <p>{haiku.line2}</p>
                                <p>{haiku.line3}</p>
                            </li>
                        )
                    })

                }
                </ul>

            </section>

        )
    }
}

export default Logbook;