import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';
import { Link } from 'react-router-dom';


class OrdersList extends Component {
constructor () {
    super()

    this.state = {
      orders: [],
      direction: 'asc',
      arrow: '↑',
      name: ''
    }
 
  }

  componentDidMount () {
    axios.get('/orders').then(response => {
      this.setState({
        orders: response.data
      })
    })
  }

	deleteUser(order) {

		//BackEnd delete
		var $this = this
		axios.delete(`/orders/${order.id}/delete`).then(response => {
		//FroontEnd delete
		const newState = $this.state.orders.slice();
		newState.splice(newState.indexOf(order), 1)
		$this.setState({
			orders: newState
		})

		}).catch(error => {
			console.log(error)
		})
	}

	sortBy(key) {

		this.setState({
			orders: this.state.orders.sort((a, b) => 
			this.state.direction === 'asc' ? a[key].toLowerCase() < b[key].toLowerCase() : b[key].toLowerCase() < a[key].toLowerCase()),
			direction: this.state.direction === 'asc' ? 'desc' : 'asc',
			arrow: this.state.arrow === '↓' ? '↑' : '↓'
 		})

 			this.state.name = key
	}

render() {
	const { orders } = this.state


	return(
<div className="container">
    <div className="row justify-content-center">
        <div className="col-md-20">
            <div className="card">
                <div className="card-header"><h1 align="center">Orders</h1></div>
                <Link to={'create'} className="btn btn-primary">Add Order</Link>
                

                <div className="card-body">
                 	
					<table className="table"> 
						<thead>
						<tr>
							<th onClick={this.sortBy.bind(this, 'order_no')}>Order No {this.state.name === 'order_no' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'status')}>Status {this.state.name === 'status' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'supplier')}>Supplier {this.state.name === 'supplier' ? this.state.arrow : ''}</th>
							
						</tr>
							
						</thead>
			<tbody>							
							{orders.map(order =>(
								<tr key={order.id}> 
								<td>{order.order_no}</td>
								<td>{order.status}</td>
								<td>{order.supplier}</td>
								<td><Link to={`/oorders/${order.id}`} className='btn btn-info btn-sm'>Edit</Link></td>
								<td><Link to={`/oorder/${order.id}/create`} className='btn btn-success btn-sm'>Add items</Link></td>
								<td><Link to={`/oorder/${order.id}/items`} className='btn btn-primary btn-sm'>Show items</Link></td>
								<td><div className='btn btn-danger btn-sm' onClick={this.deleteUser.bind(this, order)}>Delete</div></td>
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
export default OrdersList;