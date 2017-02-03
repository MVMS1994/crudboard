import React, {Component} from 'react';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


class Logged extends Component {
	static muiName = 'IconMenu';

	render() {
		return (
		  <IconMenu
		  	iconStyle = {{ color: "#ffffff" }}
		    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
		    targetOrigin={{horizontal: 'right', vertical: 'top'}}
		    anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
		    <MenuItem onTouchTap={this.props.signOut} primaryText="Sign out" />
		  </IconMenu>
	  );
	}
}

export default Logged;