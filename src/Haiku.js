import { Component } from 'react';

class Haiku extends Component {
  render() {
    return(
      <div className="Haiku">
        <h2>Haiku</h2>
        <input id="typedWord" type="text"/>
        <label htmlFor="typedWord"></label>
      </div>
    )
  }
}

export default Haiku;