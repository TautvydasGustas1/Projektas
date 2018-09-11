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
  }


  //	Lazy Load
  //------------------

  componentDidMount () {
  	const orderItemId = this.props.match.params.id
    axios.get(`/order/${orderItemId}/items`).then(response => {
    	
      this.setState({
        orderItems: response.data,
        orderName: response.data.order_no
        
      })
    })
    window.addEventListener("scroll", this.handleScroll);
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

		var str = this.state.query;
		var res = str.replace("+", "%2B");

    axios.get(`/order/${orderItemId}/search?q=`+res).then(response => {
	      	
	     	 this.setState({
	       orderItems: response.data

	      });
	     
	     }).catch(errors => {

       console.log(errors);
     })
  }

retrieveDataAsynchronously(searchText){
	const orderItemId = this.props.match.params.id
       

        axios.get(`/order/${orderItemId}/search?q=`+searchText).then(response => {
 
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
                {item.sku}
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
		});

		this.state.orderItems =  this.state.orderItems.sort(function(a, b) {


	if(key === 'sku' || key === 'product_title' || key === 'customer_title' || key === 'contact_info' || key === 'deadline' || key === 'leadtime')
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

				if(word.order_id === null)
				{
					word.order_id = ''
				}
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

			if(word.order_id.toString().indexOf(this.state.input) !== -1)
			{
				return true;
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




	return(
<div className="container">
    <div className="row justify-content-center">
        <div className="col-md-20">
            <div className="card">
                <div className="card-header"><h1 align="center">Orders for {orderName}</h1></div>
                <Link to={'create'} className="btn btn-primary">Add Order Item</Link>

                <div className="container">
                <div className="row align-items-center" style={{paddingTop: "15px"}}> 
                	<div className="col-md-auto align-self-end">
                		
                		<div className="input-group">
							 <Autocomplete  
			                    getItemValue={this.getItemValue}
			                    items={this.state.autocompleteData}
			                    renderItem={this.renderItem}
			                    value={this.state.query}
			                    onChange={this.onChange}
			                    onSelect={this.onSelect}
			                    menuStyle = {{position: 'absolute', maxHeight: '300px', top: 'auto', left: 'auto', borderRadius: '3px', boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)', overflowY: 'auto', fontSize: '90%', padding: '2px 0'}}
			                    inputProps={{className: "form-control", placeholder: "Search..."}}
			             	  />
			             	 	 <div className="input-group-append">
							   	 <button className="btn btn-primary" onClick={this.GetSearchResults}><span class="oi oi-magnifying-glass"></span></button>
			             	  	</div>
			            </div>

                	</div>
                		<div className="col-md-auto align-self-end">
                		<button className="btn pull-right btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Filter</button>
   						  <ul className="dropdown-menu">
			            		<input id="myInput" placeholder="Filter..." value={this.state.input} onChange={this.handleChange} />
   						  </ul>
                		</div>
                	
                </div>
                </div>
               
                <div className="card-body">
                 	
					<table className="table"> 
						<thead>
						<tr>
							<th onClick={this.sortBy.bind(this, 'order_id')}>Order ID {this.state.name === 'order_id' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'sku')}>Sku {this.state.name === 'sku' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'product_title')}>Product Title {this.state.name === 'product_title' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'customer_title')}>Customer Title {this.state.name === 'customer_title' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'contact_info')}>Contact Info {this.state.name === 'contact_info' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'price')}>Price {this.state.name === 'price' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'qty')}>Quantity {this.state.name === 'qty' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'deadline')}>Deadline {this.state.name === 'deadline' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'leadtime')}>Leadtime {this.state.name === 'leadtime' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'item_status')}>Item Status {this.state.name === 'item_status' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'notified')}>Notified {this.state.name === 'notified' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'customer_status')}>Customer Status {this.state.name === 'customer_status' ? this.state.arrow : ''}</th>
						</tr>

				
							
						</thead>
			<tbody>
				
							{FilteredList.map(orderItem =>(
								<tr key={orderItem.id}> 
								<td>{orderItem.order_id}</td>
								<td>{orderItem.sku}</td>
								<td>{orderItem.product_title}</td>
								<td>{orderItem.customer_title}</td>
								<td>{orderItem.contact_info}</td>
								<td>{orderItem.price}</td>
								<td>{orderItem.qty}</td>
								<td>{orderItem.deadline}</td>
								<td>{orderItem.leadtime}</td>
								<td>{orderItem.item_status}</td>
								<td>{orderItem.notified}</td>
								<td>{orderItem.customer_status}</td>
								<td></td>
								<td><Link to={`/oorder/${orderItem.order_id}/items/${orderItem.id}`} className='btn btn-info btn-sm' title="Edit"><span class="oi oi-wrench"></span></Link></td>
								<td><div className='btn btn-danger btn-sm' title="Delete" onClick={this.deleteUser.bind(this, orderItem)}><span class="oi oi-trash"></span></div></td>
								</tr>
								))}					
			</tbody>
						</table>
                
                </div>
            </div>
        </div>
    </div>
</div>
	);
}
}

export default OrderItemsList;