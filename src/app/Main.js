import React, {Component} from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';

import Form from '../components/Form';
import Login from '../components/Login';
import Logged from '../components/Logged';
import DBList from '../components/DBList';
import CRUDPage from '../components/CRUDPage';


var utils 	 = require('../utils/utils');
var apiUtils = require('../utils/apiUtils');

window.muiTheme = getMuiTheme({
	palette: {
		primary1Color: '#2196F3',
    primary2Color: '#42A5F5',
    primary3Color: '#E3F2FD',
	}
});


class Main extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			signedIn: false,
			user: "",
			dbList: [],
			dbSelected: false,
			showToast: false,
			toastMsg: "",
			tables: [],
			uuid: ""
		};
	}

	componentWillMount() {
		gapi.load('auth2', ()=>{
			gapi.auth2.init({
				client_id: '4224424755-roash9temlethr8vge7jvuif54p5phg4.apps.googleusercontent.com'
			}).then(() => {
				this.authInstance = gapi.auth2.getAuthInstance();
				if(this.authInstance.isSignedIn.get()) {
					this.userProps();
				}
			});
		});
	}

	componentWillUnmount() {
		this.signOut();
	}

	userProps = () => {
		var _this = this;
		this.currentUser = this.authInstance.currentUser.get();
		if(this.currentUser.getHostedDomain() === "juspay.in") {
			this.setState({
				signedIn: true,
				user: this.currentUser.getBasicProfile().getName()
			});
			apiUtils
			.fetchList(this.currentUser.getBasicProfile().getEmail())
			.then(function(response) {
				_this.setState({
					dbList: response
				});
			})
			.catch(function(error) {
				console.log(error);
			});
		} else {
			alert("Sorry. You are not authorized! :(");
			this.signOut();
		}
	}

	signOut = () => {
		if(this.authInstance.isSignedIn.get()) {
			this.authInstance.signOut().then(() => {
				this.setState({
					signedIn: false,
					user: ""
				});
			});
		}
	}

	signIn = () => {
		this.authInstance.signIn().then(() => {
			this.userProps();
		});
	}

	submitForm = (data) => {
		data.uuid = utils.guid();

		apiUtils
		.saveToList(data, this.currentUser.getBasicProfile().getEmail());
		this.state.dbList.push(data);
		this.setState({
			dbList: this.state.dbList
		})
	} 	

	deleteCard = (uuid) => {
		apiUtils
		.delInList(uuid, this.currentUser.getBasicProfile().getEmail());
	}

	getDbCardList = () => {
		var list = this.state.dbList || [];
		var cards = [];
		var _this = this;
		list.forEach(function(item, index) {
			cards.push(<DBList key = {index} item = {item} index = {index} delFromList = {_this.deleteCard} openDb = {_this.openDb} />);
		});
		return cards;
	}

	openDb = (uuid) => {
		var _this = this;
		apiUtils
		.openDb(uuid, this.currentUser.getBasicProfile().getEmail())
		.then(function(response) {
			_this.setState({
				dbSelected: true,
				tables: response.data,
				uuid: uuid
			})
		})
		.catch(function(error) {
			if(error.message) error = error.message;
			_this.setState({
	    	showToast: true,
	      toastMsg: (error)?error:"Some error occured"
	    });
		});
	}

	openTable = (tableName, callBack, param) => {
		var _this = this;
		apiUtils
		.openTable(this.state.uuid, tableName, this.currentUser.getBasicProfile().getEmail())
		.then(function(response) {
			callBack(response.data, tableName, param);
		})
		.catch(function(error) {
			if(error.message) error = error.message;
			_this.setState({
	    	showToast: true,
	      toastMsg: (error)?error:"Some error occured"
	    });
		});
	}

	handleToastClose = () => {
    this.setState({
    	showToast: false,
      toastMsg: ""
    });
  };

	render() {
		var dbCardList = this.getDbCardList();
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div 
					style = {{
						height: window.innerHeight,
						minWidth: window.screen.availWidth - 10,
						background: "#f4f4f4",
						overflow: "auto",
						margin: "auto"
					}}>
					
					<AppBar
	          title="CRUD Board"
	          showMenuIconButton={false}
	          iconElementRight={this.state.signedIn ? <Logged signOut={this.signOut}/> : <Login onTouchTap={this.signIn}/>}
	          iconStyleRight = {{
							marginTop: "7px",
							zIndex: "1301"
						}}
						style = {{
							position: "fixed"
						}}
	        />
        	
        	<div
						style = {{
							marginTop: "64px",
							padding: "16px",
							display: (this.state.signedIn && !this.state.dbSelected)?"block":"none",
						}}>
        		
        		<Form 
        			ref = {"form"} 
        			_submit = {this.submitForm}
        		/>

        		<div
							style = {{
								height: "400px",
								width: "1px",
								background: muiTheme.baseTheme.palette.accent1Color,
								display: "inline-block",
								float: "left",
								margin: "0px 16px"
							}}
						/>

						<div>
							<h2>{(this.state.user && this.state.user != "undefined" && this.state.user.trim() != "")?"Hey, " + this.state.user + "!":""}</h2>
							<div
								style = {{
									maxHeight: "500px",
									overflow: "auto"
								}}>
								{dbCardList}
							</div>
						</div>
						
        	</div>

        	<div
        		style = {{
        			display: (this.state.signedIn && this.state.dbSelected)?"block":"none"
						}}>

						<CRUDPage tables = {this.state.tables} openTable = {this.openTable} />

        	</div>

        	<Snackbar
	          open={this.state.showToast}
	          message={this.state.toastMsg}
	          autoHideDuration={4000}
	          onRequestClose={this.handleToastClose}
	        />

				</div> 
			</MuiThemeProvider>
		);
	}
}

export default Main;
