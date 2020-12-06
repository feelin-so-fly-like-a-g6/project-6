import { Component } from 'react';
import axios from 'axios';

class Search extends Component {

  getWordInfo =(word)=> {
    axios({
      url: "https://api.datamuse.com/words",
      responseType: "json",
      method: "GET",
      params: {
        rel_bga:word,
        
      },
    }).then((response)=> {
      console.log(response);
    })
  }

  render(){
    return(
      <section className="Search">
        <form>
          <label className="srOnly" htmlFor="search">Input your word</label>
          <input type="text" id="search" onChange={(e)=>{this.getWordInfo(e.target.value)}}/>
        </form>
      </section>
    )
  }
}

export default Search;