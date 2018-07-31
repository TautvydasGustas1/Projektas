import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';
import { Link } from 'react-router-dom';


class ProductsList extends Component {
constructor () {
    super()

    this.state = {
      products: []
    }
 
  }

  componentDidMount () {
    axios.get('/products').then(response => {
      this.setState({
        products: response.data
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
	const { products } = this.state


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
							<th>Sku</th>
							<th>Title</th>
							<th>Cost</th>
							<th>Price</th>
							<th>Special Price</th>
						</tr>
							
						</thead>
			<tbody>
							
							{products.map(product =>(
								<tr key={product.id}> 
								<td>{product.sku}</td>
								<td>{product.title}</td>
								<td>{product.cost}</td>
								<td>{product.price}</td>
								<td>{product.special_price}</td>
								<td><Link to={`/pproducts/${product.id}`} className='btn btn-info btn-sm'>Edit</Link></td>
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

export default ProductsList;