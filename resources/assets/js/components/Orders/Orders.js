import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';


class Orders extends Component {
	constructor(props) {
		super(props)

		this.state = {
			order_no: '',
			status: '',
			supplier: '',
			message: '',
			autocompleteData: [],
			errors: [],
			userID: '',
			edit: false
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
       

        axios.get('/orders/api?title='+searchText, 0).then(response => {
 
         this.setState({

           autocompleteData: response.data
         });
        

     }).catch(errors => {

       console.log(errors);
     })

    }
    

    onChange(e){
        this.setState({
            supplier: e.target.value
           
        });
            

        this.retrieveDataAsynchronously(e.target.value)
    }

  
    onSelect(val){

        this.setState({
            supplier: val
        });

    }

   
    renderItem(item, isHighlighted){
        return (
            <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.code}
            </div>   
        ); 
    }

    
    getItemValue(item){
        
        return `${item.code}`;
    }



   			 //Autocomplete
//----------------------------------------------
				//Form

	componentDidMount () {

	if(this.props.match.params.id !== undefined)
	{
	    const orderId = this.props.match.params.id

	    axios.get(`/orders/${orderId}/edit`).then(response => {
	      this.setState({
	        order_no: response.data.order_no,
	        status: response.data.status,
	        supplier: response.data.supplier
	      })
	    })	
	    this.state.edit = true;
	}
  }

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
		const orderId = this.props.match.params.id
		

		const order = {
			order_no: this.state.order_no,
			status: this.state.status,
			supplier: this.state.supplier

		}

		axios.post(this.state.edit === true ? `/orders/${orderId}` : '/orders', order).then(response => {
			//redirecting
			history.push({
			  pathname: '/oorders/list',
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
		                <div className="card-header" align="center"><h1>{this.state.edit === true ? 'Edit' : 'Create'} Order</h1></div>
		                <div className="card-body">
		                <form onSubmit={this.handleSubmit}>
		               {/* @csrf*/}

               

		                <div className="row">
				          <div className="col-md-4"></div>
				         	 <div className="form-group col-md-5">				         	 	
				             <label>Order No</label>
				            <input id="order_no" type="order_no" name="order_no" className={`form-control ${this.hasErrorFor('order_no') ? 'is-invalid' : ''}`} value={this.state.order_no || ''} onChange={this.handleFieldChange}/>
				            {this.renderErrorFor("order_no")}				  
				          </div>
				        </div>


				        <div className="row">
						<div className="col-md-4"></div>
				        	<div className="form-group col-md-5">
						 <label>Status</label>
						  <select className="form-control" name="status" value={this.state.status || ''} onChange={this.handleFieldChange} >
						  	<option value=""> </option>
						    <option value="0">0 - Not sent</option>
						    <option value="1">1 - Sent current to open</option>
						    <option value="2">2 - Closed</option>						
						  </select> 
						</div>
					</div>


					<div className="row">
							<div className="col-md-4"></div>
				        		<div className="form-group col-md-5">
						  			 <label>Supplier Code</label>

						  			
                <Autocomplete  
                    getItemValue={this.getItemValue}
                    items={this.state.autocompleteData}
                    renderItem={this.renderItem}
                    value={this.state.supplier || ''}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                     menuStyle = {{zIndex: 1, position: 'absolute', maxHeight: '300px', top: 'auto', left: 'auto', borderRadius: '3px', boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)', overflowY: 'auto', fontSize: '90%', padding: '2px 0'}}
                    inputProps={{name: "supplier", className: "form-control"}}
                    wrapperStyle={{}}
             	  />
            	
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

export default Orders;