import React from 'react';
import {render} from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


export default class Quote extends React.Component{
	constructor(props){
		super(props)
		this.state = {open:false, value : 1, name : ''}
		this.openDialog = this.openDialog.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}

	openDialog(e){
		this.setState({open: true})
	}

	handleClose(){
		this.setState({open:false})
	}

	onNameChange(e){
		this.setState({name: e.value})
	}

	onSubmit(){
		this.props.submitQuote({"name" : this.state.name})
		this.setState({open:false})
	}

	
	render(){
		var that = this
		const actions = [
			<FlatButton
				label = "Cancel"
				primary = {true}
				onTouchTap = {this.handleClose}
			/>,
			<FlatButton	
				label = "Post Contract"
				primary = {true}
				onTouchTap = {that.onSubmit}
			/>

		]
		var quote = this.props.quote
		var contentString = "Spread : " + quote.spread + " Inside: " + quote.inside_party + " Outside: " + quote.outside_party + " Odds In: " + quote.odds_in + " Odds Out : " + quote.odds_out
		return(
			<div>
				<ListItem
				 key= {quote.id}
            	 primaryText={contentString}
            	 onTouchTap = {this.openDialog}
            	 
            	/>
            	<Dialog
			          title="Buy Contract"
			          actions={actions}
			          modal={true}
			          open={this.state.open}>

			          <TextField
			          	hintText = "Name"
			          	
			          />


			    </Dialog>
			</div>

			

		);		
	}
}