import React, {Component} from 'react';

import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';

class Relation extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      canShow: false,
      tableData: [],
      tableHeader: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState);
    // console.log(prevProps);  
  }

  setData = (records) => {
    var tableHeader = [];
    if(records.length > 0) {
      tableHeader = Object.keys(records[0]);
    }
    this.setState({
      tableData: records,
      tableHeader: tableHeader
    });
  }

  showTable = () => {
    this.setState({
      canShow: true
    });
  }

  hideTable = () => {
    this.setState({
      canShow: false
    });
  }

  render() {
    return (
      <div
        style = {{
          display: (this.state.canShow)? "inline-block":"none",
          marginTop: "64px",
          paddingLeft: "16px"
        }}>
        <div 
          style = {{
            lineHeight: "56px",
            marginLeft: "256px"
          }}>
          {this.props.tableName}
        </div>
        <div
          style = {{
            display: "inline-block",
            marginLeft: "256px"
          }}
          >
          <table
            width = "100px"
            style = {{
              maxHeight: "500px",
              tableLayout: "fixed",
              tableLayout: "fixed"
            }}
          >
            <thead>
              <tr
                style = {{
                  height: "48px",
                  background: "#e4e4e4"
                }}
              >
                {
                  this.state.tableHeader.map((colName, index) => (
                    <td 
                      width = "100px" 
                      key = {index}
                      style = {{
                        wordWrap: "break-word",
                        textAlign: "center"
                      }}
                    >
                      <div
                        style = {{
                          maxWidth: "80px",
                          wordWrap: "break-word",
                          textAlign: "center"
                        }}>
                        {colName}
                      </div>
                      <NavigationArrowDownward 
                        style = {{
                          width: "20px"
                        }}/>

                    </td>
                  ))
                }
              </tr>
            </thead>
          </table>
        </div>
      </div>
    )
  }
}

export default  Relation;