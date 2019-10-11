import React, { Component } from 'react';
import { connect } from 'react-redux';
// import logo from './logo.svg';
// import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { getAllItems } from '../../actions/items';

const sideBarDef = {
  toolPanels: [{
    id: 'columns',
    labelDefault: 'Columns',
    labelKey: 'columns',
    iconKey: 'columns',
    toolPanel: 'agColumnsToolPanel',
    toolPanelParams: {
      suppressPivots: true,
      suppressPivotMode: true,
      suppressValues: true
    }
  }, {
    id: "filters",
    labelDefault: "Filters",
    labelKey: "filters",
    iconKey: "filter",
    toolPanel: "agFiltersToolPanel"
  }]
};

let columnDefinitions = [
  {
    headerName: "Name",
    field: "name",
    width: 150,
  },
  {
    headerName: "Price",
    field: "price",
    width: 100,
    cellRenderer: ({ value }) => {
      if (value) {
        return `$${value}`;
      }
    }    
  },
  {
    headerName: "Details",
    field: "details",
    width: 200,
  },
  {
    headerName: "Image",
    field: "image",
    width: 200,
  },
  {
    headerName: "Creation Date",
    field: "created",
    width: 300,
  }
];

class AllItems extends Component {
  
  componentWillMount = () => {
    this.props.getAllItems();
  }

  render() {
    return (
      <div>
        <h1 style={{textAlign:"center",fontSize:70}}>Menu Items</h1>
        <div 
          className="ag-theme-balham"
          style={{ 
            height: '90vh', 
            width: '100vw' }} 
            >
          <AgGridReact
            columnDefs={columnDefinitions}
            rowData={this.props.items}
            reactNext={true}
            rowSelection='multiple'
            deltaRowDataMode={true}
            animateRows={true}
            rowHeight={30}
            getRowNodeId={({ _id }) => _id}
            pagination={false}
            suppressRowClickSelection={true}
            suppressPaginationPanel={true}
            suppressScrollOnNewData={true}
            sideBar={sideBarDef}
            />
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  getAllItems: () => dispatch( getAllItems())
})

const mapStateToProps = (state) => ({
   items : state.item.items
})
export default connect(mapStateToProps , mapDispatchToProps)(AllItems) ;  