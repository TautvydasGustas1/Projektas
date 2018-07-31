import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';


class Products extends Component {
	constructor(props) {
		super(props)

		this.state = {
			sku: '',
			title: '',
			cost: '',
			price: '',
			special_price: '',
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



		const product = {
			sku: this.state.sku,
			title: this.state.title,
			cost: this.state.cost,
			price: this.state.price,
			special_price: this.state.special_price
		}

		axios.post('/products', product).then(response => {
			//redirecting
			history.push('/pproducts/list')

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
		                <div className="card-header" align="center"><h1>Create Product</h1></div>
		                <div className="card-body">
		                <form onSubmit={this.handleSubmit}>
		               {/* @csrf*/}

		        	<div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Sku</label>
				            <input id="sku" type="sku" name="sku" className={`form-control ${this.hasErrorFor('sku') ? 'is-invalid' : ''}`} value={this.state.sku} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('sku')}				  
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
				             <label>Cost</label>
				            <input id="cost" type="cost" name="cost" className={`form-control ${this.hasErrorFor('cost') ? 'is-invalid' : ''}`} value={this.state.cost} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('cost')}				  
				          </div>
				        </div>

				        <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Price</label>
				            <input id="price" type="price" name="price" className={`form-control ${this.hasErrorFor('price') ? 'is-invalid' : ''}`} value={this.state.price} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('price')}				  
				          </div>
				        </div>

				         <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Special Price</label>
				            <input id="special_price" type="special_price" name="special_price" className={`form-control ${this.hasErrorFor('special_price') ? 'is-invalid' : ''}`} value={this.state.special_price} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('special_price')}				  
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

export default Products;