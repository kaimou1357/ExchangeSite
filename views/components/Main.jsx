import React from 'react';
import {render} from 'react-dom';
import QuoteList from './QuoteList.jsx'
import NewQuote from './NewQuote.jsx'
import Request from 'es6-request'



export default class Main extends React.Component {
  constructor(props){
  	super(props)
  	this.state = {data : []}
  }
 
  refreshQuotes(){
    $.ajax({
        url: "/api/posts",
      success: function(response) {
        this.setState({data : response})
      }.bind(this),
      error: function(xhr) {
        console.log("GET request to retrieve hand failed.")
      }.bind(this)
    });
  }
  componentDidMount(){
    console.log("Main Component Mounted")
  	this.refreshQuotes()
  }

  postQuote(information){
    $.ajax({
      url: "/api/posts",
        type: "POST",
        contentType : "application/json",
        data: JSON.stringify(information),
        success: function(response){
          //handle the response from signup here.

          console.log(response)
        }.bind(this), 
        error:function(xhr){
          console.log("POST request to signup failed")
        }.bind(this)
    });
  }

  render () {
    return (<div>
    	
         <NewQuote onPost = {this.postQuote}/>
			   <QuoteList quotes = {this.state.data} />
    </div>
    );
  }
}