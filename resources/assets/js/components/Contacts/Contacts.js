import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';


class Contacts extends Component {
	constructor(props) {
		super(props)

		this.state = {
			title: '',
			first_name: '',
			last_name: '',
			email: '',
			comments: '',
			address: '',
			phone: '',
			errors: []
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleFieldChange = this.handleFieldChange.bind(this)
		this.hasErrorFor = this.hasErrorFor.bind(this)
    	this.renderErrorFor = this.renderErrorFor.bind(this)
		
}

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



		const contact = {
			title: this.state.title,
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			email: this.state.email,
			address: this.state.address,
			phone: this.state.phone,
			comments: this.state.comments
		}

		axios.post('/contactsIndex', contact).then(response => {
			//redirecting
			history.push({
			  pathname: '/contacts/list',
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
		                <div className="card-header" align="center"><h1>Create Contact</h1></div>
		                <div className="card-body">
		                <form onSubmit={this.handleSubmit}>
		               {/* @csrf*/}

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
				             <label>First Name</label>
				            <input id="first_name" type="first_name" name="first_name" className={`form-control ${this.hasErrorFor('first_name') ? 'is-invalid' : ''}`} value={this.state.first_name} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('first_name')}				  
				          </div>
				        </div>

				        <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Last Name</label>
				            <input id="last_name" type="last_name" name="last_name" className={`form-control ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`} value={this.state.last_name} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('last_name')}				  
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
				             <label>Address</label>
				            <textarea id="address" type="address" name="address" className={`form-control ${this.hasErrorFor('address') ? 'is-invalid' : ''}`} value={this.state.address} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('address')}				  
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

				         <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Comments</label>
				            <textarea id="comments" type="comments" name="comments" className={`form-control ${this.hasErrorFor('comments') ? 'is-invalid' : ''}`} value={this.state.comments} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('comments')}				  
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

export default Contacts;