import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {OrderNo} from './React';
import {StatusForm} from './React';
import {SupplierForm} from './React';
import {App} from './React';
import {EditOrderNo} from './React';



 class Form extends Component
{
constructor(props) {
	super(props);

	//var action = '';
this.state = {
	'action': props.action
};

}


	render() {

				if (this.state.action != '')
				{
					console.log(this.state.action),
				<EditOrderNo />
				}
		return(
			<div>
				<OrderNo />
				
				<StatusForm />
				<App />
			</div>
			);
		}
};

ReactDOM.render(
  <Form />,
  document.getElementById('form')
);


/*class Formedit extends Component
{
constructor(props) {
	super(props);
}

	render() {

		return(
			<div>
				<OrderNo />
				<StatusForm />
				<App />
			</div>
			);
		}
};

ReactDOM.render(
  <Formedit />,
  document.getElementById('formedit')
);*/