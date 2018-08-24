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
      input: ''
    }
    this.handleChange = this.handleChange.bind(this);
 
  }

  componentDidMount () {
  	 const orderItemId = this.props.match.params.id
 

    axios.get(`/order/${orderItemId}/items`).then(response => {
      this.setState({
        orderItems: response.data.items,
        orderName: response.data.order.order_no
      })
      //console.log(response.data);
      
    })
  }

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
							<th><input placeholder="Filter..." value={this.state.input} onChange={this.handleChange}/></th>
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
								<td><Link to={`/oorder/${orderItem.order_id}/items/${orderItem.id}`} className='btn btn-info btn-sm'>Edit</Link></td>
								<td><div className='btn btn-danger btn-sm' onClick={this.deleteUser.bind(this, orderItem)}>Delete</div></td>
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