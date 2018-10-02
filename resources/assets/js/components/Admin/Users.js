import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';
var Confirm = require('react-confirm-bootstrap');


class Users extends Component {
constructor () {
    super()

    this.state = {
    	User: [],
   		 		 }
			   }

	componentDidMount () {
    axios.get('/admin/users/info').then(response => {
      this.setState({
        User: response.data
      })
    })
  }

  ChangeRole(user, role) {


  	axios.post(`/admin/users/${user.id}/change_role`, {"role": role}).then(response => {
  			
			this.setState({
       			 User: response.data
      					  })
			
		}).catch(error => {
			this.setState({
				errors: error.response.data.errors
			})
		})
  }

render() {
const {User} = this.state

return (
			<div className="container">
    <div className="row justify-content-center" style={{display: '-webkit-box'}}>
        <div className="col-md-20">
            <div className="card">
                <div className="card-header"><h1 align="center">Users</h1></div>
                
                
                <div className="card-body">
                 	
					<table className="table table-md"> 
						<thead>
						<tr>
							<th>User name</th>
							<th>User e-mail</th>
							<th>User role</th>
							<th></th>							
						</tr>
							
						</thead>
			<tbody>
							{User.map(user => (
                  			<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td><div className="dropdown">
								  <button className="btn btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								    {user.role}
								  </button>
								  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
								    <a className="dropdown-item" onClick={this.ChangeRole.bind(this, user, 'Admin')}>Admin</a>
								    <a className="dropdown-item" onClick={this.ChangeRole.bind(this, user, 'User')}>User</a>
							  		</div>
								</div>
								</td>								
																			
							</tr>
						))}
              
			</tbody>
                
						</table>
                
                </div>
            </div>
        </div>
    </div>
</div>
)};

}
export default Users;