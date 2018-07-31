import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';
import { Link } from 'react-router-dom';


class ProductsPrice extends Component {
constructor () {
    super()

    this.state = {
      customers: []
    }
 
  }

  componentDidMount () {
    axios.get('/customers').then(response => {
      this.setState({
        customers: response.data
      })
    })
  }

	deleteUser(customer) {

		//BackEnd delete
		var $this = this
		axios.delete(`/customers/${customer.id}/delete`).then(response => {
		//FroontEnd delete
		const newState = $this.state.customers.slice();
		newState.splice(newState.indexOf(customer), 1)
		$this.setState({
			customers: newState
		})

		}).catch(error => {
			console.log(error)
		})
	}


render() {
	const { customers } = this.state


	return(
<div className="container">
    <div className="row justify-content-center">
        <div className="col-md-20">
            <div className="card">
                <div className="card-header"><h1 align="center">Products</h1></div>
                <Link to={'create'} className="btn btn-primary">Add Product</Link>
                

                <div className="card-body">
                 	
					<table className="table"> 
						<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Address</th>
							<th>Phone</th>
						</tr>
							
						</thead>
			<tbody>
							
							{customers.map(customer =>(
								<tr key={customer.id}> 
								<td>{customer.first_name}</td>
								<td>{customer.last_name}</td>
								<td>{customer.email}</td>
								<td>{customer.address}</td>
								<td>{customer.phone}</td>
								<td><Link to={`/ccustomers/${customer.id}`} className='btn btn-info btn-sm'>Edit</Link></td>
								<td><div className='btn btn-danger btn-sm' onClick={this.deleteUser.bind(this, customer)}>Delete</div></td>
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

export default ProductsPrice;