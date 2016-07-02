import React from 'react';
import {render} from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


export default class NewQuote extends React.Component{
	constructor(props){
		super(props)
		this.handleOpen = this.handleOpen.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.state = {open: false,  value : 1}
	}

	handleOpen(){
		this.setState({open:true})
	}

	handleClose(){
		this.setState({open:false})
	}

	onSubmit(e){

		var post = {}

		this.props.onPost(post)
		this.handleClose
	}

	handleChange(index, value){
		this.setState({value : value})
	}
	render(){
		const actions = [
			<FlatButton
				label = "Cancel"
				primary = {true}
				onTouchTap = {this.handleClose}
			/>,
			<FlatButton	
				label = "Post Contract"
				primary = {true}
				onTouchTap = {this.onSubmit}
			/>

		]
		return(
			<div>
				<RaisedButton label="New Contract" onTouchTap={this.handleOpen} />
			        <Dialog
			          title="New Contract Form"
			          actions={actions}
			          modal={true}
			          open={this.state.open}>
			           <TextField
			          	hintText = "Name"
			          />

			          <TextField
			          	hintText = "Spread"
			          />

			          <DropDownMenu value = {this.state.value} onChange = {this.handleChange} >
			          	<MenuItem value = {1} primaryText = "In" />
			          	<MenuItem value = {2} primaryText = "Out" />
			          </DropDownMenu>
						
					  <TextField
			          	hintText = "Odds (IN)"
			          />
			          <TextField
			          	hintText = "Odds (OUT)"
			          />

			        </Dialog>
		     </div>

		);		
	}
}