import React, {Component} from 'react';

import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';

class Form extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			dbName: "",
			dbUrl: "",
			userName: "",
			password: "",
			showPass: false,
			dbType: "Postgres"
		};
	}	

	componentDidMount() {
		this.dbName.focus();
	}

	togglePassword = () => {
		this.setState({
			showPass: !this.state.showPass
		});
		this.dbPassword.focus();	
	}

	submit = () => {
		if(this.state.dbName.trim() == "" || this.state.dbUrl.trim() == "") {
			alert("DB Name and Url can't be empty");
		} else {
			this.props._submit({
				db: this.state.dbName,
				url: this.state.dbUrl,
				user: this.state.userName,
				pass: this.state.password,
				type: this.state.dbType
			});
			this.resetFields();
		}
	}

	resetFields = () => {
		this.setState({
			dbName: "",
			dbUrl: "",
			userName: "",
			password: ""
		});
		this.dbName.focus();
	}

	handleChange = (event) => {
		switch(event.target.name) {
			case "dbName":
				this.setState({
					dbName: event.target.value,
				});
				break;
			case "dbUrl":
				this.setState({
					dbUrl: event.target.value,
				});
				break;
			case "userName":
				this.setState({
					userName: event.target.value,
				});
				break;
			case "password":
				this.setState({
					password: event.target.value,
				});
				break;
			default: 
				console.log(event.target.name);
				break;
		}
	};


	render() {
		return (
			<div
				style = {{
					display: "inline-block",
					float: "left"
				}}>
				<br />
				<font 
					style = {{
						fontSize: "20px",
						textAlign: "center",
						userSelect: "none"
					}}>
					Add a DB
				</font>
				
				<br /><br />
				
				<TextField
					name = "dbName"
					hintText = "DB Name"
					value = {this.state.dbName}
					onChange = {this.handleChange}
					ref = {(me) => {this.dbName = me}}
					style = {{
						width: "332px"
					}}
				/>
				<br />
				<TextField
					name = "dbUrl"
					hintText = "DB Host"
					value = {this.state.dbUrl}
					onChange = {this.handleChange}
					ref = {(me) => {this.dbUrl = me}}
					style = {{
						width: "332px"
					}}
				/>
				<br />
				<TextField
					name = "userName"
					hintText = "User Name"
					value = {this.state.userName}
					onChange = {this.handleChange}
					ref = {(me) => {this.dbUser = me}}
					style = {{
						width: "332px"
					}}
				/>
				<br />
				<TextField
					name = "password"
					hintText = "Password"
					value = {this.state.password}
					onChange = {this.handleChange}
					ref = {(me) => {this.dbPassword = me}}
					type = {(this.state.showPass)?"text":"password"}
					style = {{
						width: "290px",
						float: "left",
						zIndex: "0",
						paddingRight: "40px"
					}}
				/>
				<span
					onClick = {this.togglePassword}
					style = {{
						position: "absolute",
						marginTop: "8px",
						marginLeft: "-32px",
						zIndex: "1",
						float: "right"
					}}>
					<img 
						src={(this.state.showPass)?"../images/hide.svg":"../images/view.svg"} 
						height = "24" 
						width = "24" 
					/>
				</span>

				<br />
				<DropDownMenu
          value={this.state.dbType}
          onChange={(event, index, value) => this.setState({ dbType: value})}
          style={{
          	width: "300px",
          	userSelect: "none"
          }}
          autoWidth={false}>
          <MenuItem value={"MySQL"} primaryText="MySQL" />
          <MenuItem value={"Postgres"} primaryText="Postgres" />
        </DropDownMenu>

				<br /><br /><br />
				<RaisedButton 
					label="Save to List" 
					primary={true} 
					onTouchTap = {this.submit}
				/>
				<FlatButton 
					label="Reset Fields" 
					onTouchTap = {this.resetFields}
					style = {{
						marginLeft: "8px"
					}}
				/>
			</div>
		)
	}
}

export default Form;