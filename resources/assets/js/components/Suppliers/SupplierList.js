import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';
import { Link } from 'react-router-dom';


class SuppliersList extends Component {
constructor () {
    super()

    this.state = {
      suppliers: [],
      direction: 'asc',
      arrow: '↑',
      name: '',
      input: '',
      input2: ''

    }
    this.sortBy = this.sortBy.bind(this);
 	this.handleChange = this.handleChange.bind(this);
  }



  componentDidMount () {
    axios.get('/suppliers').then(response => {
    	console.log(response)
      this.setState({
        suppliers: response.data
      })
    })
  }


	deleteUser(supplier) {

		//BackEnd delete
		var $this = this
		axios.delete(`/suppliers/${supplier.id}/delete`).then(response => {
		//FroontEnd delete
		const newState = $this.state.suppliers.slice();
		newState.splice(newState.indexOf(supplier), 1)
		$this.setState({
			suppliers: newState
		})

		}).catch(error => {
			console.log(error)
		})
	}

	handleChange(event) {
		this.setState({
			input: event.target.value,
		})
	}


	sortBy(key) {
	var dir = this.state.direction;

	this.state.suppliers.forEach(function(entry) {
			
				
				if(entry.address === null)
				{
					entry.address = ''
				}
				if(entry.contact === null)
				{
					entry.contact = ''
				}
				if(entry.phone === null)
				{
					entry.phone = ''
				}			
		});

		this.state.suppliers =  this.state.suppliers.sort(function(a, b) {
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


render() {

	const { suppliers } = this.state
	
		let FilteredList = suppliers.filter(word => {

			if(word.address === null)
				{
					word.address = ''
				}
				if(word.contact === null)
				{
					word.contact = ''
				}
				if(word.phone === null)
				{
					word.phone = ''
				}

			if(word.code.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.title.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.address.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.contact.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.email.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
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
                <div className="card-header"><h1 align="center">Suppliers</h1></div>
                <Link to={'create'} className="btn btn-primary">Add Supplier</Link>
                

                <div className="card-body">
                 	
					<table className="table"> 
						<thead>
						<tr>
							<th onClick={this.sortBy.bind(this, 'code')}>Code {this.state.name === 'code' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'title')}>Title {this.state.name === 'title' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'address')}>Adress {this.state.name === 'address' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'contact')}>Contact {this.state.name === 'contact' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'email')}>Email {this.state.name === 'email' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'phone')}>Phone {this.state.name === 'phone' ? this.state.arrow : ''}</th>
							<th><input placeholder="Filter..." value={this.state.input} onChange={this.handleChange}/></th>
						</tr>
						
							
						</thead>
			<tbody>
							
							{FilteredList.map(supplier =>(
								<tr key={supplier.id}> 
								<td>{supplier.code}</td>
								<td>{supplier.title}</td>
								<td>{supplier.address}</td>
								<td>{supplier.contact}</td>
								<td>{supplier.email}</td>
								<td>{supplier.phone}</td>
								<td></td>
								<td><Link to={`/ssuppliers/${supplier.id}`} className='btn btn-info btn-sm'>Edit</Link></td>
								<td><div className='btn btn-danger btn-sm' onClick={this.deleteUser.bind(this, supplier)}>Delete</div></td>
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


export default SuppliersList;

