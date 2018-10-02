import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';


class AdminPanel extends Component {
constructor () {
    super()

    this.state = {
    	
   		 		 }
			   }

render() {

return (
			<div className="container">
    <div className="row justify-content-center" style={{display: '-webkit-box'}}>
        <div className="col-md-20">
            <div className="card">
                <div className="card-header"><h1 align="center">Admin Panel</h1></div>
	                
                
                <div className="card-body">

				<div className="container">
                 	<div className="row"> 
                 			<div className="col-sm">
                 				<span className="label label-default"><Link title="Users confirmations" to={`/admin/users/confirmations`} className='btn btn-primary'>Users Confirmations</Link></span>
                 			</div>
                 			<div className="col-sm">
                 				<span className="label label-default"><Link title="Users" to={`/admin/users/list`} className='btn btn-primary'>Users</Link></span>
                 			</div>
                 	</div>
				 </div>
                </div>
            </div>
        </div>
    </div>
</div>
)};

}
export default AdminPanel;