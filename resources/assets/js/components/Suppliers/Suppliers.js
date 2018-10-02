import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';


class Suppliers extends Component {
	constructor(props) {
		super(props)

		this.state = {
			code: '',
			title: '',
			address: '',
			contact: '',
			email: '',
			phone: '',
			errors: [],
			autocompleteData: []
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleFieldChange = this.handleFieldChange.bind(this)
		this.hasErrorFor = this.hasErrorFor.bind(this)
    	this.renderErrorFor = this.renderErrorFor.bind(this)

    	this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.getItemValue = this.getItemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
		
}


retrieveDataAsynchronously(searchText){
       

        axios.get('/suppliers/api?title='+searchText).then(response => {
 
         this.setState({

           autocompleteData: response.data
         });
        

     }).catch(errors => {

       console.log(errors);
     })

    }
    

    onChange(e){
        this.setState({
            contact: e.target.value
           
        });
            

        this.retrieveDataAsynchronously(e.target.value)
    }

  
    onSelect(val){

        this.setState({
            contact: val
        });

    }

   
    renderItem(item, isHighlighted){
        return (
            <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.title}
            </div>   
        ); 
    }

    
    getItemValue(item){
        
        return `${item.title}`;
    }



   			 //Autocomplete
//----------------------------------------------
				
				//Form

	hasErrorFor (field) {
    return !!this.state.errors[field]
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }

	handleFieldChange (event) {
		this.setState({
			[event.target.name]: event.target.value
		})
		
	}

	handleSubmit (event) {
		event.preventDefault()
		const { history } = this.props



		const supplier = {
			code: this.state.code,
			title: this.state.title,
			address: this.state.address,
			contact: this.state.contact,
			email: this.state.email,
			phone: this.state.phone
		}

		axios.post('/suppliers', supplier).then(response => {
			//redirecting
			history.push({
			  pathname: '/ssuppliers/list',
			  state: { some: response.data }
			})

		}).catch(error => {
			this.setState({
				errors: error.response.data.errors
			})
		})
		
	}

render() {
	
	return(

		<div className="container">
   			 <div className="row justify-content-center">
        		<div className="col-md-8">
           			 <div className="card">
		                <div className="card-header" align="center"><h1>Create Supplier</h1></div>
		                <div className="card-body">
		                <form onSubmit={this.handleSubmit}>
		               {/* @csrf*/}

		        	<div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Code</label>
				            <input id="code" type="code" name="code" className={`form-control ${this.hasErrorFor('code') ? 'is-invalid' : ''}`} value={this.state.code} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('code')}				  
				          </div>
				        </div>

				        <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Title</label>
				            <input id="title" type="title" name="title" className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`} value={this.state.title} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('title')}				  
				          </div>
				        </div>

				        <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Adress</label>
				            <textarea id="address" type="address" name="address" className={`form-control ${this.hasErrorFor('address') ? 'is-invalid' : ''}`} value={this.state.address} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('adress')}				  
				          </div>
				        </div>

				        <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Contact</label>
				             <Autocomplete  
			                    getItemValue={this.getItemValue}
			                    items={this.state.autocompleteData}
			                    renderItem={this.renderItem}
			                    value={this.state.contact}
			                    onChange={this.onChange}
			                    onSelect={this.onSelect}
			                     menuStyle = {{zIndex: 1, position: 'absolute', maxHeight: '300px', top: 'auto', left: 'auto', borderRadius: '3px', boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)', overflowY: 'auto', fontSize: '90%', padding: '2px 0'}}
			                    inputProps={{name: "contact", className: "form-control"}}
			                    wrapperStyle={{}}
			             	  />				  
				          </div>
				        </div>

				         <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Email</label>
				            <input id="email" type="email" name="email" className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`} value={this.state.email} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('email')}				  
				          </div>
				        </div>

				        <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Phone</label>
				            <input id="phone" type="phone" name="phone" className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : ''}`} value={this.state.phone} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('phone')}				  
				          </div>
				        </div>

		        	

				       


			         				 <div className="form-group col-md-5">
			           				 <button type="submit" className="btn btn-success">Submit</button>
			          				 </div>
			          				 </form>
		</div>
			</div>
				</div>
					</div>
						</div>		                
		);

}

};

export default Suppliers;