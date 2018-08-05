import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';


class OrderItemsCreate extends Component {
	constructor(props) {
		super(props)

		this.state = {
			order_id: '',
			sku: '',
			product_title: '',
			customer_title: '',
			contact_info: '',
			price: '',
			qty: '',
			deadline: '',
			leadtime: '',
			item_status: '',
			notified: '',
			customer_status: '',
			autocompleteData: [],
			errors: []
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
       const orderItemId = this.props.match.params.id

        axios.get(`/orders/${orderItemId}/api?sku=`+searchText).then(response => {
 
         this.setState({

           autocompleteData: response.data
         });
        

     }).catch(errors => {

       console.log(errors);
     })
    }
    

    onChange(e){
        this.setState({
            sku: e.target.value
           
        });
            

        this.retrieveDataAsynchronously(e.target.value)
    }

  
    onSelect(val){

        this.setState({
            sku: val
        });

    }

   
    renderItem(item, isHighlighted){
        return (
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.sku}
            </div>   
        ); 
    }

    
    getItemValue(item){
        
        return `${item.sku}`;
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
		const orderItemId = this.props.match.params.id

		

		const orderItems = {
			order_id: this.state.order_id,
			sku: this.state.sku,
			product_title: this.state.product_title,
			customer_title: this.state.customer_title,
			contact_info: this.state.contact_info,
			price: this.state.price,
			qty: this.state.qty,
			deadline: this.state.deadline,
			leadtime: this.state.leadtime,
			item_status: this.state.item_status,
			notified: this.state.notified,
			customer_status: this.state.customer_status
		}

		axios.post(`/orders/${orderItemId}/items/`, orderItems).then(response => {
			//redirecting
			history.push(`/oorders/${orderItemId}/list`)

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
		                <div className="card-header" align="center"><h1>Create Order Item</h1></div>
		                <div className="card-body">
		                <form onSubmit={this.handleSubmit}>
		               {/* @csrf*/}

		                <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Order ID</label>
				            <input id="order_id" type="order_id" name="order_id" className={`form-control ${this.hasErrorFor('order_id') ? 'is-invalid' : ''}`} value={this.state.order_id} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('order_id')}				  
				          </div>
				        </div>

					<div className="row">
							<div className="col-md-4"></div>
				        		<div className="form-group col-md-5">
						  			 <label>Sku</label>

						  			 <div>
                <Autocomplete  
                    getItemValue={this.getItemValue}
                    items={this.state.autocompleteData}
                    renderItem={this.renderItem}
                    value={this.state.sku}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                    inputProps={{name: "sku", className: "form-control"}}
             	  />
            	</div>
								</div> 
				 			</div>


				 			<div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Product Title</label>
				            <input id="product_title" type="product_title" name="product_title" className={`form-control ${this.hasErrorFor('product_title') ? 'is-invalid' : ''}`} value={this.state.product_title} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('product_title')}				  
				          </div>
				        </div>

				        <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Customer Title</label>
				            <input id="customer_title" type="customer_title" name="customer_title" className={`form-control ${this.hasErrorFor('customer_title') ? 'is-invalid' : ''}`} value={this.state.customer_title} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('customer_title')}				  
				          </div>
				        </div>

				        <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Contact Info</label>
				            <input id="contact_info" type="contact_info" name="contact_info" className={`form-control ${this.hasErrorFor('contact_info') ? 'is-invalid' : ''}`} value={this.state.contact_info} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('contact_info')}				  
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
				             <label>Quantity</label>
				            <input id="qty" type="qty" name="qty" className={`form-control ${this.hasErrorFor('qty') ? 'is-invalid' : ''}`} value={this.state.qty} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('qty')}				  
				          </div>
				        </div>

				         <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Deadline</label>
				            <input id="deadline" type="date" name="deadline" className={`form-control ${this.hasErrorFor('deadline') ? 'is-invalid' : ''}`} value={this.state.deadline} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('deadline')}				  
				          </div>
				        </div>

				        <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Leadtime</label>
				            <input id="leadtime" type="date" name="leadtime" className={`form-control ${this.hasErrorFor('leadtime') ? 'is-invalid' : ''}`} value={this.state.leadtime} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor('leadtime')}				  
				          </div>
				        </div>

				        <div class="row">
						<div class="col-md-4"></div>
				        <div class="form-group col-md-4">
						  <label for="item_status">Item Status</label>
						  <select class="form-control" name="item_status">
						  	<option disabled selected value></option>
						    <option value="0">0 - Not requested</option>
						    <option value="1">1 - Requested</option>
						    <option value="2">2 - Confirmed</option>
						    <option value="3">3 - Declined</option>
						    <option value="4">4 - Undecided</option>
						    <option value="5">5 - Delivered</option>
						  </select>
						</div>
					</div>

					<div class="row">
						<div class="col-md-4"></div>
				        <div class="form-group col-md-4">
						  <label for="notified">Notified</label>
						  <select class="form-control" name="notified">
						  	<option disabled selected value></option>
						    <option value="0">0 - Customer not notified about status</option>
						    <option value="1">1 - Customer notified about status</option>
						    <option value="2">2 - Customer not notified about arrival</option>
						    <option value="3">3 - Customer notified about arrival</option>
						  </select>
						</div>
					</div>

					<div class="row">
						<div class="col-md-4"></div>
				        <div class="form-group col-md-4">
						  <label for="customer_status">Customer Status</label>
						  <select class="form-control" name="customer_status">
						  	<option disabled selected value></option>
						    <option value="0">0 - Request</option>
						    <option value="1">1 - Price offer</option>
						    <option value="2">2 - Negotiation</option>
						    <option value="3">3 - Closed refused</option>
						    <option value="4">4 - Closed confirmed</option>
						  </select>
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

export default OrderItemsCreate;