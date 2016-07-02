import React from 'react';
import {render} from 'react-dom';
import Main from './components/Main.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

injectTapEventPlugin();

class App extends React.Component{
	render(){
		return <Main />
	}
}


render(<MuiThemeProvider
    		muiTheme = {getMuiTheme(lightBaseTheme)}>
         		<Main/>
    	</MuiThemeProvider>, document.getElementById('app'));