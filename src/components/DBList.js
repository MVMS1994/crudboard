import React, {Component} from 'react';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

class DBList extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			deleted: false
		};
	}

	del = (event) => {
		this.setState({
			deleted: true
		});
		this.props.delFromList(this.props.item.uuid);
	}

	open = (event) => {
		this.props.openDb(this.props.item.uuid);
	}

	render() {
		return (
			<div
				style = {{
					display: "inline-block"
				}}>
				<Paper
					style = {{
						margin: "16px",
						overflow: "auto",
						display: (this.state.deleted)?"none":"block"
					}}>
					<AppBar
						showMenuIconButton = {false}
						iconElementRight = {<IconButton><ActionDelete /></IconButton>}
						onRightIconButtonTouchTap = {this.del}
						style = {{
							height: "48px",
							width: "400px",
							cursor: "pointer"
						}}
						titleStyle = {{
							height: "48px",
							lineHeight: "48px",
							userSelect: "none"
						}}
						iconStyleRight = {{
							marginTop: "0px"
						}}
						title = {this.props.item.db}
						onTitleTouchTap = {this.open}
					/>
					<Paper
						style = {{
							background: "#ffffff",
							padding: "16px",
							width: "400px"
						}}>
						<table>
							<tbody>
								<tr><th>DB </th><th>:</th><td>{this.props.item.type}</td></tr>
								<tr><th>HOST </th><th>:</th><td>{this.props.item.url}</td></tr>
								<tr><th>USER </th><th>:</th><td>{this.props.item.user}</td></tr>
							</tbody>
						</table>
					</Paper>
				</Paper>
			</div>
		)
	}
}

export default DBList;