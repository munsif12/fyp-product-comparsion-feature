import React from 'react';
import {Modal, Image} from 'react-bootstrap';
import Button from './Button';
import MYResult from '../json/products.json';
import 'bootstrap/dist/css/bootstrap.css';

export default class MyModal extends React.Component{

    constructor(props) {

        super(props);

        this.state = {
            data: MYResult.Products || [],
            selected: [],
            activeFilter: false,
            mfilteredPartNumbers:'',
            mfilteredProductLines:'',
            mfilteredProductImages:''
        };
    }
    
    modalbody(){
        return (
            <div className="row">
            {this.props.body.map(k => 
                <div className="col-12 col-sm-6">    
                    <div className="form-check form-check-inline">   
                        <input className="form-check-input" type="checkbox" 
                        value={k} onChange={this.onSelect.bind(this)}/>
                        <label className="form-check-label" key={k}>{k}</label>
                    </div>
                </div> 
            )}
            </div>
        )
    }

    onSelect(event){
        //console.log("input val --"+event.target.value)
        let modifiedRow;
        if (event.target.checked) {
          modifiedRow = [...this.state.selected, event.target.value];
        } else {
          modifiedRow = this.state.selected.filter(s => s !== event.target.value);
        }
        //console.log("modifiedRow -- "+modifiedRow)
        
        this.setState({ selected: modifiedRow, activeFilter: true });
    }

    onSubmit = () => {
        
        //event.preventDefault();
        this.setState({ selected: [] });
        this.props.handleClose();
       // const data = this.state.data;
        const selectedData = this.state.selected;
        console.log("selectedData -- "+selectedData)
        
        let filterredData = this.state.data.filter(row =>
            selectedData.includes(row.Model)
        );
        this.setState({ data: filterredData });
        // console.log("filterredData -- "+filterredData)
        // console.log("selectedData -- "+selectedData)
         const filteredPartNumbers = filterredData.map(partnumbers =>partnumbers.Model);
         const filteredProductLines = filterredData.map(productlines =>productlines.Battery);
        const filteredProductImages = filterredData.map(productimages =>productimages.url);

        // this.setState({
        //     mfilteredPartNumbers:this.filteredPartNumbers,
        //     mfilteredProductLines:filteredProductLines,
        //     mfilteredProductImages:filteredProductImages
        // })
        console.log("filteredPartNumbers in Modal -- "+filteredPartNumbers)
        this.props.handler(false, selectedData)
        return (
            
            <div>
                <table id="compare-results-table" className="table vertical table-bordered">
                    <tbody>
                        <tr>
                            <th>Model</th>
                            {filteredPartNumbers.map(k => <td key={k}>{k}</td>)}
                        </tr>
                        <tr>
                            <th>Battery</th>
                            {filteredProductLines.map(k => <td key={k}>{k}</td>)}
                        </tr>
                        <tr>
                            <th>Product Image</th>
                            {filteredProductImages.map(k => <td key={k}><Image src={k} /></td>)}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    };

   
    
    render(){
       // console.log("inmodal =="+this.props.allPartNumbers)
        return(
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.modalbody()}
                </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={this.onSubmit.bind(this)} >Submit</button>
                    <Button variant="primary" onClick={this.props.handleClose} text="Reset" />
                </Modal.Footer>
            </Modal>
        )
    }
}