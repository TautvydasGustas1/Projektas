import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from 'axios'
import { browserHistory } from 'history'

class Header extends Component {
constructor(props){
	super(props)

	this.state = {
		order_id: '',
  
	}
		this.handleClick = this.handleClick.bind(this);
}



handleClick (e) {
   
   e.preventDefault();

   
      axios.get('/headerRequest').then(response => {
        this.setState({
         order_id: response.data.order_id,
         
        })
        console.log(this.state.order_id)
        
       if(this.state.order_id === null)
        {
          window.location.pathname = `/oorders/list`;
        }
        else
        {
           window.location.pathname = `/oorder/${this.state.order_id}/items`;
        }
      })
   }
    


render() {


return(

  <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
    <div className='container'>
      <Link className='navbar-brand' to='/'>Project</Link>
      <div align="right">
      <Link to={'#'} className='btn btn-success' onClick={this.handleClick}>+</Link>
      <Link to={`/ccustomers/list`} className='btn btn-secondary'>Customers</Link>
      <Link to={`/pproducts/list`} className='btn btn-secondary'>Products</Link>
      <Link to={`/ssuppliers/list`} className='btn btn-secondary'>Suppliers</Link>
      <Link to={`/oorders/list`} className='btn btn-secondary'>Orders</Link>
      </div>
    </div>
  </nav>
  )
}
};

export default Header

