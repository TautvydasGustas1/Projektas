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
    userRole: ''
    
	}
		this.handleClick = this.handleClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
}

handleClick (e) {
   
   e.preventDefault();

      axios.get('/headerRequest').then(response => {
        this.setState({
         order_id: response.data.order_id,
         
        })
        console.log(this.state.order_id)
        
       if(this.state.order_id !== '' && this.state.order_id !== undefined)
        {
          
          window.location.pathname = `/oorder/${this.state.order_id}/items`;
        }
        
        
      })
        if(this.state.order_id === "")
           window.location.pathname = `/oorders/list`;
   }

   componentDidMount () {
    axios.get('/admin/users/role').then(response => {
      this.setState({
        userRole: response.data
      })
    })
  }

  handleLogout() {
    window.location.pathname = `/logout`;
  }
    
render() {


return(

  <nav className='navbar navbar-expand-md navbar-light navbar-laravel fixed-top'>
    <div className='container'>
      <Link className='navbar-brand' to='/'>Project</Link>
      <div className="row">
      <div className="btn-group" role="group">
      <Link to={'#'} className='btn btn-success' onClick={this.handleClick}><span className="oi oi-plus"></span></Link>
      <Link title="Customers" to={`/ccustomers/list`} className='btn btn-primary'><i className="fas fa-users"></i></Link>
      <Link title="Products" to={`/pproducts/list`} className='btn btn-primary'><i className="fas fa-box-open"></i></Link>
      <Link title="Suppliers" to={`/ssuppliers/list`} className='btn btn-primary'><i className="fas fa-pallet"></i></Link>
      <Link title="Contacts" to={`/contacts/list`} className='btn btn-primary'><i className="fas fa-address-book"></i></Link>
      <Link title="Orders" to={`/oorders/list`} className='btn btn-primary'><i className="fas fa-clipboard-check"></i></Link>
      {this.state.userRole === 'Admin' ? <Link title="Users" to={`/admin/panel`} className='btn btn-primary'><i className="fas fa-unlock-alt"></i></Link> : ""}
      </div>
      
      </div>
      <Link title="Logout" onClick={this.handleLogout} className='btn btn-danger btn-sm' to={'#'}><i className="fas fa-sign-out-alt"></i></Link>
    </div>
  </nav>
  )
}
};

export default Header

