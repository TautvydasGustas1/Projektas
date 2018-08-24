import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';
import { Link } from 'react-router-dom';


class ProductsPrice extends Component {
constructor () {
    super()

    this.state = {
      customers: [],
      input: ''
    }
 this.handleChange = this.handleChange.bind(this);
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

	sortBy(key) {
	var dir = this.state.direction;

	this.state.customers.forEach(function(entry) {
			
				if(entry.first_name === null)
				{
					entry.first_name = ''
				}
				if(entry.last_name === null)
				{
					entry.last_name = ''
				}
				if(entry.email === null)
				{
					entry.email = ''
				}
				if(entry.address === null)
				{
					entry.address = ''
				}
				if(entry.phone === null)
				{
					entry.phone = ''
				}			
		});

		this.state.customers =  this.state.customers.sort(function(a, b) {
		  var nameA = a[key].toUpperCase(); 
		  var nameB = b[key].toUpperCase();

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
	const { customers } = this.state


	let FilteredList = customers.filter(word => {

			if(word.first_name === null)
			{
				word.first_name = ''
			}
			if(word.last_name === null)
			{
				word.last_name = ''
			}
			if(word.email === null)
			{
				word.email = ''
			}
			if(word.address === null)
			{
				word.address = ''
			}
			if(word.phone === null)
			{
				word.phone = ''
			}

			if(word.first_name.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}			
			if(word.last_name.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.email.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.address.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.phone.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
		});

	return(
<div className="container">
    <div className="row justify-content-center">
        <div className="col-md-20">
            <div className="card">
                <div className="card-header"><h1 align="center">Customers</h1></div>
                <Link to={'create'} className="btn btn-primary">Add Product</Link>
                

                <div className="card-body">
                 	
					<table className="table"> 
						<thead>
						<tr>
							<th onClick={this.sortBy.bind(this, 'first_name')}>First Name {this.state.name === 'first_name' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'last_name')}>Last Name {this.state.name === 'last_name' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'email')}>Email {this.state.name === 'email' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'address')}>Address {this.state.name === 'address' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'phone')}>Phone {this.state.name === 'phone' ? this.state.arrow : ''}</th>
							<th><input placeholder="Filter..." value={this.state.input} onChange={this.handleChange}/></th>
						</tr>
							
						</thead>
			<tbody>
							
							{FilteredList.map(customer =>(
								<tr key={customer.id}> 
								<td>{customer.first_name}</td>
								<td>{customer.last_name}</td>
								<td>{customer.email}</td>
								<td>{customer.address}</td>
								<td>{customer.phone}</td>
								<td></td>
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