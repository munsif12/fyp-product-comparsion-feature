import React from 'react';
import MYResult from '../json/products.json';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from './Button';
import MyModal from './MyModal';
import '../css/mystyles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Image } from 'react-bootstrap';
import 'react-modal-video/scss/modal-video.scss';
import ModalVideo from 'react-modal-video'

class Container extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      data: MYResult.Products || [],
      actualData: MYResult.Products || [],
      columns: MYResult.ParametricList_Attributes || [],
      filterAttributes: MYResult.ParametricList_Filter_Attributes,
      isCompareClicked: false,
      isDisabled: true,
      selected: [],
      activeFilter: false,
      checkboxInputValue: '',
      modalBody: '',
      nonmodal: true,
      selectedRadio: null,
      isOpen: false,
      currentVideoId: ''
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handler = this.handler.bind(this)
    this.openModal = this.openModal.bind(this)
    this.radioRef = React.createRef();
    this.updateVideoId = this.updateVideoId.bind(this)
  }

  handler(val, mselectedData) {
    //console.log("mselectedData --"+mselectedData)

    this.setState({
      nonmodal: val,
      selected: mselectedData
    })
    //console.log("nonmodal --"+this.state.nonmodal)
    console.log("selectedData in container --" + mselectedData)
    const selectedData = mselectedData;
    const data = this.state.data;
    const checkboxval = this.state.checkboxInputValue;
    let filterredData;
    //console.log("this.state.checkboxInputValue -"+this.state.checkboxInputValue)
    if (checkboxval === "Model") {
      filterredData = data.filter(row =>
        selectedData.includes(row.Model)
      );
    } else if (checkboxval === "Battery") {
      filterredData = data.filter(row =>
        selectedData.includes(row.Battery)
      );
    }

    console.log("filterredData in container --" + filterredData)
    this.setState({ data: filterredData });
    console.log("data in container --" + this.state.data)
  }


  handleClose() {
    this.setState({ show: false });
    this.onClearClick()
  }

  handleShow(event) {
    this.setState({ show: true, checkboxInputValue: event.target.value });
    this.onClearClick()
  }

  changeView() {
    this.setState({ view: 'modal-based' })
  }

  updateVideoId(currentVideoId) {
    this.setState({ currentVideoId })
    this.openModal()
  }

  componentDidMount() {

    const radio = (column, colIndex) => {
      //console.log(colIndex)
      //console.log("column text "+column.text)
      if ("Model" === column.text || "Battery" === column.text) {

        return (
          <div>
            {column.text}
            <span><input type="radio" name="parametricfilter"
              value={column.text} ref={this.radioRef}
              onClick={this.handleShow} onChange={this.radioSelect.bind(this, column.text)} /></span>
          </div>
        );
      } else {
        return <div>{column.text}  </div>
      }

    }
    const newColumn = this.state.columns.map((column) => {
      //console.log("column --"+column.text)
      return { ...column, headerFormatter: radio }
    });
    //console.log("newColumn --"+newColumn)
    this.setState({ columns: newColumn });

    const filterAttrs = this.state.filterAttributes.map(attr => {
      return Object.values(attr)
    });
    this.setState({ filterAttributes: filterAttrs });
  }

  radioSelect = (id) => {
    console.log("id -- " + id)
    this.setState({ selectedRadio: id });
  }

  onSelectClick = (row, isSelect) => {
    let modifiedRow;
    if (isSelect) {
      console.log("inside if " + this.state.selected)
      modifiedRow = [...this.state.selected, row.Model];
    } else {
      console.log("inside else " + this.state.selected)
      modifiedRow = this.state.selected.filter(s => s !== row.Model);
    }
    //console.log("modifiedRow -- "+modifiedRow)
    this.setState({ isCompareClicked: true, selected: modifiedRow });
    if (modifiedRow.length < 2) {
      this.setState({ isDisabled: true })
    } else {
      this.setState({ isDisabled: false })
    }
  };

  onButtonClick = () => {
    const data = this.state.data;
    const selectedData = this.state.selected;
    //console.log("selectedData -- "+selectedData)
    let filterredData = data.filter(row =>
      selectedData.includes(row.Model)
    );
    this.setState({ data: filterredData, activeFilter: true });
    //console.log("filterredData -- "+filterredData)
    //console.log("data -- "+this.state.data)
  };

  onSelectAll = (isSelect, rows) => {
    //console.log("rows --- "+rows);
    //console.log("isSelect --- "+isSelect);
    let newRows = isSelect ? rows.map(row => row.Model) : [];
    this.setState({ selected: newRows });

    if (isSelect) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }

  };

  onClearClick = () => {
    this.setState(state => ({
      data: state.actualData, selected: [],
      isDisabled: true, activeFilter: false
    }));
    this.setState({ selectedRadio: null });
    console.log("clear selectedRadio - " + this.state.selectedRadio)
  };

  openModal() {
    this.setState({ isOpen: true })
  }

  fullList() {
    var selectRowProp = {
      mode: "checkbox",
      clickToSelect: true,
      selected: this.state.selected,
      onSelect: this.onSelectClick,
      onSelectAll: this.onSelectAll
    };
    return (
      <BootstrapTable striped hover
        keyField="Model"
        selectRow={selectRowProp}
        data={this.state.data}
        columns={this.state.columns} headerClasses="header-class"
      />
    )
  }

  compareView() {
    //const filters = [...this.state.filterAttributes]
    const filteredModel = this.state.data.map(partnumbers => partnumbers.Model);
    const filteredBattery = this.state.data.map(productlines => productlines.Battery);
    const filteredScreen = this.state.data.map(productimages => productimages.Screen);
    const filteredResolution = this.state.data.map(productimages => productimages.Resolution);
    const filteredMemory = this.state.data.map(productimages => productimages.Memory);
    const filteredConnectivity = this.state.data.map(productimages => productimages.Connectivity);
    const filteredSensors = this.state.data.map(productimages => productimages.Sensors);
    const filteredTracking = this.state.data.map(productimages => productimages.Tracking);
    const filteredNotifications = this.state.data.map(productimages => productimages.Notifications);
    const filteredWaterResistance = this.state.data.map(productimages => productimages.WaterResistance);
    const filteredPrice = this.state.data.map(productimages => productimages.Price);
    const filteredProductImages = this.state.data.map(productimages => productimages.url);
    const filteredProductVideoId = this.state.data.map(productimages => productimages.videoId);
    //console.log("filteredProductVideoId --"+filteredPartNumbers )
    // console.log("filteredProductLines --"+filteredProductLines )


    return (
      <div>
        <table id="compare-results-table" className="table vertical table-bordered table-striped">
          <tbody>
            <tr>
              <th>Model</th>
              {filteredModel.map(k => <td key={k}>{k}</td>)}
            </tr>
            <tr>
              <th>Battery</th>
              {filteredBattery.map(k => <td key={k}>{k}</td>)}
            </tr>
            <tr>
              <th>Screen</th>
              {filteredScreen.map(k => <td key={k}>{k}</td>)}
            </tr>
            <tr>
              <th>Resolution</th>
              {filteredResolution.map(k => <td key={k}>{k}</td>)}
            </tr>
            <tr>
              <th>Memory</th>
              {filteredMemory.map(k => <td key={k}>{k}</td>)}
            </tr>
            <tr>
              <th>Connectivity</th>
              {filteredConnectivity.map(k => <td key={k}>{k}</td>)}
            </tr>
            <tr>
              <th>Sensors</th>
              {filteredSensors.map(k => <td key={k}>{k}</td>)}
            </tr>
            <tr>
              <th>Tracking</th>
              {filteredTracking.map(k => <td key={k}>{k}</td>)}
            </tr>
            <tr>
              <th>Notifications</th>
              {filteredNotifications.map(k => <td key={k}>{k}</td>)}
            </tr>
            <tr>
              <th>WaterResistance</th>
              {filteredWaterResistance.map(k => <td key={k}>{k}</td>)}
            </tr>
            <tr>
              <th>Price</th>
              {filteredPrice.map(k => <td key={k}>{k}</td>)}
            </tr>
            <tr>
              <th>Images</th>
              {filteredProductImages.map(k => <td key={k}><Image src={k} /></td>)}
            </tr>
            <tr>
              <th></th>
              {filteredProductVideoId.map(k =>
                <td key={k}>
                  <button onClick={() => { this.updateVideoId(k) }}>Watch Video</button>
                </td>)}
              <ModalVideo channel='youtube' isOpen={this.state.isOpen}
                videoId={this.state.currentVideoId}
                onClose={() => this.setState({ isOpen: false })} />
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  view() {
    console.log(this.state.nonmodal)
    //if(this.state.nonmodal)
    return !this.state.activeFilter ? this.fullList() : this.compareView()
  }



  render() {
    //console.log(this.state);
    const allPartNumbers = this.state.data.map(partnumbers => partnumbers.Model);
    const allProductLines = this.state.data.map(productlines => productlines.Battery);

    var btnstyle = { marginRight: '10px', outline: '2px solid #C8E6C9 !important' }
    //console.log("somevar -- "+this.state.someVar)
    return (
      <div>
        <Button onClick={this.onButtonClick} text="Compare"
          isDisabled={this.state.isDisabled} style={btnstyle} />
        <Button onClick={this.onClearClick} text="Clear" />
        <br />
        <br />
        {this.view()}
        <br />
        <MyModal show={this.state.show} handleClose={this.handleClose}
          body={this.state.checkboxInputValue === "Model" ? allPartNumbers : allProductLines}
          title={this.state.checkboxInputValue} submit={this.onButtonClick} handler={this.handler} />
      </div>
    );
  }

}

export default Container;