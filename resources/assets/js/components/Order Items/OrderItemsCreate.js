import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';


class OrderItemsCreate extends Component {
	constructor(props) {
		super(props)

		this.state = {
			order_id: '',
			name: '',
			sku: '',
			product_title: '',
			customer_title: '',
			contact_info: '',
			price: '0',
			qty: '0',
			deadline: '',
			leadtime: '',
			item_status: '',
			notified: '',
			customer_status: '',
			autocompleteData: [],
			autocompleteData1: [],
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

        this.retrieveDataAsynchronouslyCust = this.retrieveDataAsynchronouslyCust.bind(this);
        this.onChangeCust = this.onChangeCust.bind(this);
        this.onSelectCust = this.onSelectCust.bind(this);
        this.getItemValueCust = this.getItemValueCust.bind(this);
        this.renderItemCust = this.renderItemCust.bind(this);
        
		
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
            <div style={{background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.sku}
            </div>   
        ); 
    }

    
    getItemValue(item){
        
        return `${item.sku}`;
    }


    // Autocomplete for customer Title

retrieveDataAsynchronouslyCust(searchText){
       const orderItemId = this.props.match.params.id

        axios.get(`/orders/${orderItemId}/CustomerApi?last_name=`+searchText).then(response => {
 
         this.setState({

           autocompleteData1: response.data
         });
        

     }).catch(errors => {

       console.log(errors);
     })
    }


    onChangeCust(e){
        this.setState({
            customer_title: e.target.value   
        });
            
        this.retrieveDataAsynchronouslyCust(e.target.value)
        
    }

  
    onSelectCust(val){

        this.setState({
            customer_title: val
        });

    }

   
    renderItemCust(item, isHighlighted){
        return (
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.last_name}
            </div>   
        ); 
    }

    
    getItemValueCust(item){
       
        return `${item.last_name}`;
    }

   			 //Autocomplete
//----------------------------------------------
				//Form


//Pasiema data is servo
//---------- 
componentDidMount () {
    const customersId = this.props.match.params.id

    axios.get(`/order/${customersId}/items/create`).then(response => {
      this.setState({
       name: response.data.order_no,
       order_id: response.data.id
      })
    })
  }
//--------------



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

		axios.post(`/order/${orderItemId}/items`, orderItems).then(response => {
			//redirecting
			history.push(`/oorder/${orderItemId}/items`)

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
		                <div className="card-header" align="center"><h1>Create Order Item for {this.state.name}</h1></div>
		                <div className="card-body">
		                <form onSubmit={this.handleSubmit}>
		               {/* @csrf*/}

		                <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Order Number</label>
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
			        menuStyle = {{zIndex: 1, position: 'absolute', maxHeight: '300px', top: 'auto', left: 'auto', borderRadius: '3px', boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)', overflowY: 'auto', fontSize: '90%', padding: '2px 0'}}
                    inputProps={{name: "sku", className: "form-control"}}
                    wrapperStyle={{}}
                    
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
						  <div>						  			 
                <Autocomplete  
                    getItemValue={this.getItemValueCust}
                    items={this.state.autocompleteData1}
                    renderItem={this.renderItemCust}
                    value={this.state.customer_title}
                    onChange={this.onChangeCust}
                    onSelect={this.onSelectCust}
                    menuStyle = {{zIndex: 1, position: 'absolute', maxHeight: '300px', top: 'auto', left: 'auto', borderRadius: '3px', boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)', overflowY: 'auto', fontSize: '90%', padding: '2px 0'}}
                    wrapperStyle={{}}
                    inputProps={{name: "customer_title", className: `form-control ${this.hasErrorFor('customer_title') ? 'is-invalid' : ''}`}}
             	  />
             	  {this.renderErrorFor('customer_title')}	
            			</div>
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

				        <div className="row">
						<div className="col-md-4"></div>
				        <div className="form-group col-md-5">
						  <label>Item Status</label>
						  <select className="form-control" name="item_status" value={this.state.item_status} onChange={this.handleFieldChange}>
						  	<option value="null"> </option>
						    <option value="0">0 - Not requested</option>
						    <option value="1">1 - Requested</option>
						    <option value="2">2 - Confirmed</option>
						    <option value="3">3 - Declined</option>
						    <option value="4">4 - Undecided</option>
						    <option value="5">5 - Delivered</option>
						  </select>
						</div>
					</div>

					<div className="row">
						<div className="col-md-4"></div>
				        <div className="form-group col-md-5">
						  <label>Notified</label>
						  <select className="form-control" name="notified" value={this.state.notified} onChange={this.handleFieldChange}>
						  	<option value="null"> </option>
						    <option value="0">0 - Customer not notified about status</option>
						    <option value="1">1 - Customer notified about status</option>
						    <option value="2">2 - Customer not notified about arrival</option>
						    <option value="3">3 - Customer notified about arrival</option>
						  </select>
						</div>
					</div>

					<div className="row">
						<div className="col-md-4"></div>
				        <div className="form-group col-md-5">
						  <label>Customer Status</label>
						  <select className="form-control" name="customer_status" value={this.state.customer_status} onChange={this.handleFieldChange}>
						  	<option value="null"> </option>
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