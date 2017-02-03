import React, {Component} from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import Relation from './Relation';

class CRUDPage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			
		};
		this.cachedList = {};
		this.showingTable = null;
	}

	callBack = (records, tableName, shouldOpen) => {
		this.cachedList[tableName] = true;
		this["relation_" + tableName].setData(records);	
		if(shouldOpen) {
			if(this.showingTable && this.showingTable != tableName) {
				this["relation_" + this.showingTable].hideTable();
			}
			this.showingTable = tableName;
			this["relation_" + tableName].showTable();
		}
	}

	handleClicked = (event) => {
		var tableName = event.target.innerHTML;
		if(!this.cachedList[tableName]) {
			this.props.openTable(tableName, this.callBack, true);
		} else {
			if(this.showingTable && this.showingTable != tableName) {
				this["relation_" + this.showingTable].hideTable();
			}
			if(this.showingTable != tableName) {
				this["relation_" + tableName].showTable();
			}
			this.showingTable = tableName;
		}
	}

	getTableList = () => {
		var _this = this;
		return this.props.tables.map(function(item, index) {
			return (<MenuItem key = {index} onTouchTap = {_this.handleClicked} primaryText = {item} />)	
		});
	}

	getRelationList = () => {
		var _this = this;
		return this.props.tables.map(function(item, index) {
			return (<Relation key = {index} ref = {(me) => _this["relation_" + item] = me} tableName = {item} />)
		})
	}

	render() {
		var tableList = this.getTableList();
		var relationList = this.getRelationList();

		return (
			<div>
				<Drawer 
					open = {true}
					containerStyle = {{
						top: "auto",
						zIndex: "1099",
						marginTop: "64px",
						position: "fixed"
					}}>
					{tableList}
        </Drawer>
        {relationList}
			</div>
		);
	}
}

export default CRUDPage;