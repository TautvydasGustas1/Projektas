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
      orderName: ''
    }
 
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


render() {
	const { orderItems } = this.state
	const { orderName } = this.state
	const orderItemId = this.props.match.params.id
    



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
							<th>Order ID</th>
							<th>Sku</th>
							<th>Product Title</th>
							<th>Customer ID</th>
							<th>Customer Title</th>
							<th>Contact Info</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Deadline</th>
							<th>Leadtime</th>
							<th>Item Status</th>
							<th>Notified</th>
							<th>Customer Status</th>
						</tr>
							
						</thead>
			<tbody>
				
							{orderItems.map(orderItem =>(
								<tr key={orderItem.id}> 
								<td>{orderItem.order_id}</td>
								<td>{orderItem.sku}</td>
								<td>{orderItem.product_title}</td>
								<td>{orderItem.customer_id}</td>
								<td>{orderItem.customer_title}</td>
								<td>{orderItem.contact_info}</td>
								<td>{orderItem.price}</td>
								<td>{orderItem.qty}</td>
								<td>{orderItem.deadline}</td>
								<td>{orderItem.leadtime}</td>
								<td>{orderItem.item_status}</td>
								<td>{orderItem.notified}</td>
								<td>{orderItem.customer_status}</td>
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