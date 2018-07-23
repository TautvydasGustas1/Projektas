import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import autoBind from 'react-autobind';
import Autocomplete from 'react-autocomplete';
import { BrowserRouter } from 'react-router-dom';



/*import {Form} from './Forms';*/

export class OrderNo extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', name: 'order_no'};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      
        <label>
          Order Number
          <div>
          <input className="form-control" type="text" name={this.state.name} value={this.state.value} onChange={this.handleChange} />
          </div>
        </label>
    );
  }
}


/*ReactDOM.render(
  <OrderNo />,
  document.getElementById('orderNO')
);*/


export class StatusForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '0'};

    autoBind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});


  }


  render() {
    return (
        <label>
          Status
          <select className="form-control" value={this.state.value} onChange={this.handleChange} name="status">
            <option value="0">0 - Not sent</option>
            <option value="1">1 - Sent current to open</option>
            <option value="2">2 - Closed</option>
          </select>
        </label>
    );
  }
}

/*ReactDOM.render(
  <StatusForm />,
  document.getElementById('status')
);*/


class List extends Component {
  constructor(props){
    super(props);


    this.state = {
      input: "",
      suppliers: [],
    }

  }

  render(){

    let filterSearch = this.state.suppliers.filter(word => {
      if(word.indexOf(this.state.input)!==-1){
        return true;
      }
          });

    return(
         <div>
        <SupplierForm list={filterSearch} input={this.state.input} handleChange={this.handleChange} />
        </div>
      )
  }
}


export class SupplierForm extends Component {
constructor(props){
    super(props);

    this.state={
      input: "",
      suppliers: [],
    }

 autoBind(this);
  }

componentDidMount() {
     axios.get('/orders/api').then(response => {
 
         this.setState({

           suppliers: response.data
         });

     }).catch(errors => {

       console.log(errors);
     })

     }

 
  handleChange(event) {
    this.setState({
        input: event.target.value

    });
  }
render (){

let filterSearch = this.state.suppliers.filter(word => { 
      if(word.title.toLowerCase().indexOf(this.state.input.toLowerCase())!==-1){
        return true;
      }
          });

  return(
    <div> 

    <input value={this.state.input} onChange={this.handleChange} />
      <ul>
        {filterSearch.map((item, key) => {
          return <li key={key}>{item.title}</li>
        }
          )}
      </ul>
    </div>

    )
}
  };

 export class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            value: "",
            autocompleteData: []
        };

        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.getItemValue = this.getItemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
        
    }


    retrieveDataAsynchronously(searchText){
       

        axios.get('/orders/api?title='+searchText).then(response => {
 
         this.setState({

           autocompleteData: response.data
         });
        

     }).catch(errors => {

       console.log(errors);
     })
    }
    

    onChange(e){
        this.setState({
            value: e.target.value
        });

        this.retrieveDataAsynchronously(e.target.value);
    }

  
    onSelect(val){
        this.setState({
            value: val
        });
    }

   
    renderItem(item, isHighlighted){
        return (
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.code}
            </div>   
        ); 
    }

    
    getItemValue(item){
        
        return `${item.code}`;
    }



    render() {
        return (
            <div>
                <label> Supplier </label>
                <Autocomplete 
                    getItemValue={this.getItemValue}
                    items={this.state.autocompleteData}
                    renderItem={this.renderItem}
                    value={this.state.value}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                    inputProps={{name: "supplier", className: "form-control"}}
                />
            </div>
        );
    }
};

export class EditOrderNo extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      
        <label>
          Order Number
          <div>
          <input className="form-control" type="text" name={this.state.name} value={this.state.value} onChange={this.handleChange} />
          </div>
        </label>
    );
  }
}

/*ReactDOM.render(
  <EditOrderNo />,
  document.getElementById('EditorderNO')
);*/