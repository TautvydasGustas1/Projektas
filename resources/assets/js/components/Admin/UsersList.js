import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';


class UsersList extends Component {
constructor () {
    super()

    this.state = {
    	User: [],
    	confirmed: ''
   		 		 }
			   }

	componentDidMount () {
    axios.get('/admin/users/not_confirmed').then(response => {
      this.setState({
        User: response.data
      })
    })
  }

Confirmation (user) {
	//BackEnd delete

		var $this = this
		axios.post(`/admin/users/${user.id}/accept`, 1).then(response => {
		//FroontEnd delete
		const newState = $this.state.User.slice();
		newState.splice(newState.indexOf(user), 1)
		$this.setState({
			User: newState
		})

		}).catch(error => {
			console.log(error)
		})

}

Reject(user) {

		//BackEnd delete
		var $this = this
		axios.delete(`/admin/users/${user.id}/reject`).then(response => {
		//FroontEnd delete
		const newState = $this.state.User.slice();
		newState.splice(newState.indexOf(user), 1)
		$this.setState({
			User: newState
		})

		}).catch(error => {
			console.log(error)
		})
	}


render() {
const {User} = this.state

return (
			<div className="container">
    <div className="row justify-content-center" style={{display: '-webkit-box'}}>
        <div className="col-md-20">
            <div className="card">
                <div className="card-header"><h1 align="center">User Confirmations</h1></div>
                
                
                <div className="card-body">
                 	
					<table className="table table-md"> 
						<thead>
						<tr>
							<th>User name</th>
							<th>User e-mail</th>
							<th></th>
							<th></th>
							
						</tr>
							
						</thead>
			<tbody>
							{User.map(user => (
                  			<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.email}</td>								
							<th><button title="Accept" className="btn btn-success btn-sm" onClick={this.Confirmation.bind(this, user)} ><i className="fas fa-check"></i></button></th>	
							<th><button title="Reject" className="btn btn-danger btn-sm" onClick={this.Reject.bind(this, user)}><i className="fas fa-times"></i></button></th>													
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
export default UsersList;