import React from 'react';
import {render} from 'react-dom';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Quote from './Quote.jsx';

export default class QuoteList extends React.Component{
	constructor(props){
		super(props)
		this.state = {open : false}
	}

	onSubmitName(information){
		console.log("Make PUT request here")
	}


	render(){
		const actions = [
				<FlatButton
				label = "Cancel"
				primary = {true}
				onTouchTap = {this.handleClose}
			/>,
			<FlatButton
				label = "Buy"
				primary = {true}
				onTouchTap = {this.onSubmitName}
			/> 

			]
		console.log(this.props.quotes[0])
		var quoteList = []
		//Have to let scope = to QuoteLIst and not the internal scope within the map function.
		var that = this
		this.props.quotes.map(function(quote){
			quoteList.push(<Quote key = {quote.id} quote = {quote} submitQuote = {that.onSubmitName} />)
		})
		return(
			
			<div>
				<List>
					{quoteList}
				
				</List>
			</div>
			
				
		)
		
	}
}