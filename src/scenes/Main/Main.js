import React, {Component} from 'react';
import {getSearchData, getTableData, resetProcessedData} from "./services/dataService";
import './Main.css';
import Table from "../../components/Table/Table";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      offset: 0,
      moreData: true,
      firstname: '',
      lastname: '',
      email: '',
      agency_name: ''
    };

    this.count = 50;
  }

  componentDidMount() {
    this.loadMoreData();
  }

  loadMoreData = () => {
    const {offset} = this.state;

    const fetchedData = getTableData(offset, this.count);
    if(fetchedData === -1) {
      this.setState({
        moreData: false
      })
    } else {
      const tableData = this.state.tableData.concat(fetchedData);
      const newOffset = offset + this.count;
      this.setState({
        tableData,
        offset: newOffset
      });
    }
  };

  searchData = (inputFor) => {
    const fetchedSearchData = getSearchData(inputFor, this.state[inputFor]);

    this.setState({
      tableData: fetchedSearchData,
      offset: 0
    })
  };

  handleInputChange = (e, inputFor) => {
    const stateCopy = Object.assign({}, this.state);
    stateCopy[inputFor] = e.target.value;
    if(stateCopy.firstname || stateCopy.lastname || stateCopy.email || stateCopy.agency_name ) {
      this.setState({[inputFor]: stateCopy[inputFor]}, () => {
        this.searchData(inputFor);
      });
    } else {
      this.setState({
        offset: 0,
        [inputFor]: '',
        moreData: true,
        tableData: []
      }, () => {
        this.resetData();
      })
    }
  };

  resetData = () => {
    resetProcessedData();
    this.loadMoreData();
  };

  render() {
    const {tableData, moreData, offset} = this.state;
    return (
      <div>
        <div styleName="input-wrapper">
          <input styleName="input-item first" type="text" onChange={(e) => this.handleInputChange(e, 'firstname')}/>
          <input styleName="input-item second" type="text" onChange={(e) => this.handleInputChange(e, 'lastname')}/>
          <input styleName="input-item third" type="text" onChange={(e) => this.handleInputChange(e, 'email')}/>
          <input styleName="input-item fourth" type="text" onChange={(e) => this.handleInputChange(e, 'agency_name')}/>
        </div>

        {/*{*/}
          {/*tableData.length > 0*/}
            {/*? <Table data={tableData} moreData={moreData} loadMoreData={this.loadMoreData} count={this.count} offset={offset} tableWrapperHeight={500}/>*/}
            {/*: <div>Nothing to show here</div>*/}
        {/*}*/}
        <Table data={tableData} moreData={moreData} loadMoreData={this.loadMoreData} count={this.count} offset={offset} tableWrapperHeight={500}/>
      </div>
    );
  }
}

export default Main;