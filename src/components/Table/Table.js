import React, {Component} from 'react';
import "./Table.css";
import {getTableData} from "../../scenes/Main/services/dataService";

export default class Table extends Component {

  constructor(props) {
    super(props);
    }

  componentDidUpdate() {
    if(this.props.data.length > 0 ) {
      this.renderedRowHeight = document.getElementById("table").children[0].offsetHeight;
      this.numberOfItemPerView = this.props.tableWrapperHeight/this.renderedRowHeight;
    }
  }

  onScroll = (e) => {
    //console.log(e.target.scrollTop);
    const {count, offset} = this.props;
    const fetchAfterScroll = (count + offset - 50 - (2 * (this.numberOfItemPerView))) * this.renderedRowHeight;
    if(e.target.scrollTop >= fetchAfterScroll) {
      this.props.loadMoreData();
    }
    // if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight) &&
    //   this.props.moreData) {
    //   this.props.loadMoreData();
    // }
  };

  getTableJSX = (data) => {
    return data.map((item, idx) => {
      return (
        <div key={idx} styleName="table-row">
          <div styleName="table-column first">{item.firstname}</div>
          <div styleName="table-column second">{item.lastname}</div>
          <div styleName="table-column third">{item.email}</div>
          <div styleName="table-column fourth">{item.agency_name}</div>
        </div>
      )
    })
  };

  render() {
    const {data, tableWrapperHeight} = this.props;

    return (
      <div styleName="table-wrapper" onScroll={this.onScroll} style={{height: tableWrapperHeight}}>
        <div styleName="table-container" id="table">
          {data.length > 0
            ? this.getTableJSX(data)
            : <div styleName="empty-state">Nothing to show here</div>
          }
        </div>
      </div>
    )
  }

};