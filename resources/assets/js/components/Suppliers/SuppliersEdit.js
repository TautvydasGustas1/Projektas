import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';


class SuppliersEdit extends Component {
constructor(props) {
		super(props)

		this.state = {
			code: '',
			title: '',
			address: '',
			contact: '',
			email: '',
			phone: '',
			errors: []
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleFieldChange = this.handleFieldChange.bind(this)
		
}

//Pasiema data is servo
//---------- 
componentDidMount () {
    const supplierId = this.props.match.params.id

    axios.get(`/suppliers/${supplierId}/edit`).then(response => {
      this.setState({
        code: response.data.code,
        title: response.data.title,
        address: response.data.address,
        contact: response.data.contact,
        email: response.data.email,
        phone: response.data.phone
      })
    })
  }
//--------------


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
		const supplierId = this.props.match.params.id

	
		const supplier = {
			code: this.state.code,
			title: this.state.title,
			address: this.state.address,
			contact: this.state.contact,
			email: this.state.email,
			phone: this.state.phone
		}

		axios.post(`/suppliers/${supplierId}`, supplier).then(response => {
			//redirecting
			history.push('/ssuppliers/list')

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
		                <div className="card-header" align="center"><h1>Edit Supplier</h1></div>
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
				            {this.renderErrorFor('address')}				  
				          </div>
				        </div>

				        <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Contact</label>
				            <input id="contact" type="contact" name="contact" className={`form-control ${this.hasErrorFor('contact') ? 'is-invalid' : ''}`} value={this.state.contact} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('contact')}				  
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

export default SuppliersEdit;