import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';
import { Link } from 'react-router-dom';


class OrderItemsList extends Component {
constructor () {
    super()

    this.state = {
      orderItems: [],
      orderName: '',
      input: '',
      page: 0,
      query: '',
      autocompleteData: [],
      message: '',
      height: window.innerHeight
    }
    this.handleChange = this.handleChange.bind(this);
 	
 	this.handleScroll = this.handleScroll.bind(this);
 	this.GetSearchResults = this.GetSearchResults.bind(this);
 	this.handleChangeSearch = this.handleChangeSearch.bind(this);

 		this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.getItemValue = this.getItemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
        this.onMenuVisibilityChange = this.onMenuVisibilityChange.bind(this);
  }


  //	Lazy Load
  //------------------

  componentDidMount () {
  	const orderItemId = this.props.match.params.id
    axios.get(`/order/${orderItemId}/items`).then(response => {
      this.setState({
        orderItems: response.data['order_item'],
		orderName: response.data['order_no'][0].order_no
        
      })
    })
    window.addEventListener("scroll", this.handleScroll);
    this.state.message = this.props.location.state;
  }

   onMenuVisibilityChange(isOpen)
  {
    this.retrieveDataAsynchronously("");
  }

  handleScroll() {
 	const orderItemId = this.props.match.params.id

   const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset + 10;
        
        if (windowBottom >= docHeight) {
           
        	this.state.page += 25;
	      	axios.get(`/order/${orderItemId}/items?page=`+this.state.page).then(response => {
	      	
	     	 this.setState({
	        orderItems: [...this.state.orderItems, ...response.data]
	      });
	    }) 

        } 
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  //--------------------

  // Search
  //----------------------------------------------------
  handleChangeSearch(event) {
		this.setState({
			query: event.target.value,
		})
	}


	GetSearchResults() {
		const orderItemId = this.props.match.params.id
		var fields = ["sku", "product_title", "customer_title"];

		var str = this.state.query;
		var res = str.replace("+", "%2B");

    axios.get(`/order/${orderItemId}/search?q=`+res+'&fields='+fields).then(response => {
	      	
	     	 this.setState({
	       orderItems: response.data

	      });
	     
	     }).catch(errors => {

       console.log(errors);
     })
  }

retrieveDataAsynchronously(searchText){
	const orderItemId = this.props.match.params.id

	var fields = ["sku", "product_title", "customer_title"];
       
        axios.get(`/order/${orderItemId}/search?q=`+searchText+'&fields='+fields).then(response => {
 
         this.setState({

           autocompleteData: response.data
         });
        

     }).catch(errors => {

       console.log(errors);
     })

    }
    

    onChange(e){
        this.setState({
            query: e.target.value
        });
        this.retrieveDataAsynchronously(e.target.value)
    }

  
    onSelect(val){

        this.setState({
            query: val
        });
    }

   
    renderItem(item, isHighlighted){
        return (
            <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.sku} {item.product_title} {item.customer_title}
            </div>   
        ); 
    }

    
    getItemValue(item){
        
        return `${item.sku}`;
    }



   			 //Autocomplete
//----------------------------------------------


	deleteUser(order) {
	const orderItemId = this.props.match.params.id

	var ask = window.confirm("Ar tikrai norite ištrinti įrašą?");
	if(ask)
	{		
			//BackEnd delete
			var $this = this
			axios.delete(`/order/${orderItemId}/items/${order.id}/delete`).then(response => {
			//FroontEnd delete
			const newState = $this.state.orderItems.slice();
			newState.splice(newState.indexOf(order), 1)
			$this.setState({
				orderItems: newState
			})

			}).catch(error => {
				console.log(error)
			})
	}


	}

	sortBy(key) {
	var dir = this.state.direction;

	this.state.orderItems.forEach(function(entry) {
			

				if(entry.sku === null)
				{
					entry.sku = ''
				}

				if(entry.product_title === null)
				{
					entry.product_title = ''
				}

				if(entry.customer_title === null)
				{
					entry.customer_title = ''
				}

				if(entry.contact_info === null)
				{
					entry.contact_info = ''
				}
				if(entry.deadline === null)
				{
					entry.deadline = ''
				}
				if(entry.leadtime === null)
				{
					entry.leadtime = ''
				}
				if(entry.item_status === null)
				{
					entry.item_status = ''
				}
				if(entry.notified === null)
				{
					entry.notified = ''
				}
				if(entry.customer_status === null)
				{
					entry.customer_status = ''
				}


		});

		this.state.orderItems =  this.state.orderItems.sort(function(a, b) {


	if(key === 'sku' || key === 'product_title' || key === 'customer_title' || key === 'contact_info' || key === 'deadline' || key === 'leadtime' || key === 'item_status' || key === 'notified' || key === 'customer_status')
	{
		  var nameA = a[key].toString().toUpperCase(); 
		  var nameB = b[key].toString().toUpperCase();

		  if(dir === 'asc')
		  {
			  if (nameA < nameB) {
			    return -1;
			  }
			  if (nameA > nameB) {
			    return 1;
			  }
			  return 0;
		  }
		  else 
		  {
		  	if (nameB < nameA) {
			    return -1;
			  }
			  if (nameB > nameA) {
			    return 1;
			  }
			  return 0;
		  }	
	}
	else
	{
		if(dir === 'asc')
		{
			return a[key] - b[key];
		}
		else
		{
			return b[key] - a[key];
		}
	}

			});


		this.setState({
		direction: this.state.direction === 'asc' ? 'desc' : 'asc',
		arrow: this.state.arrow === '↓' ? '↑' : '↓'
 		})

 			this.state.name = key

		}

		handleChange(event) {
		this.setState({
			input: event.target.value
		})
	}




render() {
	const { orderItems } = this.state
	const { orderName } = this.state
	const orderItemId = this.props.match.params.id



	let FilteredList = orderItems.filter(word => {

			
				if(word.sku === null)
				{
					word.sku = ''
				}
				if(word.product_title === null)
				{
					word.product_title = ''
				}
				if(word.contact_info === null)
				{
					word.contact_info = ''
				}
				if(word.price === null)
				{
					word.price = ''
				}
				if(word.qty === null)
				{
					word.qty = ''
				}
				if(word.deadline === null)
				{
					word.deadline = ''
				}
				if(word.leadtime === null)
				{
					word.leadtime = ''
				}
				if(word.item_status === null)
				{
					word.item_status = ''
				}
				if(word.notified === null)
				{
					word.notified = ''
				}
				if(word.customer_status === null)
				{
					word.customer_status = ''
				}
				if(word.item_status === "0")
				{
					word.item_status = "N"
				}
				else if(word.item_status === "1")
				{
					word.item_status = "R"
				}
				else if(word.item_status === "2")
				{
					word.item_status = "C"
				}
				else if(word.item_status === "3")
				{
					word.item_status = "Dec"
				}
				else if(word.item_status === "4")
				{
					word.item_status = "U"
				}
				else if(word.item_status === "5")
				{
					word.item_status = "Del"
				}
				if(word.notified === "0")
				{
					word.notified = "SN"
				}
				else if(word.notified === "1")
				{
					word.notified = "SNN"
				}
				else if(word.notified === "2")
				{
					word.notified = "ANN"
				}
				else if(word.notified === "3")
				{
					word.notified = "AN"
				}
				if(word.customer_status === "0")
				{
					word.customer_status = "R"
				}
				else if(word.customer_status === "1")
				{
					word.customer_status = "P"
				}
				else if(word.customer_status === "2")
				{
					word.customer_status = "N"
				}
				else if(word.customer_status === "3")
				{
					word.customer_status = "CR"
				}
				else if(word.customer_status === "4")
				{
					word.customer_status = "CC"
				}
				else if(word.customer_status === "5")
				{
					word.customer_status = "C"
				}


				

			
			if(word.sku.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.product_title.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.contact_info.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.price.toString().indexOf(this.state.input) !== -1)
			{
				return true;
			}
			if(word.qty.toString().indexOf(this.state.input) !== -1)
			{
				return true;
			}
			if(word.deadline.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.leadtime.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.item_status.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.notified.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.customer_status.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}

		});

	// Alert 
	if(this.state.message !== '' && this.state.message !== undefined)
	{
		var Alert = <div align='center' className="alert alert-success" role="alert">
                				  {this.state.message.some}
                				</div>
	}



	return(
<div className="container">
    <div className="row justify-content-center" style={{display: '-webkit-box'}}>
            <div className="card" style={{minWidth: 'auto'}}>
                <div className="card-header"><h1 align="center">Orders for {orderName}</h1></div>

                {Alert}

                <Link to={'create'} className="btn btn-primary">Add Order Item</Link>

                <div className="container" style={{margin: "0px", maxWidth: "520px"}}>
                <div className="row" style={{paddingTop: "15px"}}> 
                	<div className="col-md-auto" style={{width: "50%"}}>
                		
                		<div className="input-group" style={{flexWrap: 'inherit'}}>
							 <Autocomplete  
			                    getItemValue={this.getItemValue}
			                    items={this.state.autocompleteData}
			                    renderItem={this.renderItem}
			                    value={this.state.query}
			                    onChange={this.onChange}
			                    onSelect={this.onSelect}
			                    menuStyle = {{position: 'absolute', maxHeight: '300px', top: 'auto', left: 'auto', borderRadius: '3px', boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)', overflowY: 'auto', fontSize: '90%', padding: '2px 0'}}
			                    inputProps={{className: "form-control", placeholder: "Search..."}}
			                    onMenuVisibilityChange={this.onMenuVisibilityChange}
			             	  />
			             	 	 <div className="input-group-append">
							   	 <button className="btn btn-primary" onClick={this.GetSearchResults}><span className="oi oi-magnifying-glass"></span></button>
			             	  	</div>
			            </div>

                	</div>
                		<div className="col-md-auto" style={{width: "50%"}}>
			            		<input className = "form-control" style={{maxWidth: '184px'}} id="myInput" placeholder="Filter..." value={this.state.input} onChange={this.handleChange} />
                		</div>
                	
                </div>
                </div>
               
                <div className="card-body">
                 	
					<table className="table table-sm"> 
						<thead>
						<tr>
							
							<th onClick={this.sortBy.bind(this, 'sku')}>Sku {this.state.name === 'sku' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'product_title')}>Product Title {this.state.name === 'product_title' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'customer_title')}>Customer Title {this.state.name === 'customer_title' ? this.state.arrow : ''}</th>
							
							<th onClick={this.sortBy.bind(this, 'contact_info')}><div className=".d-none .d-sm-block">Contact Info {this.state.name === 'contact_info' ? this.state.arrow : ''}</div></th>
							
							<th onClick={this.sortBy.bind(this, 'price')}>Price {this.state.name === 'price' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'qty')}>Quantity {this.state.name === 'qty' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'deadline')}>Deadline {this.state.name === 'deadline' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'leadtime')}>Leadtime {this.state.name === 'leadtime' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'item_status')}>Item Status {this.state.name === 'item_status' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'notified')}>Notified {this.state.name === 'notified' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'customer_status')}>Customer Status {this.state.name === 'customer_status' ? this.state.arrow : ''}</th>
							<th></th>
							<th></th>
						</tr>

				
							
						</thead>
			<tbody>
							
							{FilteredList.map(orderItem =>(
								<tr key={orderItem.id}> 
								<td>{orderItem.sku}</td>
								<td>{orderItem.product_title}</td>
								<td>{orderItem.customer_title}</td>
								<td>{orderItem.contact_info}</td>
								<td>{orderItem.price}</td>
								<td>{orderItem.qty}</td>
								<td>{orderItem.deadline}</td>
								<td>{orderItem.leadtime}</td>
								<td className={orderItem.item_status==="N" ? "text-primary" : orderItem.item_status==="R" ? "text-info" : orderItem.item_status==="C" ? "text-secondary" : orderItem.item_status==="Dec" ? "text-danger" : orderItem.item_status==="U" ? "text-dark" : orderItem.item_status==="Del" ? "text-success" : ""}><b>
								</b><span className="d-block d-sm-none">{orderItem.item_status}</span><span className="Full">{orderItem.item_status==="N" ? "Not Requested" : orderItem.item_status==="R" ? "Requested" : orderItem.item_status==="C" ? "Confirmed" : orderItem.item_status==="Dec" ? "Declined" : orderItem.item_status==="U" ? "Undecided" : orderItem.item_status==="Del" ? "Delivered" : ""}</span></td>				
								<td className={orderItem.notified === "SN" ? "text-primary" : orderItem.notified === "SNN" ? "text-secondary" : orderItem.notified === "ANN" ? "text-warning" : "text-success"}><b>
								</b><span className="d-block d-sm-none">{orderItem.notified}</span><span className="Full">{orderItem.notified === "SN" ? "Customer notified about status" : orderItem.notified === "SNN" ? "Customer not notified about status" : orderItem.notified === "ANN" ? "Customer not notified about arrival" : orderItem.notified === "AN" ? "Customer notified about arrival" : ""}</span></td>
								<td className={orderItem.customer_status === "R" ? "text-primary" : orderItem.customer_status === "P" ? "text-secondary" : orderItem.customer_status === "N" ? "text-warning" : orderItem.customer_status === "CR" ? "text-danger" : "text-success"}><b>	
								</b><span className="d-block d-sm-none">{orderItem.customer_status}</span><span className="Full">{orderItem.customer_status === "R" ? "Request" : orderItem.customer_status === "P" ? "Price offer" : orderItem.customer_status === "N" ? "Negotiation" : orderItem.customer_status === "CR" ? "Closed refused" : orderItem.customer_status === "CC" ? "Closed confirmed" : orderItem.customer_status === "C" ? "Confirmed" : ""}</span></td>
								<td><Link to={`/oorder/${orderItem.order_id}/items/${orderItem.id}`} className='btn btn-info btn-sm' title="Edit"><span className="oi oi-wrench"></span></Link></td>
								<td><div className='btn btn-danger btn-sm' title="Delete" onClick={this.deleteUser.bind(this, orderItem)}><span className="oi oi-trash"></span></div></td>
								</tr>
								))}					
			</tbody>
						</table>
                
                </div>
            </div>
        </div>
    </div>
	);
}
}

export default OrderItemsList;