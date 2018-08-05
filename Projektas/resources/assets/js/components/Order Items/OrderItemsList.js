import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';
import { Link } from 'react-router-dom';


class OrderItemsList extends Component {
constructor () {
    super()

    this.state = {
      orderItems: []
    }
 
  }

  componentDidMount () {
  	 const orderItemId = this.props.match.params.id
 

    axios.get(`/order/${orderItemId}/items`).then(response => {
      this.setState({
        orderItems: response.data
      })

    })
  }

	deleteUser(product) {

		//BackEnd delete
		var $this = this
		axios.delete(`/products/${product.id}/delete`).then(response => {
		//FroontEnd delete
		const newState = $this.state.products.slice();
		newState.splice(newState.indexOf(product), 1)
		$this.setState({
			products: newState
		})

		}).catch(error => {
			console.log(error)
		})

	}


render() {
	const { orderItems } = this.state


	return(
<div className="container">
    <div className="row justify-content-center">
        <div className="col-md-20">
            <div className="card">
                <div className="card-header"><h1 align="center">Order for {this.state.orderItems}</h1></div>
                <Link to={'create'} className="btn btn-primary">Add Order Item</Link>
                

                <div className="card-body">
                 	
					<table className="table"> 
						<thead>
						<tr>
							<th>Order ID</th>
							<th>Sku</th>
							<th>Product Title</th>
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
								<tr key={OrderItem.id}> 
								<td>{OrderItem.sku}</td>
								<td>{OrderItem.product_title}</td>
								<td>{OrderItem.customer_id}</td>
								<td>{OrderItem.customer_title}</td>
								<td>{OrderItem.contact_info}</td>
								<td>{OrderItem.price}</td>
								<td>{OrderItem.qty}</td>
								<td>{OrderItem.deadline}</td>
								<td>{OrderItem.leadtime}</td>
								<td>{OrderItem.item_status}</td>
								<td>{OrderItem.notified}</td>
								<td>{OrderItem.customer_status}</td>
								<td><Link to={`/oordersItems/${OrderItem.id}`} className='btn btn-info btn-sm'>Edit</Link></td>
								<td><div className='btn btn-danger btn-sm' onClick={this.deleteUser.bind(this, product)}>Delete</div></td>
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