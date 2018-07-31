import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';
import { Link } from 'react-router-dom';


class SuppliersList extends Component {
constructor () {
    super()

    this.state = {
      suppliers: []
    }
 
  }

  componentDidMount () {
    axios.get('/suppliers').then(response => {
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


render() {
	const { suppliers } = this.state


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
							<th>Code</th>
							<th>Title</th>
							<th>Adress</th>
							<th>Contact</th>
							<th>Email</th>
							<th>Phone</th>
						</tr>
							
						</thead>
			<tbody>
							
							{suppliers.map(supplier =>(
								<tr key={supplier.id}> 
								<td>{supplier.code}</td>
								<td>{supplier.title}</td>
								<td>{supplier.address}</td>
								<td>{supplier.contact}</td>
								<td>{supplier.email}</td>
								<td>{supplier.phone}</td>
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