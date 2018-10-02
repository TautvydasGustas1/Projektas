import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Orders from "./Orders/Orders.js"
import OrdersEdit from "./Orders/OrdersEdit.js"
import OrdersList from "./Orders/OrdersList.js"
import SuppliersList from "./Suppliers/SupplierList.js"
import Suppliers from "./Suppliers/Suppliers.js"
import SuppliersEdit from "./Suppliers/SuppliersEdit.js"
import ProductsList from "./Products/ProductsList.js"
import ProductsCreate from "./Products/Products.js"
import ProductsEdit from "./Products/ProductsEdit.js"
import CustomersList from "./Customers/CustomersList.js"
import Customers from "./Customers/Customers.js"
import CustomersEdit from "./Customers/CustomersEdit.js"
import OrderItemsList from "./Order Items/OrderItemsList.js"
import OrderItemsCreate from "./Order Items/OrderItemsCreate.js"
import OrderItemsEdit from "./Order Items/OrderItemsEdit.js"
import Header from "./Header/Header.js"
import ContactsList from "./Contacts/ContactsList.js"
import Contacts from "./Contacts/Contacts.js"
import ContactsEdit from "./Contacts/ContactsEdit.js"
import UsersList from "./Admin/UsersList.js"
import AdminPanel from "./Admin/Panel.js"
import Users from "./Admin/Users.js"


class App extends Component {
	constructor(props){
	super(props)

	this.state = {
		userRole: ''
	}
		
}

componentDidMount () {
    axios.get('/admin/users/role').then(response => {
      this.setState({
        userRole: response.data
      })
    })
  }
	render() {
		//Administratoriu keliai
		if(this.state.userRole === 'Admin')
		{		

					
					var AdminViews = [<Route key={0} path='/admin/panel' component={AdminPanel} />, <Route key={1} path='/admin/users/list' component={Users} />, <Route key={2} path='/admin/users/confirmations' component={UsersList} />]
					
		}


		return(

			<BrowserRouter> 
				<div>
					<Header/>
					<Switch>
						<Route exact path='/oorder/:id/items/:id2' component={OrderItemsEdit} />
						<Route exact path='/oorders/List' component={OrdersList} />			
						<Route exact path='/oorders/create' component={Orders} />	
						<Route exact path='/oorders/:id' component={OrdersEdit} />
						<Route path='/oorder/:id/items' component={OrderItemsList} />
						<Route exact path='/oorder/:id/create' component={OrderItemsCreate} />
						<Route path='/ssuppliers/list' component={SuppliersList} />
						<Route path='/ssuppliers/create' component={Suppliers} />
						<Route path='/pproducts/list' component={ProductsList} />
						<Route path='/pproducts/create' component={ProductsCreate} />
						<Route path='/pproducts/:id' component={ProductsEdit} />
						<Route path='/ssuppliers/:id' component={SuppliersEdit} />
						<Route path='/ccustomers/list' component={CustomersList} />
						<Route path='/ccustomers/create' component={Customers} />
						<Route path='/ccustomers/:id' component={CustomersEdit} />
						<Route path='/contacts/list' component = {ContactsList} />
						<Route path='/contacts/create' component = {Contacts} />
						<Route path='/contacts/:id' component={ContactsEdit} />	
						{AdminViews}
					</Switch>
				</div>

			</BrowserRouter>
		)}
}

ReactDOM.render(<App />, document.getElementById('test'))